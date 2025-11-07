import { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Progress } from "@heroui/progress";
import {
    Shield,
    TrendingUp,
    Lock,
    Activity,
    BarChart3,
    Zap,
    Info,
    ExternalLink,
    CheckCircle2,
    RefreshCw,
} from "lucide-react";
import { useAccount } from "wagmi";
import { readContract } from "@wagmi/core";
import { formatUnits } from "viem";
import { config } from "@/config/wagmiConfig";

import YIELD_VAULT_ABI from "../abis/yieldVault.json";
import STRATEGY_MANAGER_ABI from "../abis/strategyManager.json";
import LENDING_STRATEGY_ABI from "../abis/lendingStrategy.json";
import LIQUIDITY_STRATEGY_ABI from "../abis/liquidityStrategy.json";
import STAKING_STRATEGY_ABI from "../abis/stakingStrategy.json";

const YIELD_VAULT_ADDRESS = import.meta.env.VITE_YIELD_VAULT_ADDRESS as `0x${string}`;
const STRATEGY_MANAGER_ADDRESS = import.meta.env.VITE_STRATEGY_MANAGER_ADDRESS as `0x${string}`;

// Strategy metadata (name, description, icon, etc.)
const strategyMetadata: { [key: string]: any } = {
    "LendingStrategy": {
        name: "Lending Strategy",
        description: "Conservative lending protocol with stable returns, similar to Aave",
        type: "Lending",
        risk: "Low",
        icon: Shield,
        protocol: "Aave-like Protocol",
        features: [
            "Conservative returns with minimal risk",
            "Low impermanent loss exposure",
            "Battle-tested lending protocols",
            "Automated yield compounding"
        ]
    },
    "LiquidityStrategy": {
        name: "Liquidity Strategy",
        description: "DEX liquidity provision for maximum yields across multiple pools",
        type: "Liquidity",
        risk: "High",
        icon: TrendingUp,
        protocol: "Uniswap-like DEX",
        features: [
            "Higher yield potential from trading fees",
            "Multi-pool diversification strategy",
            "Active liquidity management",
            "Dynamic rebalancing mechanisms"
        ]
    },
    "StakingStrategy": {
        name: "Staking Strategy",
        description: "Balanced staking approach with medium risk and steady returns",
        type: "Staking",
        risk: "Medium",
        icon: Lock,
        protocol: "Native Staking Pools",
        features: [
            "Balanced risk-reward profile",
            "Predictable staking returns",
            "No mandatory lock-up period",
            "Automatic reward harvesting"
        ]
    }
};

const riskColors = {
    Low: {
        text: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20"
    },
    Medium: {
        text: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20"
    },
    High: {
        text: "text-orange-600 dark:text-orange-400",
        bg: "bg-orange-500/10",
        border: "border-orange-500/20"
    }
};

interface StrategyData {
    id: number;
    address: string;
    name: string;
    description: string;
    type: string;
    baseAPY: number;
    allocation: number;
    risk: string;
    icon: any;
    protocol: string;
    tvl: string;
    balance: string;
    features: string[];
    active: boolean;
}

