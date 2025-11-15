/**
 * Keeper Service - Listens for AISubmitted events and executes rebalancing
 */

const path = require('path');
const { ethers } = require('ethers');
const { MongoClient } = require('mongodb');

// Load .env from project root explicitly
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Import ABI
const StrategyManagerABI = require('../abis/StrategyManager.json');

class KeeperService {
  constructor() {
    // Validate environment variables
    if (!process.env.RPC_URL) throw new Error('RPC_URL not found in .env file');
    if (!process.env.RPC_WS_URL) throw new Error('RPC_WS_URL not found in .env file');
    if (!process.env.KEEPER_PRIVATE_KEY) throw new Error('KEEPER_PRIVATE_KEY not found in .env file');
    if (!process.env.STRATEGY_MANAGER_ADDRESS) throw new Error('STRATEGY_MANAGER_ADDRESS not found in .env file');
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI not found in .env file');
    if (!process.env.MONGO_DB) throw new Error('MONGO_DB not found in .env file');

    // Separate providers: WebSocket for events, HTTP for transactions
    this.wsProvider = new ethers.providers.WebSocketProvider(process.env.RPC_WS_URL);
    this.httpProvider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

    this.wallet = new ethers.Wallet(process.env.KEEPER_PRIVATE_KEY, this.httpProvider);

    this.contract = new ethers.Contract(
      process.env.STRATEGY_MANAGER_ADDRESS,
      StrategyManagerABI,
      this.wallet
    );

    this.contractWS = new ethers.Contract(
      process.env.STRATEGY_MANAGER_ADDRESS,
      StrategyManagerABI,
      this.wsProvider
    );

    this.mongoClient = new MongoClient(process.env.MONGO_URI);
    this.isExecuting = false;
  }

  async connect() {
    await this.mongoClient.connect();
    this.db = this.mongoClient.db(process.env.MONGO_DB);
    console.log('✅ Connected to MongoDB');
  }

  async checkCooldown() {
    const lastRebalance = await this.contract.lastAIRebalance();
    const cooldown = await this.contract.cooldown();
    const now = Math.floor(Date.now() / 1000);

    const nextAllowed = lastRebalance.add(cooldown).toNumber();

    if (now < nextAllowed) {
      const waitTime = nextAllowed - now;
      console.log(`⏳ Cooldown active. Wait ${Math.floor(waitTime / 60)} minutes`);
      return false;
    }

    return true;
  }

  async executeRebalance() {
    if (this.isExecuting) {
      console.log('⚠️ Already executing, skipping...');
      return;
    }

    this.isExecuting = true;

    try {
      console.log('\n🔄 Executing AI rebalance...');

      // Check if there's a pending recommendation
      const hasPending = await this.contract.hasPending();
      if (!hasPending) {
        console.log('No pending recommendation');
        this.isExecuting = false;
        return;
      }

      // Check cooldown
      const canExecute = await this.checkCooldown();
      if (!canExecute) {
        this.isExecuting = false;
        return;
      }

      // Estimate gas
      const gasEstimate = await this.contract.estimateGas.executeAI();
      console.log(`⛽ Gas estimate: ${gasEstimate.toString()}`);

      // Execute
      const tx = await this.contract.executeAI({
        gasLimit: gasEstimate.mul(120).div(100) // 20% buffer
      });

      console.log(`\n📡 Transaction sent: ${tx.hash}`);
      console.log('Waiting for confirmation...');

      const receipt = await tx.wait();

      console.log(`✅ Rebalance executed in block ${receipt.blockNumber}`);
      console.log(`Gas used: ${receipt.gasUsed.toString()}`);

      // Log to MongoDB
      await this.logExecution({
        txHash: tx.hash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        timestamp: new Date()
      });

    } catch (error) {
      console.error('❌ Execution failed:', error.message);

      // Log error
      await this.logError({
        error: error.message,
        timestamp: new Date()
      });

    } finally {
      this.isExecuting = false;
    }
  }

  async logExecution(data) {
    const executions = this.db.collection('executions');
    await executions.insertOne({
      ...data,
      keeper: this.wallet.address,
      type: 'ai_rebalance'
    });
  }

  async logError(data) {
    const errors = this.db.collection('keeper_errors');
    await errors.insertOne({
      ...data,
      keeper: this.wallet.address
    });
  }

  async handleAISubmittedEvent(agent, nonce, confidence, event) {
    console.log('\n🎯 AISubmitted Event Detected!');
    console.log(`Agent: ${agent}`);
    console.log(`Nonce: ${nonce.toString()}`);
    console.log(`Confidence: ${ethers.utils.formatUnits(confidence, 18)} (${confidence.toString()})`);
    console.log(`Block: ${event.blockNumber}`);

    // Wait a few seconds for transaction to settle
    console.log('Waiting 10 seconds before execution...');
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Execute rebalance
    await this.executeRebalance();
  }

  startListening() {
    console.log('👂 Starting event listener...');
    console.log(`Contract: ${this.contract.address}`);
    console.log(`Keeper: ${this.wallet.address}`);

    // Explicit filter for AISubmitted
    const filter = this.contractWS.filters.AISubmitted();
    this.contractWS.on(filter, async (agent, nonce, confidence, event) => {
      await this.handleAISubmittedEvent(agent, nonce, confidence, event);
    });

    console.log('✅ Listening for AISubmitted events via WebSocket...\n');
  }

  async startPolling() {
    console.log('🔁 Starting polling mode (every 5 minutes)...');

    setInterval(async () => {
      try {
        const hasPending = await this.contract.hasPending();
        if (hasPending) {
          console.log('\n📋 Pending recommendation detected');
          await this.executeRebalance();
        }
      } catch (error) {
        console.error('Polling error:', error.message);
      }
    }, 5 * 60 * 1000); // Every 5 minutes
  }

  async start() {
    try {
      await this.connect();

      // Start listening for events
      this.startListening();

      // Also start polling as backup
      await this.startPolling();

      console.log('🤖 Keeper service running...\n');

    } catch (error) {
      console.error('Fatal error:', error);
      process.exit(1);
    }
  }

  async stop() {
    console.log('\n⏹️ Stopping keeper service...');
    this.contractWS.removeAllListeners('AISubmitted');
    await this.mongoClient.close();
    console.log('✅ Stopped');
  }
}

// Handle graceful shutdown
const keeper = new KeeperService();

process.on('SIGINT', async () => {
  await keeper.stop();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await keeper.stop();
  process.exit(0);
});

// Start keeper
if (require.main === module) {
  keeper.start().catch(error => {
    console.error('Failed to start keeper:', error);
    process.exit(1);
  });
}

module.exports = KeeperService;
