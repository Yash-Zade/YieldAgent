import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import {
  Wallet,
  ArrowDown,
  ArrowUp,
  Gift,
  Lock,
  Info,
  Eye,
  EyeOff,
  TrendingUp,
  Activity,
  Shield,
  Zap,
  ArrowDownUp,
} from "lucide-react";
import { useAccount } from "wagmi";
import { readContract, writeContract, waitForTransactionReceipt } from "@wagmi/core";
import { parseUnits, formatUnits } from "viem";
import { config } from "@/config/wagmiConfig";

import VUSDT_ABI from "../abis/vUSDT.json";
import YIELD_VAULT_ABI from "../abis/yieldVault.json";

import { toast, ToastContainer } from "react-toastify";

const VUSDT_ADDRESS = import.meta.env.VITE_VUSDT_ADDRESS as `0x${string}`;
const YIELD_VAULT_ADDRESS = import.meta.env.VITE_YIELD_VAULT_ADDRESS as `0x${string}`;

export default function Vault() {
  const { address } = useAccount();
  const [vusdtBalance, setVusdtBalance] = useState<string>("0");
  const [vaultData, setVaultData] = useState<string>("0");
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [hideBalances, setHideBalances] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [actionType, setActionType] = useState<"deposit" | "withdraw">("deposit");
  
  // Withdraw specific states - Trading style
  const [fromToken, setFromToken] = useState<"vusdt" | "InfiCoin">("vusdt");
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [sharePrice, setSharePrice] = useState<number>(1.0); // 1 InfiCoin = X vUSDT

  // New: Dynamic vault stats
  const [vaultStats, setVaultStats] = useState<{ apy: number; tvl: number }>({ apy: 0, tvl: 0 });

  const loadVaultBalances = async () => {
    if (!address) return;
    try {
      const vaultResult = await readContract(config, {
        address: YIELD_VAULT_ADDRESS,
        abi: YIELD_VAULT_ABI,
        functionName: "balanceOf",
        args: [address],
      }) as bigint;

      setVaultData(formatUnits(vaultResult, 18));

      const balance = await readContract(config, {
        address: VUSDT_ADDRESS,
        abi: VUSDT_ABI,
        functionName: "balanceOf",
        args: [address],
      }) as bigint;

      setVusdtBalance(formatUnits(balance, 18));

      try {
        const oneShare = parseUnits("1", 18);
        const assetsPerShare = await readContract(config, {
          address: YIELD_VAULT_ADDRESS,
          abi: YIELD_VAULT_ABI,
          functionName: "previewRedeem",
          args: [oneShare],
        }) as bigint;
        
        setSharePrice(parseFloat(formatUnits(assetsPerShare, 18)));
      } catch (err) {
        console.error("Error calculating share price:", err);
        setSharePrice(1.0);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load vault balances.");
    }
  };

  // 🔥 New function to remove hardcoding (fetch real APY and TVL)
  const loadVaultStats = async () => {
    try {
      const apy = await readContract(config, {
        address: YIELD_VAULT_ADDRESS,
        abi: YIELD_VAULT_ABI,
        functionName: "estimatedVaultAPY",
        args: [],
      }) as bigint;

      const totalAssets = await readContract(config, {
        address: YIELD_VAULT_ADDRESS,
        abi: YIELD_VAULT_ABI,
        functionName: "totalAssets",
        args: [],
      }) as bigint;

      setVaultStats({
        apy: Number(apy) / 100, // convert from basis points
        tvl: parseFloat(formatUnits(totalAssets, 18)),
      });
    } catch (err) {
      console.error("Failed to load vault stats:", err);
    }
  };

  const handleAirdrop = async () => {
    if (!address) return;
    try {
      const hasClaimed = await readContract(config, {
        address: VUSDT_ADDRESS,
        abi: VUSDT_ABI,
        functionName: "hasClaimed",
        args: [address],
      }) as boolean;

      if (hasClaimed) {
        toast.error("You already claimed your airdrop.");
        return;
      }

      const tx = await writeContract(config, {
        address: VUSDT_ADDRESS,
        abi: VUSDT_ABI,
        functionName: "airDrop",
        args: [],
      });

      toast.info("Transaction sent. Waiting for confirmation...");
      const receipt = await waitForTransactionReceipt(config, { hash: tx });

      if (receipt.status === "success") {
        toast.success("10,000 vUSDT claimed successfully");
        await loadVaultBalances();
      } else {
        toast.error("Airdrop failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Airdrop failed.");
    }
  };

  const handleFromAmountChange = async (value: string) => {
    setFromAmount(value);
    
    if (!value || parseFloat(value) <= 0) {
      setToAmount("");
      return;
    }

    try {
      const amt = parseUnits(value, 18);

      if (fromToken === "vusdt") {
        const sharesNeeded = await readContract(config, {
          address: YIELD_VAULT_ADDRESS,
          abi: YIELD_VAULT_ABI,
          functionName: "previewWithdraw",
          args: [amt],
        }) as bigint;
        
        setToAmount(formatUnits(sharesNeeded, 18));
      } else {
        const assetsReceived = await readContract(config, {
          address: YIELD_VAULT_ADDRESS,
          abi: YIELD_VAULT_ABI,
          functionName: "previewRedeem",
          args: [amt],
        }) as bigint;
        
        setToAmount(formatUnits(assetsReceived, 18));
      }
    } catch (err) {
      console.error("Error calculating conversion:", err);
      const calculated = fromToken === "vusdt" 
        ? parseFloat(value) / sharePrice 
        : parseFloat(value) * sharePrice;
      setToAmount(calculated.toFixed(6));
    }
  };

  const handleToAmountChange = async (value: string) => {
    setToAmount(value);
    
    if (!value || parseFloat(value) <= 0) {
      setFromAmount("");
      return;
    }

    try {
      const amt = parseUnits(value, 18);

      if (fromToken === "vusdt") {
        const assetsNeeded = await readContract(config, {
          address: YIELD_VAULT_ADDRESS,
          abi: YIELD_VAULT_ABI,
          functionName: "previewMint",
          args: [amt],
        }) as bigint;
        
        setFromAmount(formatUnits(assetsNeeded, 18));
      } else {
        const sharesNeeded = await readContract(config, {
          address: YIELD_VAULT_ADDRESS,
          abi: YIELD_VAULT_ABI,
          functionName: "previewDeposit",
          args: [amt],
        }) as bigint;
        
        setFromAmount(formatUnits(sharesNeeded, 18));
      }
    } catch (err) {
      console.error("Error calculating reverse conversion:", err);
      const calculated = fromToken === "vusdt" 
        ? parseFloat(value) * sharePrice 
        : parseFloat(value) / sharePrice;
      setFromAmount(calculated.toFixed(6));
    }
  };

  const handleFlipTokens = () => {
    setFromToken(fromToken === "vusdt" ? "InfiCoin" : "vusdt");
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleTransaction = async () => {
    if (!address) return;
    
    try {
      setLoading(true);

      if (actionType === "deposit") {
        if (!amount || parseFloat(amount) <= 0) return;
        
        const amt = parseUnits(amount, 18);
        
        const allowance = await readContract(config, {
          address: VUSDT_ADDRESS,
          abi: VUSDT_ABI,
          functionName: "allowance",
          args: [address, YIELD_VAULT_ADDRESS],
        }) as bigint;

        if (allowance < amt) {
          const approveTx = await writeContract(config, {
            address: VUSDT_ADDRESS,
            abi: VUSDT_ABI,
            functionName: "approve",
            args: [YIELD_VAULT_ADDRESS, amt],
          });

          toast.info("Approving spend...");
          await waitForTransactionReceipt(config, { hash: approveTx });
        }

        const tx = await writeContract(config, {
          address: YIELD_VAULT_ADDRESS,
          abi: YIELD_VAULT_ABI,
          functionName: "deposit",
          args: [amt, address],
        });

        toast.info("Depositing... please wait");
        const receipt = await waitForTransactionReceipt(config, { hash: tx });

        if (receipt.status === "success") {
          toast.success("Deposit successful");
          setAmount("");
          onClose();
          await loadVaultBalances();
          await loadVaultStats();
        }
      } else {
        if (!fromAmount || parseFloat(fromAmount) <= 0) return;
        
        const amt = parseUnits(fromAmount, 18);

        if (fromToken === "vusdt") {
          const tx = await writeContract(config, {
            address: YIELD_VAULT_ADDRESS,
            abi: YIELD_VAULT_ABI,
            functionName: "withdraw",
            args: [amt, address, address],
          });

          toast.info("Withdrawing vUSDT... please wait");
          const receipt = await waitForTransactionReceipt(config, { hash: tx });

          if (receipt.status === "success") {
            toast.success("Withdrawal successful");
            setFromAmount("");
            setToAmount("");
            onClose();
            await loadVaultBalances();
            await loadVaultStats();
          }
        } else {
          const tx = await writeContract(config, {
            address: YIELD_VAULT_ADDRESS,
            abi: YIELD_VAULT_ABI,
            functionName: "redeem",
            args: [amt, address, address],
          });

          toast.info("Redeeming InfiCoin... please wait");
          const receipt = await waitForTransactionReceipt(config, { hash: tx });

          if (receipt.status === "success") {
            toast.success("Redemption successful");
            setFromAmount("");
            setToAmount("");
            onClose();
            await loadVaultBalances();
            await loadVaultStats();
          }
        }
      }
    } catch (err) {
      console.error(err);
      toast.error(`${actionType === "deposit" ? "Deposit" : "Withdrawal"} failed.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
      loadVaultBalances();
      loadVaultStats();
    }
  }, [address]);

  const vaultBalance = parseFloat(vaultData);
  const walletBalance = parseFloat(vusdtBalance);

  const openModal = (type: "deposit" | "withdraw") => {
    setActionType(type);
    setAmount("");
    setFromAmount("");
    setToAmount("");
    setFromToken("vusdt");
    onOpen();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Activity className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span className="text-xs font-medium text-primary">ERC4626 Tokenized Vault</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent mb-3">
              Yield Vault
            </h1>
            <p className="text-lg text-muted-foreground flex items-center gap-2">
              <TrendingUp size={16} className="text-primary" />
              Deposit vUSDT and earn automated, risk-adjusted yields
            </p>
          </div>
          <Button
            size="lg"
            variant="bordered"
            onPress={() => setHideBalances(!hideBalances)}
            className="h-12 px-6 rounded-lg border-border hover:bg-accent transition-all"
            isIconOnly
          >
            {hideBalances ? <EyeOff size={20} /> : <Eye size={20} />}
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* Vault Balance - Main Card */}
          <div className="lg:col-span-2">
            <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                      <Lock size={20} className="text-primary" />
                    </div>
                    <span className="text-lg font-semibold text-foreground">Vault Balance</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Active</span>
                  </div>
                </div>

                {/* Balance Display */}
                <div className="py-4">
                  <p className="text-5xl font-bold text-foreground mb-2">
                    {hideBalances ? "••••••" : `${vaultBalance.toFixed(6)}`}
                  </p>
                  <p className="text-lg text-muted-foreground">InfiCoin Shares</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    ≈ {hideBalances ? "••••••" : `${(vaultBalance * sharePrice).toFixed(2)}`} vUSDT
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-border">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground font-medium">Share Price</p>
                    <p className="text-2xl font-bold text-primary">{sharePrice.toFixed(4)}</p>
                    <p className="text-xs text-muted-foreground">vUSDT per InfiCoin</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground font-medium">Base APY</p>
                    <p className="text-2xl font-bold text-foreground">
                      {vaultStats.apy ? `${vaultStats.apy.toFixed(2)}%` : "--"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground font-medium">TVL</p>
                    <p className="text-2xl font-bold text-foreground">
                      {vaultStats.tvl ? `$${(vaultStats.tvl / 1_000_000).toFixed(2)}M` : "--"}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button
                    onPress={() => openModal("deposit")}
                    size="lg"
                    className="flex-1 h-12 rounded-lg bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
                  >
                    <ArrowDown size={18} />
                    Deposit
                  </Button>
                  <Button
                    onPress={() => openModal("withdraw")}
                    size="lg"
                    variant="bordered"
                    className="flex-1 h-12 rounded-lg border-border hover:bg-accent font-medium transition-all"
                  >
                    <ArrowUp size={18} />
                    Withdraw
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Wallet Balance */}
            <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                    <Wallet size={16} className="text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-muted-foreground">Wallet Balance</span>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground mb-1">
                    {hideBalances ? "••••••" : walletBalance.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">vUSDT Available</p>
                </div>
              </div>
            </div>

            {/* Airdrop Card */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-primary/5 border border-primary/20">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                    <Gift size={18} className="text-primary" />
                  </div>
                  <span className="text-base font-semibold text-foreground">Claim Airdrop</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Get <span className="text-primary font-semibold">10,000 vUSDT</span> tokens to start earning yields in the vault
                </p>
                <Button
                  onPress={handleAirdrop}
                  size="lg"
                  className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
                >
                  Claim Tokens
                </Button>
              </div>
            </div>

          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <Zap size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-2">Auto-Compounding</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Yields automatically reinvested for maximized returns
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <Shield size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-2">No Lock Period</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Withdraw your funds anytime without penalties
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <Info size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-2">Audited Contracts</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Security-first approach with comprehensive testing coverage
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
        classNames={{
          base: "bg-card border border-border rounded-2xl",
          header: "border-b border-border px-8 py-6",
          body: "px-8 py-6",
          footer: "border-t border-border px-8 py-6"
        }}
      >
        <ModalContent>
          <ModalHeader>
            <div className="flex items-center gap-3">
              <div
                className={`p-2.5 rounded-xl ${
                  actionType === "deposit"
                    ? "bg-primary/10 border border-primary/20"
                    : "bg-orange-500/10 border border-orange-500/20"
                }`}
              >
                {actionType === "deposit" ? (
                  <ArrowDown size={20} className="text-primary" />
                ) : (
                  <ArrowUp size={20} className="text-orange-600 dark:text-orange-400" />
                )}
              </div>
              <span className="text-xl font-bold text-foreground">
                {actionType === "deposit" ? "Deposit to Vault" : "Withdraw from Vault"}
              </span>
            </div>
          </ModalHeader>
          <ModalBody>
            {actionType === "deposit" ? (
              // Simple Deposit UI
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-medium text-muted-foreground">Amount</label>
                    <button
                      onClick={() => setAmount(vusdtBalance)}
                      className="text-sm text-primary hover:text-primary/80 font-semibold transition-colors"
                    >
                      Max: {walletBalance.toFixed(2)}
                    </button>
                  </div>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    size="lg"
                    classNames={{
                      inputWrapper: "h-14 border-border rounded-lg bg-background hover:bg-accent transition-colors",
                      input: "text-lg font-semibold"
                    }}
                    endContent={<span className="text-base font-medium text-muted-foreground">vUSDT</span>}
                  />
                </div>

                {amount && parseFloat(amount) > 0 && (
                  <div className="p-4 rounded-xl border bg-primary/5 border-primary/20">
                    <p className="text-sm text-muted-foreground mb-2">You will receive approximately:</p>
                    <p className="text-lg font-bold text-foreground">
                      {(parseFloat(amount) / sharePrice).toFixed(6)} InfiCoin
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      @ {sharePrice.toFixed(4)} vUSDT per InfiCoin
                    </p>
                  </div>
                )}
              </div>
            ) : (
              // Trading-style Withdraw UI - ONLY BALANCE DISPLAY CHANGED
              <div className="space-y-5">
                {/* Current Price Display */}
                <div className="p-4 rounded-xl bg-accent border border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Current Price</span>
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">{sharePrice.toFixed(4)}</p>
                      <p className="text-xs text-muted-foreground">vUSDT per InfiCoin</p>
                    </div>
                  </div>
                </div>

                {/* From Token - FIXED: Show vault balance instead of wallet balance */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-medium text-muted-foreground">From</label>
                    <button
                      onClick={() => {
                        // FIXED: Use vault balance (in appropriate token)
                        const max = fromToken === "vusdt" 
                          ? (vaultBalance * sharePrice).toString()  // Convert InfiCoin vault balance to vUSDT equivalent
                          : vaultData;  // Use InfiCoin vault balance directly
                        handleFromAmountChange(max);
                      }}
                      className="text-sm text-primary hover:text-primary/80 font-semibold transition-colors"
                    >
                      {/* FIXED: Display vault balance, not wallet balance */}
                      Balance: {fromToken === "vusdt" 
                        ? (vaultBalance * sharePrice).toFixed(2)
                        : vaultBalance.toFixed(6)}
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={fromAmount}
                      onChange={(e) => handleFromAmountChange(e.target.value)}
                      size="lg"
                      classNames={{
                        inputWrapper: "h-14 border-border rounded-lg bg-background hover:bg-accent transition-colors",
                        input: "text-lg font-semibold"
                      }}
                      endContent={
                        <span className="text-base font-medium text-foreground">
                          {fromToken === "vusdt" ? "vUSDT" : "InfiCoin"}
                        </span>
                      }
                    />
                  </div>
                </div>

                {/* Flip Button */}
                <div className="flex justify-center -my-2">
                  <button
                    onClick={handleFlipTokens}
                    className="p-2 rounded-lg bg-accent border border-border hover:bg-primary/10 hover:border-primary/20 transition-all"
                  >
                    <ArrowDownUp
                      size={20}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    />
                  </button>
                </div>

                {/* To Token */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-3 block">To</label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={toAmount}
                      onChange={(e) => handleToAmountChange(e.target.value)}
                      size="lg"
                      classNames={{
                        inputWrapper: "h-14 border-border rounded-lg bg-background hover:bg-accent transition-colors",
                        input: "text-lg font-semibold"
                      }}
                      endContent={
                        <span className="text-base font-medium text-foreground">
                          {fromToken === "vusdt" ? "InfiCoin" : "vUSDT"}
                        </span>
                      }
                    />
                  </div>
                </div>

                     {/* Transaction Summary */}
                {fromAmount && parseFloat(fromAmount) > 0 && (
                  <div className="p-4 rounded-xl border bg-orange-500/5 border-orange-500/20">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Method</span>
                        <span className="font-semibold text-foreground">
                          {fromToken === "vusdt" ? "withdraw()" : "redeem()"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rate</span>
                        <span className="font-semibold text-foreground">
                          1 InfiCoin = {sharePrice.toFixed(4)} vUSDT
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Withdrawal Fee</span>
                        <span className="font-semibold text-foreground">0.5%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <div className="flex gap-3 w-full">
              <Button
                variant="bordered"
                onPress={onClose}
                size="lg"
                className="flex-1 h-12 rounded-lg border-border hover:bg-accent font-medium transition-all"
              >
                Cancel
              </Button>
              <Button
                onPress={handleTransaction}
                isLoading={loading}
                isDisabled={
                  actionType === "deposit"
                    ? !amount || parseFloat(amount) <= 0
                    : !fromAmount || parseFloat(fromAmount) <= 0
                }
                size="lg"
                className={`flex-1 h-12 rounded-lg font-medium shadow-lg transition-all ${
                  actionType === "deposit"
                    ? "bg-primary text-primary-foreground shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
                    : "bg-orange-500 text-white shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30"
                }`}
              >
                {loading
                  ? "Processing..."
                  : actionType === "deposit"
                  ? "Confirm Deposit"
                  : fromToken === "vusdt"
                  ? "Confirm Withdrawal"
                  : "Confirm Redemption"}
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <ToastContainer position="bottom-right" autoClose={4000} hideProgressBar={false} theme="dark" />
    </div>
  );
}