export default function Pools() {
    const { address } = useAccount();
    const [selectedStrategy, setSelectedStrategy] = useState<number | null>(null);
    const [strategiesData, setStrategiesData] = useState<StrategyData[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalTVL, setTotalTVL] = useState<string>("$0");
    const [weightedAPY, setWeightedAPY] = useState<number>(0);
    const [rebalanceInterval, setRebalanceInterval] = useState<string>("24h");

    const loadStrategiesData = async () => {
        try {
            setLoading(true);

            // Get strategy count
            const strategyCount = await readContract(config, {
                address: STRATEGY_MANAGER_ADDRESS,
                abi: STRATEGY_MANAGER_ABI,
                functionName: "getStrategyCount",
            }) as bigint;

            const count = Number(strategyCount);
            const strategies: StrategyData[] = [];
            let totalTVLValue = 0;
            let calculatedWeightedAPY = 0;

            // Load each strategy's data
            for (let i = 0; i < count; i++) {
                try {
                    // Get strategy info from manager
                    const strategyInfo = await readContract(config, {
                        address: STRATEGY_MANAGER_ADDRESS,
                        abi: STRATEGY_MANAGER_ABI,
                        functionName: "getStrategy",
                        args: [BigInt(i)],
                    }) as [string, bigint, boolean];

                    const [strategyAddress, allocationBps, active] = strategyInfo;

                    if (!active) continue;

                    // Determine which ABI to use based on strategy index or try all
                    const strategyABIs = [
                        LENDING_STRATEGY_ABI,
                        LIQUIDITY_STRATEGY_ABI,
                        STAKING_STRATEGY_ABI
                    ];

                    let balance: bigint = 0n;
                    let apyBps: bigint = 0n;
                    let strategyName: string = "";
                    let strategyABI = strategyABIs[i] || LENDING_STRATEGY_ABI;

                    // Try to read strategy data
                    try {
                        // Get strategy name
                        strategyName = await readContract(config, {
                            address: strategyAddress as `0x${string}`,
                            abi: strategyABI,
                            functionName: "name",
                        }) as string;

                        // Get strategy balance
                        balance = await readContract(config, {
                            address: strategyAddress as `0x${string}`,
                            abi: strategyABI,
                            functionName: "balanceOf",
                        }) as bigint;

                        // Get strategy APY
                        apyBps = await readContract(config, {
                            address: strategyAddress as `0x${string}`,
                            abi: strategyABI,
                            functionName: "estimatedAPY",
                        }) as bigint;
                    } catch (err) {
                        // If first ABI fails, try others
                        for (const abi of strategyABIs) {
                            try {
                                strategyName = await readContract(config, {
                                    address: strategyAddress as `0x${string}`,
                                    abi: abi,
                                    functionName: "name",
                                }) as string;

                                balance = await readContract(config, {
                                    address: strategyAddress as `0x${string}`,
                                    abi: abi,
                                    functionName: "balanceOf",
                                }) as bigint;

                                apyBps = await readContract(config, {
                                    address: strategyAddress as `0x${string}`,
                                    abi: abi,
                                    functionName: "estimatedAPY",
                                }) as bigint;

                                strategyABI = abi;
                                break;
                            } catch {
                                continue;
                            }
                        }
                    }

                    const balanceFormatted = parseFloat(formatUnits(balance, 18));
                    const allocationPercent = Number(allocationBps) / 100; // Convert basis points to percentage
                    const apyPercent = Number(apyBps) / 100; // Convert basis points to percentage

                    // Match with metadata based on strategy name
                    let metadata = strategyMetadata["LendingStrategy"]; // Default
                    
                    if (strategyName.includes("Lending") || strategyName.includes("lsVault")) {
                        metadata = strategyMetadata["LendingStrategy"];
                    } else if (strategyName.includes("Liquidity") || strategyName.includes("lpVault")) {
                        metadata = strategyMetadata["LiquidityStrategy"];
                    } else if (strategyName.includes("Staking") || strategyName.includes("stVault")) {
                        metadata = strategyMetadata["StakingStrategy"];
                    }

                    const tvlValue = balanceFormatted;
                    totalTVLValue += tvlValue;

                    // Calculate weighted APY contribution
                    calculatedWeightedAPY += (apyPercent * allocationPercent) / 100;

                    strategies.push({
                        id: i + 1,
                        address: strategyAddress,
                        name: metadata.name,
                        description: metadata.description,
                        type: metadata.type,
                        baseAPY: apyPercent,
                        allocation: allocationPercent,
                        risk: metadata.risk,
                        icon: metadata.icon,
                        protocol: metadata.protocol,
                        tvl: `${(tvlValue / 1000).toFixed(0)}K`,
                        balance: balanceFormatted.toFixed(2),
                        features: metadata.features,
                        active: active,
                    });
                } catch (err) {
                    console.error(`Error loading strategy ${i}:`, err);
                }
            }

            setStrategiesData(strategies);
            setTotalTVL(`${(totalTVLValue / 1000000).toFixed(1)}M`);
            setWeightedAPY(calculatedWeightedAPY);

            // Get rebalance interval
            try {
                const interval = await readContract(config, {
                    address: YIELD_VAULT_ADDRESS,
                    abi: YIELD_VAULT_ABI,
                    functionName: "rebalanceInterval",
                }) as bigint;

                const hours = Number(interval) / 3600;
                setRebalanceInterval(hours >= 24 ? `${hours / 24}d` : `${hours}h`);
            } catch (err) {
                console.error("Error loading rebalance interval:", err);
            }

        } catch (err) {
            console.error("Error loading strategies:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStrategiesData();
    }, [address]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-4">
                    <RefreshCw className="w-12 h-12 text-primary animate-spin mx-auto" />
                    <p className="text-lg text-muted-foreground">Loading strategies...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
                                <Activity className="w-3.5 h-3.5 text-primary animate-pulse" />
                                <span className="text-xs font-medium text-primary">Multi-Strategy Portfolio</span>
                            </div>
                            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent mb-3">
                                Strategy Pools
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                Diversified allocation across three battle-tested DeFi strategies for optimal risk-adjusted returns
                            </p>
                        </div>
                        <Button
                            size="lg"
                            variant="bordered"
                            onPress={loadStrategiesData}
                            className="h-12 px-6 rounded-lg border-border hover:bg-accent transition-all"
                            isIconOnly
                        >
                            <RefreshCw size={20} />
                        </Button>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="p-6 rounded-2xl bg-card border border-border">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                                <BarChart3 size={16} className="text-primary" />
                            </div>
                            <span className="text-sm font-medium text-muted-foreground">Total TVL</span>
                        </div>
                        <p className="text-3xl font-bold text-foreground">{totalTVL}</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-card border border-border">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                                <TrendingUp size={16} className="text-primary" />
                            </div>
                            <span className="text-sm font-medium text-muted-foreground">Weighted APY</span>
                        </div>
                        <p className="text-3xl font-bold text-primary">{weightedAPY.toFixed(1)}%</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-card border border-border">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                                <Zap size={16} className="text-primary" />
                            </div>
                            <span className="text-sm font-medium text-muted-foreground">Active Strategies</span>
                        </div>
                        <p className="text-3xl font-bold text-foreground">{strategiesData.length}</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-card border border-border">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                                <Activity size={16} className="text-primary" />
                            </div>
                            <span className="text-sm font-medium text-muted-foreground">Rebalance</span>
                        </div>
                        <p className="text-lg font-bold text-foreground">Every {rebalanceInterval}</p>
                    </div>
                </div>

                {/* Strategy Cards */}
                <div className="space-y-12">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight mb-8">Active Strategies</h2>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {strategiesData.map((strategy) => {
                                const Icon = strategy.icon;
                                const riskStyle = riskColors[strategy.risk as 'Low' | 'Medium' | 'High'];

                                return (
                                    <div
                                        key={strategy.id}
                                        className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all cursor-pointer"
                                        onClick={() => setSelectedStrategy(strategy.id === selectedStrategy ? null : strategy.id)}
                                    >
                                        <div className="space-y-6">
                                            {/* Header */}
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                                                        <Icon className="w-5 h-5 text-primary" />
                                                    </div>
                                                </div>
                                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${riskStyle.bg} ${riskStyle.border} ${riskStyle.text}`}>
                                                    {strategy.risk} Risk
                                                </span>
                                            </div>

                                            {/* Title & Description */}
                                            <div>
                                                <h3 className="text-xl font-bold text-foreground mb-2">{strategy.name}</h3>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    {strategy.description}
                                                </p>
                                            </div>

                                            {/* Stats */}
                                            <div className="space-y-3 pt-2">
                                                <div className="flex justify-between items-baseline">
                                                    <span className="text-sm text-muted-foreground">Current APY</span>
                                                    <span className="text-2xl font-bold text-primary">{strategy.baseAPY.toFixed(1)}%</span>
                                                </div>

                                                <div className="flex justify-between items-baseline">
                                                    <span className="text-sm text-muted-foreground">Allocation</span>
                                                    <span className="text-xl font-bold text-foreground">{strategy.allocation.toFixed(0)}%</span>
                                                </div>

                                                <div className="flex justify-between items-baseline">
                                                    <span className="text-sm text-muted-foreground">Balance</span>
                                                    <span className="text-lg font-bold text-foreground">{strategy.balance} vUSDT</span>
                                                </div>

                                                {/* Progress Bar */}
                                                <div className="pt-2">
                                                    <Progress
                                                        value={strategy.allocation}
                                                        className="h-2"
                                                        classNames={{
                                                            indicator: "bg-primary"
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Expanded Details */}
                                            {selectedStrategy === strategy.id && (
                                                <div className="pt-4 border-t border-border space-y-4">
                                                    <div>
                                                        <p className="text-sm font-semibold text-foreground mb-2">Protocol Type</p>
                                                        <p className="text-sm text-muted-foreground">{strategy.protocol}</p>
                                                    </div>

                                                    <div>
                                                        <p className="text-sm font-semibold text-foreground mb-2">Contract Address</p>
                                                        <p className="text-xs font-mono text-muted-foreground break-all">
                                                            {strategy.address}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className="text-sm font-semibold text-foreground mb-3">Key Features</p>
                                                        <div className="space-y-2">
                                                            {strategy.features.map((feature, index) => (
                                                                <div key={index} className="flex items-start gap-2">
                                                                    <CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" />
                                                                    <span className="text-sm text-muted-foreground">{feature}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <Button
                                                        size="sm"
                                                        variant="bordered"
                                                        className="w-full mt-2 border-border hover:bg-accent transition-all"
                                                        onPress={() => window.open(`https://etherscan.io/address/${strategy.address}`, '_blank')}
                                                    >
                                                        View on Explorer
                                                        <ExternalLink size={14} className="ml-2" />
                                                    </Button>
                                                </div>
                                            )}

                                            {/* View More Button */}
                                            {selectedStrategy !== strategy.id && (
                                                <Button
                                                    size="sm"
                                                    variant="light"
                                                    className="w-full text-primary hover:bg-primary/5"
                                                >
                                                    View Details
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* How It Works Section */}
                    <div className="space-y-8">
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl font-bold tracking-tight">How Strategy Allocation Works</h2>
                            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                                Automated allocation and rebalancing for optimized yield generation
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[
                                {
                                    step: "01",
                                    title: "Auto-Allocation",
                                    description: "Deposits automatically distributed across strategies based on allocation percentages"
                                },
                                {
                                    step: "02",
                                    title: "Yield Harvesting",
                                    description: "Rewards harvested from all strategies and compounded for maximum returns"
                                },
                                {
                                    step: "03",
                                    title: "Rebalancing",
                                    description: `Portfolio rebalanced every ${rebalanceInterval} to maintain target allocations`
                                },
                                {
                                    step: "04",
                                    title: "Fee Collection",
                                    description: "Performance fees (10%) and withdrawal fees (0.5%) collected automatically"
                                }
                            ].map((item, index) => (
                                <div
                                    key={item.step}
                                    className="relative p-6 rounded-2xl bg-card border border-border"
                                >
                                    <div className="text-4xl font-bold text-primary/20 mb-3">{item.step}</div>
                                    <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-primary/5 border border-primary/20">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                                    <Info size={24} className="text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-foreground mb-3">Smart Rebalancing</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                        The vault automatically rebalances every {rebalanceInterval} to maintain optimal strategy allocations. This ensures your funds are always positioned for maximum risk-adjusted returns.
                                    </p>
                                    <div className="flex items-center gap-2 text-sm text-primary font-medium">
                                        <Activity size={16} />
                                        <span>Automated every {rebalanceInterval}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-primary/5 border border-primary/20">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                                    <Shield size={24} className="text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-foreground mb-3">Risk Management</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                        Diversification across low, medium, and high-risk strategies helps balance potential returns while minimizing overall portfolio risk exposure.
                                    </p>
                                    <div className="flex items-center gap-2 text-sm text-primary font-medium">
                                        <CheckCircle2 size={16} />
                                        <span>Audited & battle-tested</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Technical Specifications */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight">Technical Specifications</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { label: "Rebalance Interval", value: `Every ${rebalanceInterval}` },
                                { label: "Performance Fee", value: "10% (1000 basis points)" },
                                { label: "Withdrawal Fee", value: "0.5% (50 basis points)" },
                                { label: "Total Allocation", value: "100% (10000 basis points)" },
                                { label: "Underlying Asset", value: "vUSDT (Vault USDT)" },
                                { label: "Vault Token", value: "yvETH (Yield Vault ETH)" }
                            ].map((spec, index) => (
                                <div
                                    key={index}
                                    className="p-6 rounded-2xl bg-card border border-border"
                                >
                                    <p className="text-sm text-muted-foreground mb-2 font-medium">{spec.label}</p>
                                    <p className="font-mono text-base font-semibold text-foreground">{spec.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}