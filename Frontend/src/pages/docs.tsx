import React, { useState } from 'react';
import { Book, Shield, Code2, Zap, Lock, Activity, ChevronRight, Search, Menu, X, ExternalLink, Copy, Check, Github, FileText, AlertCircle } from 'lucide-react';

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);

  const navigation = [
    {
      title: 'Getting Started',
      items: [
        { id: 'overview', label: 'Overview', icon: Book },
        { id: 'architecture', label: 'Architecture', icon: Activity },
        { id: 'quick-start', label: 'Quick Start', icon: Zap }
      ]
    },
    {
      title: 'Core Concepts',
      items: [
        { id: 'erc4626', label: 'ERC4626 Standard', icon: Shield },
        { id: 'strategies', label: 'Strategy System', icon: Lock },
        { id: 'rebalancing', label: 'Auto-Rebalancing', icon: Activity }
      ]
    },
    {
      title: 'Technical Reference',
      items: [
        { id: 'contracts', label: 'Smart Contracts', icon: Code2 },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'api', label: 'API Reference', icon: FileText }
      ]
    }
  ];

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const CodeBlock = ({ code, language = 'solidity', id }) => (
    <div className="relative group">
      <div className="absolute right-3 top-3 z-10">
        <button
          onClick={() => copyToClipboard(code, id)}
          className="p-2 rounded-lg bg-muted/80 hover:bg-muted border border-border transition-all"
        >
          {copiedCode === id ? (
            <Check className="w-4 h-4 text-primary" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>
      <pre className="bg-card border border-border rounded-xl p-6 overflow-x-auto">
        <code className="text-sm font-mono text-foreground">{code}</code>
      </pre>
    </div>
  );

  const sections = {
    overview: (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Overview</h1>
          <p className="text-lg text-muted-foreground">
            Yield Aggregator V1 is an institutional-grade DeFi protocol that optimizes yield generation through automated multi-strategy deployment of vETH tokens.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">ERC4626 Tokenized Vault</h3>
              <p className="text-sm text-muted-foreground">
                This protocol implements the ERC4626 standard, ensuring maximum composability and standardization across the DeFi ecosystem.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: Shield, title: 'ERC4626 Compliant', desc: 'Industry-standard vault implementation' },
              { icon: Zap, title: 'Automated Operations', desc: 'Smart rebalancing every 24 hours' },
              { icon: Lock, title: 'Multi-Strategy', desc: 'Diversified across 3 protocols' },
              { icon: Code2, title: 'Built with Foundry', desc: 'Fast and modular development' }
            ].map((feature, i) => (
              <div key={i} className="p-5 rounded-xl bg-card border border-border hover:border-primary/40 transition-all">
                <feature.icon className="w-5 h-5 text-primary mb-3" />
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Strategy Allocation</h2>
          <div className="space-y-3">
            {[
              { name: 'Lending Strategy (Aave-like)', allocation: 40, risk: 'Low', apy: '4%' },
              { name: 'Liquidity Strategy (DEX)', allocation: 30, risk: 'High', apy: '12%' },
              { name: 'Staking Strategy', allocation: 30, risk: 'Medium', apy: '7%' }
            ].map((strategy, i) => (
              <div key={i} className="p-5 rounded-xl bg-card border border-border">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold">{strategy.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">Base APY: {strategy.apy}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${strategy.risk === 'Low' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' :
                      strategy.risk === 'Medium' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20' :
                        'bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20'
                    }`}>
                    {strategy.risk} Risk
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Allocation</span>
                    <span className="font-semibold">{strategy.allocation}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full" style={{ width: `${strategy.allocation}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    architecture: (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Architecture</h1>
          <p className="text-lg text-muted-foreground">
            The Yield Aggregator follows a modular, secure architecture based on the ERC4626 vault standard.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">System Components</h2>
          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">1</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">YieldVault Contract</h3>
                  <p className="text-sm text-muted-foreground">
                    Main ERC4626-compliant vault managing deposits, withdrawals, and share accounting. Inherits from OpenZeppelin's ERC4626 implementation.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">2</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Strategy Manager</h3>
                  <p className="text-sm text-muted-foreground">
                    Coordinates allocation across multiple yield-generating strategies and manages rebalancing logic.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">3</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Strategy Adapters</h3>
                  <p className="text-sm text-muted-foreground">
                    Individual contracts for Lending, Liquidity, and Staking strategies. Each implements a common interface for unified management.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">4</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Oracle & Price Feeds</h3>
                  <p className="text-sm text-muted-foreground">
                    Chainlink-based price feeds for accurate valuation and rebalancing decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Contract Hierarchy</h2>
          <CodeBlock id="hierarchy" code={`YieldVault (ERC4626)
├── StrategyManager
│   ├── LendingStrategy (40%)
│   ├── LiquidityStrategy (30%)
│   └── StakingStrategy (30%)
├── PriceOracle
└── AccessControl (Owner/Admin roles)`} language="text" />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Data Flow</h2>
          <div className="p-6 rounded-2xl bg-card border border-border">
            <ol className="space-y-4 list-decimal list-inside">
              <li className="text-sm">
                <span className="font-semibold">User deposits vETH</span>
                <p className="text-muted-foreground ml-5 mt-1">Vault mints yvETH shares proportional to deposit</p>
              </li>
              <li className="text-sm">
                <span className="font-semibold">Vault allocates to strategies</span>
                <p className="text-muted-foreground ml-5 mt-1">Strategy Manager distributes funds according to allocation percentages</p>
              </li>
              <li className="text-sm">
                <span className="font-semibold">Strategies generate yield</span>
                <p className="text-muted-foreground ml-5 mt-1">Each strategy interacts with underlying protocols (Aave, Uniswap, etc.)</p>
              </li>
              <li className="text-sm">
                <span className="font-semibold">Auto-rebalance (24h)</span>
                <p className="text-muted-foreground ml-5 mt-1">Keeper calls rebalance() to optimize allocations based on performance</p>
              </li>
              <li className="text-sm">
                <span className="font-semibold">User withdraws</span>
                <p className="text-muted-foreground ml-5 mt-1">Burns yvETH shares and receives vETH + accrued yields</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    ),
    'quick-start': (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Quick Start</h1>
          <p className="text-lg text-muted-foreground">
            Get started with Yield Aggregator V1 in minutes. Follow these steps to deploy and interact with the vault.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Prerequisites</h2>
          <div className="p-5 rounded-xl bg-card border border-border">
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Foundry installed (<code className="px-1.5 py-0.5 rounded bg-muted text-xs">foundryup</code>)</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Node.js v16+ and npm/yarn</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>MetaMask or compatible Web3 wallet</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Test ETH (for testnet deployment)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Installation</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Clone the repository:</p>
              <CodeBlock id="clone" code={`git clone https://github.com/your-org/yield-aggregator-v1.git
cd yield-aggregator-v1`} language="bash" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Install dependencies:</p>
              <CodeBlock id="install" code={`forge install
npm install`} language="bash" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Set up environment variables:</p>
              <CodeBlock id="env" code={`cp .env.example .env
# Edit .env with your RPC URLs and private keys`} language="bash" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Deployment</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Compile contracts:</p>
              <CodeBlock id="compile" code={`forge build`} language="bash" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Run tests:</p>
              <CodeBlock id="test" code={`forge test -vvv`} language="bash" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Deploy to testnet:</p>
              <CodeBlock id="deploy" code={`forge script script/Deploy.s.sol:DeployScript --rpc-url $SEPOLIA_RPC_URL --broadcast --verify`} language="bash" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Basic Usage</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Deposit vETH to the vault:</p>
              <CodeBlock id="deposit" code={`// Approve vault to spend vETH
await vETHToken.approve(vaultAddress, depositAmount);

// Deposit and receive yvETH shares
await yieldVault.deposit(depositAmount, userAddress);`} language="javascript" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Check your balance:</p>
              <CodeBlock id="balance" code={`const shares = await yieldVault.balanceOf(userAddress);
const assets = await yieldVault.convertToAssets(shares);
console.log(\`You have \${shares} yvETH worth \${assets} vETH\`);`} language="javascript" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Withdraw your funds:</p>
              <CodeBlock id="withdraw" code={`// Withdraw all your shares
const shares = await yieldVault.balanceOf(userAddress);
await yieldVault.redeem(shares, userAddress, userAddress);`} language="javascript" />
            </div>
          </div>
        </div>
      </div>
    ),
    erc4626: (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">ERC4626 Standard</h1>
          <p className="text-lg text-muted-foreground">
            Understanding the tokenized vault standard that powers Yield Aggregator V1.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
          <h3 className="font-semibold mb-2">What is ERC4626?</h3>
          <p className="text-sm text-muted-foreground">
            ERC4626 is an Ethereum token standard for yield-bearing vaults. It standardizes the technical parameters of yield-bearing vaults, making them more robust and easier to integrate across DeFi.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Core Functions</h2>
          <div className="space-y-3">
            {[
              {
                func: 'deposit(uint256 assets, address receiver)',
                desc: 'Deposits assets into the vault and mints shares to the receiver.'
              },
              {
                func: 'mint(uint256 shares, address receiver)',
                desc: 'Mints exact number of shares by depositing required assets.'
              },
              {
                func: 'withdraw(uint256 assets, address receiver, address owner)',
                desc: 'Burns shares to withdraw exact amount of assets.'
              },
              {
                func: 'redeem(uint256 shares, address receiver, address owner)',
                desc: 'Redeems exact number of shares for underlying assets.'
              },
              {
                func: 'totalAssets()',
                desc: 'Returns total amount of underlying assets managed by vault.'
              },
              {
                func: 'convertToShares(uint256 assets)',
                desc: 'Calculates share amount for given asset amount.'
              },
              {
                func: 'convertToAssets(uint256 shares)',
                desc: 'Calculates asset amount for given share amount.'
              }
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl bg-card border border-border">
                <code className="text-sm font-mono text-primary block mb-2">{item.func}</code>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Implementation Example</h2>
          <CodeBlock id="erc4626-impl" code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract YieldVault is ERC4626 {
    constructor(
        IERC20 _asset,
        string memory _name,
        string memory _symbol
    ) ERC4626(_asset) ERC20(_name, _symbol) {}
    
    // Override totalAssets to include strategy yields
    function totalAssets() public view override returns (uint256) {
        return asset.balanceOf(address(this)) + strategyManager.totalDeployed();
    }
}`} language="solidity" />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Benefits of ERC4626</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: 'Standardization', desc: 'Common interface across all yield-bearing vaults' },
              { title: 'Composability', desc: 'Easy integration with other DeFi protocols' },
              { title: 'Security', desc: 'Battle-tested standard with clear specifications' },
              { title: 'Developer Experience', desc: 'Simplified development and testing' }
            ].map((benefit, i) => (
              <div key={i} className="p-5 rounded-xl bg-card border border-border">
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    strategies: (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Strategy System</h1>
          <p className="text-lg text-muted-foreground">
            Deep dive into the multi-strategy architecture that maximizes yield generation.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Strategy Interface</h2>
          <p className="text-muted-foreground mb-3">All strategies implement a common interface for unified management:</p>
          <CodeBlock id="strategy-interface" code={`interface IStrategy {
    // Deploy assets to the strategy
    function deploy(uint256 amount) external;
    
    // Withdraw assets from the strategy
    function withdraw(uint256 amount) external;
    
    // Get total value locked in strategy
    function totalValue() external view returns (uint256);
    
    // Harvest yields and compound
    function harvest() external;
    
    // Emergency withdrawal
    function emergencyWithdraw() external;
}`} language="solidity" />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Lending Strategy (40%)</h2>
          <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Overview</h3>
              <p className="text-sm text-muted-foreground">
                Conservative strategy deploying vETH to Aave-like lending protocols for stable, low-risk returns.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-background border border-border">
                <p className="text-xs text-muted-foreground mb-1">Base APY</p>
                <p className="text-2xl font-bold text-primary">4%</p>
              </div>
              <div className="p-4 rounded-lg bg-background border border-border">
                <p className="text-xs text-muted-foreground mb-1">Risk Level</p>
                <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">Low</p>
              </div>
              <div className="p-4 rounded-lg bg-background border border-border">
                <p className="text-xs text-muted-foreground mb-1">Allocation</p>
                <p className="text-lg font-semibold">40%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Liquidity Strategy (30%)</h2>
          <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Overview</h3>
              <p className="text-sm text-muted-foreground">
                High-yield strategy providing liquidity to DEX pools with dynamic fee optimization.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-background border border-border">
                <p className="text-xs text-muted-foreground mb-1">Base APY</p>
                <p className="text-2xl font-bold text-primary">12%</p>
              </div>
              <div className="p-4 rounded-lg bg-background border border-border">
                <p className="text-xs text-muted-foreground mb-1">Risk Level</p>
                <p className="text-lg font-semibold text-orange-600 dark:text-orange-400">High</p>
              </div>
              <div className="p-4 rounded-lg bg-background border border-border">
                <p className="text-xs text-muted-foreground mb-1">Allocation</p>
                <p className="text-lg font-semibold">30%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Staking Strategy (30%)</h2>
          <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Overview</h3>
              <p className="text-sm text-muted-foreground">
                Balanced staking approach with steady returns and moderate risk profile.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-background border border-border">
                <p className="text-xs text-muted-foreground mb-1">Base APY</p>
                <p className="text-2xl font-bold text-primary">7%</p>
              </div>
              <div className="p-4 rounded-lg bg-background border border-border">
                <p className="text-xs text-muted-foreground mb-1">Risk Level</p>
                <p className="text-lg font-semibold text-amber-600 dark:text-amber-400">Medium</p>
              </div>
              <div className="p-4 rounded-lg bg-background border border-border">
                <p className="text-xs text-muted-foreground mb-1">Allocation</p>
                <p className="text-lg font-semibold">30%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Strategy Manager</h2>
          <p className="text-muted-foreground mb-3">The Strategy Manager coordinates all strategy operations:</p>
          <CodeBlock id="strategy-manager" code={`contract StrategyManager {
    IStrategy[] public strategies;
    uint256[] public allocations; // [40, 30, 30]
    
    function rebalance() external onlyKeeper {
        uint256 totalAssets = getTotalAssets();
        
        for (uint i = 0; i < strategies.length; i++) {
            uint256 targetAmount = (totalAssets * allocations[i]) / 100;
            uint256 currentAmount = strategies[i].totalValue();
            
            if (currentAmount < targetAmount) {
                strategies[i].deploy(targetAmount - currentAmount);
            } else if (currentAmount > targetAmount) {
                strategies[i].withdraw(currentAmount - targetAmount);
            }
        }
    }
}`} language="solidity" />
        </div>
      </div>
    ),
    rebalancing: (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Auto-Rebalancing</h1>
          <p className="text-lg text-muted-foreground">
            Automated portfolio optimization through intelligent rebalancing mechanisms.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">24-Hour Rebalancing Cycle</h3>
              <p className="text-sm text-muted-foreground">
                The vault automatically rebalances every 24 hours to maintain optimal allocation across strategies and maximize risk-adjusted returns.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Rebalancing Logic</h2>
          <div className="p-6 rounded-2xl bg-card border border-border">
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Calculate Total Assets</h3>
                  <p className="text-sm text-muted-foreground">Aggregate all assets across vault and strategies</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">2</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Determine Target Allocations</h3>
                  <p className="text-sm text-muted-foreground">Calculate target amounts: 40% lending, 30% liquidity, 30% staking</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">3</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Compare Current vs Target</h3>
                  <p className="text-sm text-muted-foreground">Identify strategies that are over or under-allocated</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">4</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Execute Rebalance</h3>
                  <p className="text-sm text-muted-foreground">Withdraw from over-allocated, deploy to under-allocated strategies</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">5</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Harvest Yields</h3>
                  <p className="text-sm text-muted-foreground">Collect rewards and compound them back into strategies</p>
                </div>
              </li>
            </ol>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Rebalancing Implementation</h2>
          <CodeBlock id="rebalance-impl" code={`function rebalance() external onlyKeeper {
    // Step 1: Calculate total assets
    uint256 totalAssets = getTotalAssets();
    
    // Step 2: Harvest all yields first
    for (uint i = 0; i < strategies.length; i++) {
        strategies[i].harvest();
    }
    
    // Step 3: Rebalance each strategy
    for (uint i = 0; i < strategies.length; i++) {
        uint256 targetAmount = (totalAssets * allocations[i]) / 100;
        uint256 currentAmount = strategies[i].totalValue();
        
        if (currentAmount < targetAmount) {
            // Under-allocated: deploy more
            uint256 deployAmount = targetAmount - currentAmount;
            require(asset.balanceOf(address(this)) >= deployAmount, "Insufficient balance");
            asset.approve(address(strategies[i]), deployAmount);
            strategies[i].deploy(deployAmount);
        } else if (currentAmount > targetAmount) {
            // Over-allocated: withdraw excess
            uint256 withdrawAmount = currentAmount - targetAmount;
            strategies[i].withdraw(withdrawAmount);
        }
    }
    
    emit Rebalanced(totalAssets, block.timestamp);
}`} language="solidity" />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Keeper System</h2>
          <p className="text-muted-foreground mb-3">Automated execution through Chainlink Keepers or similar automation:</p>
          <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Keeper Requirements</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>24-hour interval check</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Gas-efficient execution</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Fail-safe mechanisms</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Minimum threshold checks</span>
                </li>
              </ul>
            </div>
            <CodeBlock id="keeper-check" code={`function checkUpkeep(bytes calldata) 
    external view returns (bool upkeepNeeded, bytes memory) {
    upkeepNeeded = (block.timestamp - lastRebalance) >= REBALANCE_INTERVAL;
}

function performUpkeep(bytes calldata) external {
    require((block.timestamp - lastRebalance) >= REBALANCE_INTERVAL, "Too soon");
    rebalance();
    lastRebalance = block.timestamp;
}`} language="solidity" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Gas Optimization</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="font-semibold mb-2">Batch Operations</h3>
              <p className="text-sm text-muted-foreground">Combine multiple strategy updates in single transaction</p>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="font-semibold mb-2">Threshold Checks</h3>
              <p className="text-sm text-muted-foreground">Skip rebalancing if deviation is below 2%</p>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="font-semibold mb-2">Efficient Storage</h3>
              <p className="text-sm text-muted-foreground">Pack variables and minimize SLOAD operations</p>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="font-semibold mb-2">Emergency Pause</h3>
              <p className="text-sm text-muted-foreground">Ability to halt rebalancing during market volatility</p>
            </div>
          </div>
        </div>
      </div>
    ),
    contracts: (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Smart Contracts</h1>
          <p className="text-lg text-muted-foreground">
            Complete technical reference for all smart contracts in the Yield Aggregator protocol.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">YieldVault.sol</h2>
          <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Main Contract</h3>
              <p className="text-sm text-muted-foreground mb-4">
                ERC4626-compliant vault managing user deposits and yield distribution.
              </p>
            </div>
            <CodeBlock id="yield-vault" code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract YieldVault is ERC4626, Ownable, ReentrancyGuard {
    IStrategyManager public strategyManager;
    uint256 public constant PERFORMANCE_FEE = 1000; // 10%
    uint256 public constant FEE_DENOMINATOR = 10000;
    
    event PerformanceFeeCollected(uint256 amount);
    event StrategyManagerUpdated(address newManager);
    
    constructor(
        IERC20 _asset,
        string memory _name,
        string memory _symbol,
        address _strategyManager
    ) ERC4626(_asset) ERC20(_name, _symbol) {
        strategyManager = IStrategyManager(_strategyManager);
    }
    
    function totalAssets() public view override returns (uint256) {
        return asset.balanceOf(address(this)) + 
               strategyManager.totalDeployed();
    }
    
    function _deposit(
        address caller,
        address receiver,
        uint256 assets,
        uint256 shares
    ) internal override nonReentrant {
        super._deposit(caller, receiver, assets, shares);
        
        // Deploy to strategies after deposit
        uint256 deployAmount = assets * 95 / 100; // Keep 5% buffer
        if (deployAmount > 0) {
            asset.transfer(address(strategyManager), deployAmount);
            strategyManager.deployFunds(deployAmount);
        }
    }
    
    function collectPerformanceFee() external onlyOwner {
        uint256 profit = totalAssets() - totalSupply();
        if (profit > 0) {
            uint256 fee = (profit * PERFORMANCE_FEE) / FEE_DENOMINATOR;
            _mint(owner(), convertToShares(fee));
            emit PerformanceFeeCollected(fee);
        }
    }
}`} language="solidity" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Key Functions</h2>
          <div className="grid gap-4">
            {[
              {
                name: 'deposit(uint256 assets, address receiver)',
                returns: 'uint256 shares',
                desc: 'Deposits assets and returns minted shares. Automatically deploys funds to strategies.'
              },
              {
                name: 'withdraw(uint256 assets, address receiver, address owner)',
                returns: 'uint256 shares',
                desc: 'Withdraws exact asset amount by burning shares. May withdraw from strategies if needed.'
              },
              {
                name: 'totalAssets()',
                returns: 'uint256',
                desc: 'Returns total assets under management including deployed strategy funds.'
              },
              {
                name: 'collectPerformanceFee()',
                returns: 'void',
                desc: 'Owner-only function to collect 10% performance fee on profits.'
              }
            ].map((func, i) => (
              <div key={i} className="p-5 rounded-xl bg-card border border-border">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <code className="text-sm font-mono text-primary">{func.name}</code>
                  <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">{func.returns}</span>
                </div>
                <p className="text-sm text-muted-foreground">{func.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Contract Addresses</h2>
          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-sm font-semibold">Network</span>
                <span className="text-sm font-semibold">Contract</span>
                <span className="text-sm font-semibold">Address</span>
              </div>
              {[
                { network: 'Ethereum Mainnet', contract: 'YieldVault', address: '0x1234...5678' },
                { network: 'Ethereum Mainnet', contract: 'StrategyManager', address: '0xabcd...ef01' },
                { network: 'Sepolia Testnet', contract: 'YieldVault', address: '0x9876...5432' },
                { network: 'Sepolia Testnet', contract: 'StrategyManager', address: '0xfedc...ba98' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center text-sm py-2">
                  <span className="text-muted-foreground">{item.network}</span>
                  <span className="font-mono text-foreground">{item.contract}</span>
                  <code className="text-primary font-mono bg-muted px-2 py-1 rounded">{item.address}</code>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Events</h2>
          <CodeBlock id="events" code={`event Deposit(address indexed sender, address indexed owner, uint256 assets, uint256 shares);
event Withdraw(address indexed sender, address indexed receiver, address indexed owner, uint256 assets, uint256 shares);
event PerformanceFeeCollected(uint256 amount);
event Rebalanced(uint256 totalAssets, uint256 timestamp);
event StrategyAdded(address indexed strategy, uint256 allocation);
event EmergencyWithdraw(address indexed strategy, uint256 amount);`} language="solidity" />
        </div>
      </div>
    ),
    security: (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Security</h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive security measures and best practices implemented in Yield Aggregator V1.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-orange-500/10 border border-orange-500/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">Security First Approach</h3>
              <p className="text-sm text-muted-foreground">
                All contracts have undergone extensive testing and follow industry best practices. However, DeFi protocols carry inherent risks. Never invest more than you can afford to lose.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Security Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                icon: Shield,
                title: 'Reentrancy Protection',
                desc: 'All external calls protected with ReentrancyGuard from OpenZeppelin'
              },
              {
                icon: Lock,
                title: 'Access Control',
                desc: 'Role-based permissions for sensitive functions (Owner, Keeper, Admin)'
              },
              {
                icon: Activity,
                title: 'Circuit Breakers',
                desc: 'Emergency pause functionality to halt operations during incidents'
              },
              {
                icon: Code2,
                title: 'Formal Verification',
                desc: 'Critical functions verified using Foundry invariant testing'
              }
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border">
                <feature.icon className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Audit Report</h2>
          <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Audit Status</h3>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Audited by [Audit Firm]</span>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-background border border-border">
                <p className="text-xs text-muted-foreground mb-1">Critical</p>
                <p className="text-2xl font-bold text-foreground">0</p>
              </div>
              <div className="p-4 rounded-lg bg-background border border-border">
                <p className="text-xs text-muted-foreground mb-1">High</p>
                <p className="text-2xl font-bold text-foreground">0</p>
              </div>
              <div className="p-4 rounded-lg bg-background border border-border">
                <p className="text-xs text-muted-foreground mb-1">Medium</p>
                <p className="text-2xl font-bold text-foreground">2</p>
              </div>
            </div>
            <div className="pt-2">
              <button className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                <FileText className="w-4 h-4" />
                Read Full Audit Report
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Testing Coverage</h2>
          <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-background border border-border">
                <p className="text-3xl font-bold text-primary mb-1">98%</p>
                <p className="text-xs text-muted-foreground">Line Coverage</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-background border border-border">
                <p className="text-3xl font-bold text-primary mb-1">95%</p>
                <p className="text-xs text-muted-foreground">Branch Coverage</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-background border border-border">
                <p className="text-3xl font-bold text-primary mb-1">250+</p>
                <p className="text-xs text-muted-foreground">Unit Tests</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-background border border-border">
                <p className="text-3xl font-bold text-primary mb-1">50+</p>
                <p className="text-xs text-muted-foreground">Invariant Tests</p>
              </div>
            </div>
            <CodeBlock id="test-example" code={`forge test --match-contract YieldVaultTest -vvv
Running 47 tests for test/YieldVault.t.sol:YieldVaultTest
[PASS] testDeposit() (gas: 158423)
[PASS] testWithdraw() (gas: 201567)
[PASS] testRebalance() (gas: 389421)
[PASS] testEmergencyWithdraw() (gas: 145289)
Test result: ok. 47 passed; 0 failed;`} language="bash" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Risk Mitigation</h2>
          <div className="space-y-3">
            {[
              {
                risk: 'Smart Contract Risk',
                mitigation: 'Audited code, extensive testing, time-locked upgrades, bug bounty program'
              },
              {
                risk: 'Strategy Risk',
                mitigation: 'Diversification across 3 strategies, allocation limits, regular monitoring'
              },
              {
                risk: 'Oracle Risk',
                mitigation: 'Chainlink price feeds, deviation checks, fallback oracles'
              },
              {
                risk: 'Liquidity Risk',
                mitigation: '5% buffer reserves, gradual withdrawals, emergency pause'
              },
              {
                risk: 'Admin Key Risk',
                mitigation: 'Multi-sig wallet, time-locks on critical functions, transparent governance'
              }
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl bg-card border border-border">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-orange-600 dark:text-orange-400">{item.risk}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{item.mitigation}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Bug Bounty</h2>
          <div className="p-6 rounded-2xl bg-card border border-border">
            <p className="text-muted-foreground mb-4">
              We take security seriously and reward researchers who help us maintain the highest standards.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-background border border-border">
                <p className="text-xs text-muted-foreground mb-1">Critical</p>
                <p className="text-xl font-bold text-foreground">$50,000</p>
              </div>
              <div className="p-4 rounded-lg bg-background border border-border">
                <p className="text-xs text-muted-foreground mb-1">High</p>
                <p className="text-xl font-bold text-foreground">$10,000</p>
              </div>
              <div className="p-4 rounded-lg bg-background border border-border">
                <p className="text-xs text-muted-foreground mb-1">Medium</p>
                <p className="text-xl font-bold text-foreground">$2,500</p>
              </div>
            </div>
            <div className="pt-4">
              <button className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                Submit a Bug Report
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    ),
    api: (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">API Reference</h1>
          <p className="text-lg text-muted-foreground">
            Complete API documentation for interacting with Yield Aggregator V1 contracts.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Read Functions</h2>
          <div className="space-y-3">
            {[
              {
                func: 'totalAssets()',
                returns: 'uint256',
                desc: 'Returns the total amount of underlying assets managed by the vault, including deployed funds.',
                example: 'const total = await vault.totalAssets();'
              },
              {
                func: 'balanceOf(address account)',
                returns: 'uint256',
                desc: 'Returns the number of yvETH shares owned by an account.',
                example: 'const shares = await vault.balanceOf(userAddress);'
              },
              {
                func: 'convertToAssets(uint256 shares)',
                returns: 'uint256',
                desc: 'Calculates the amount of assets that correspond to a given number of shares.',
                example: 'const assets = await vault.convertToAssets(shares);'
              },
              {
                func: 'convertToShares(uint256 assets)',
                returns: 'uint256',
                desc: 'Calculates the number of shares that correspond to a given amount of assets.',
                example: 'const shares = await vault.convertToShares(assets);'
              },
              {
                func: 'maxDeposit(address receiver)',
                returns: 'uint256',
                desc: 'Returns the maximum amount of assets that can be deposited.',
                example: 'const maxDep = await vault.maxDeposit(userAddress);'
              }
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl bg-card border border-border space-y-3">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <code className="text-sm font-mono text-primary">{item.func}</code>
                    <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 whitespace-nowrap">→ {item.returns}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground mb-1">Example:</p>
                  <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">{item.example}</code>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Write Functions</h2>
          <div className="space-y-3">
            {[
              {
                func: 'deposit(uint256 assets, address receiver)',
                returns: 'uint256 shares',
                desc: 'Deposits assets into the vault and mints shares to the receiver. Requires prior approval.',
                example: `await vETH.approve(vaultAddress, amount);
const tx = await vault.deposit(amount, userAddress);`
              },
              {
                func: 'mint(uint256 shares, address receiver)',
                returns: 'uint256 assets',
                desc: 'Mints exact number of shares by depositing the required amount of assets.',
                example: `await vETH.approve(vaultAddress, maxAmount);
const tx = await vault.mint(shares, userAddress);`
              },
              {
                func: 'withdraw(uint256 assets, address receiver, address owner)',
                returns: 'uint256 shares',
                desc: 'Burns shares to withdraw exact amount of assets to the receiver.',
                example: 'const tx = await vault.withdraw(amount, userAddress, userAddress);'
              },
              {
                func: 'redeem(uint256 shares, address receiver, address owner)',
                returns: 'uint256 assets',
                desc: 'Redeems exact number of shares for underlying assets.',
                example: 'const tx = await vault.redeem(shares, userAddress, userAddress);'
              }
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl bg-card border border-border space-y-3">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <code className="text-sm font-mono text-primary">{item.func}</code>
                    <span className="text-xs font-mono text-amber-600 dark:text-amber-400 whitespace-nowrap">→ {item.returns}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground mb-1">Example:</p>
                  <pre className="text-xs font-mono bg-muted px-2 py-1 rounded overflow-x-auto">{item.example}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Integration Example</h2>
          <p className="text-muted-foreground mb-3">Complete example of integrating with the vault:</p>
          <CodeBlock id="integration" code={`import { ethers } from 'ethers';

// Contract ABIs and addresses
const VAULT_ADDRESS = '0x...';
const VETH_ADDRESS = '0x...';

async function depositToVault(amount) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  
  // Initialize contracts
  const vETH = new ethers.Contract(VETH_ADDRESS, vETH_ABI, signer);
  const vault = new ethers.Contract(VAULT_ADDRESS, VAULT_ABI, signer);
  
  try {
    // Step 1: Approve vault to spend vETH
    console.log('Approving...');
    const approveTx = await vETH.approve(VAULT_ADDRESS, amount);
    await approveTx.wait();
    
    // Step 2: Deposit to vault
    console.log('Depositing...');
    const depositTx = await vault.deposit(amount, await signer.getAddress());
    const receipt = await depositTx.wait();
    
    // Step 3: Get minted shares
    const shares = await vault.balanceOf(await signer.getAddress());
    console.log(\`Deposited! You received \${ethers.utils.formatEther(shares)} yvETH\`);
    
    return { success: true, shares, txHash: receipt.transactionHash };
  } catch (error) {
    console.error('Deposit failed:', error);
    return { success: false, error };
  }
}

async function withdrawFromVault(shares) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const vault = new ethers.Contract(VAULT_ADDRESS, VAULT_ABI, signer);
  const userAddress = await signer.getAddress();
  
  try {
    // Calculate expected assets
    const expectedAssets = await vault.convertToAssets(shares);
    console.log(\`You will receive ~\${ethers.utils.formatEther(expectedAssets)} vETH\`);
    
    // Redeem shares
    const redeemTx = await vault.redeem(shares, userAddress, userAddress);
    const receipt = await redeemTx.wait();
    
    console.log('Withdrawal successful!');
    return { success: true, assets: expectedAssets, txHash: receipt.transactionHash };
  } catch (error) {
    console.error('Withdrawal failed:', error);
    return { success: false, error };
  }
}`} language="javascript" />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Events</h2>
          <p className="text-muted-foreground mb-3">Listen to vault events for real-time updates:</p>
          <CodeBlock id="events-listen" code={`// Listen for Deposit events
vault.on('Deposit', (sender, owner, assets, shares, event) => {
  console.log(\`New deposit: \${ethers.utils.formatEther(assets)} vETH\`);
  console.log(\`Shares minted: \${ethers.utils.formatEther(shares)} yvETH\`);
});

// Listen for Withdraw events
vault.on('Withdraw', (sender, receiver, owner, assets, shares, event) => {
  console.log(\`Withdrawal: \${ethers.utils.formatEther(assets)} vETH\`);
  console.log(\`Shares burned: \${ethers.utils.formatEther(shares)} yvETH\`);
});

// Listen for Rebalance events
vault.on('Rebalanced', (totalAssets, timestamp, event) => {
  console.log(\`Vault rebalanced at \${new Date(timestamp * 1000)}\`);
  console.log(\`Total assets: \${ethers.utils.formatEther(totalAssets)} vETH\`);
});`} language="javascript" />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Error Handling</h2>
          <div className="p-6 rounded-2xl bg-card border border-border">
            <p className="text-sm text-muted-foreground mb-4">Common errors and their solutions:</p>
            <div className="space-y-3">
              {[
                {
                  error: 'ERC20: insufficient allowance',
                  solution: 'Call approve() before deposit() or mint()'
                },
                {
                  error: 'ERC4626: deposit more than max',
                  solution: 'Check maxDeposit() before depositing'
                },
                {
                  error: 'ERC4626: withdraw more than max',
                  solution: 'Check maxWithdraw() before withdrawing'
                },
                {
                  error: 'Insufficient balance',
                  solution: 'Ensure you have enough vETH or yvETH shares'
                }
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-lg bg-background border border-border">
                  <code className="text-xs font-mono text-orange-600 dark:text-orange-400 block mb-1">{item.error}</code>
                  <p className="text-sm text-muted-foreground">→ {item.solution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Rate Limits & Best Practices</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="font-semibold mb-2">Gas Optimization</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Batch multiple deposits when possible</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Use estimateGas() before transactions</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Monitor gas prices for optimal timing</span>
                </li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="font-semibold mb-2">Security</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Always verify contract addresses</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Use hardware wallets for large amounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Never share private keys or seed phrases</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <a href="/" className="flex items-center gap-2 font-bold text-lg">
                <Activity className="w-6 h-6 text-primary" />
                <span>Yield Aggregator V1</span>
              </a>
              <span className="text-sm text-muted-foreground hidden md:block">Documentation</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card">
                <Search className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Search docs...</span>
              </div>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-accent transition-all">
                <Github className="w-5 h-5" />
              </a>
              <button
                className="md:hidden p-2 rounded-lg hover:bg-accent transition-all"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8 py-8">
          {/* Sidebar */}
          <aside className={`${isSidebarOpen ? 'fixed inset-0 z-40 bg-background md:relative md:inset-auto' : 'hidden'} md:block md:w-64 flex-shrink-0`}>
            <div className={`${isSidebarOpen ? 'h-full overflow-y-auto pt-20 px-4' : ''} md:sticky md:top-24 space-y-8`}>
              {navigation.map((section, i) => (
                <div key={i}>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-3">{section.title}</h3>
                  <nav className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveSection(item.id);
                            setIsSidebarOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${activeSection === item.id
                              ? 'bg-primary/10 text-primary font-medium border border-primary/20'
                              : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                            }`}
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              ))}

              <div className="pt-4 border-t border-border">
                <a href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-all">
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  <span>Back to Home</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              {sections[activeSection]}
            </div>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-border">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  © 2024 Yield Aggregator V1. All rights reserved.
                </p>
                <div className="flex items-center gap-4">
                  <a href="https://github.com" className="text-sm text-muted-foreground hover:text-primary transition-all flex items-center gap-1">
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  <a href="https://twitter.com" className="text-sm text-muted-foreground hover:text-primary transition-all">
                    Twitter
                  </a>
                  <a href="https://discord.com" className="text-sm text-muted-foreground hover:text-primary transition-all">
                    Discord
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}