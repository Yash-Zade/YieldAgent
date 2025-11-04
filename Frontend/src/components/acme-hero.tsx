"use client";

import { Wallet, TrendingUp, Shield, Zap, Lock, Activity, BarChart3, Code2, FileCheck, Layers, ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export function AcmeHero() {
  const strategies = [
    {
      name: "Lending Strategy",
      apy: "4%",
      allocation: "40%",
      risk: "Low",
      icon: Shield,
      description: "Aave-like lending protocol with conservative returns"
    },
    {
      name: "Liquidity Strategy",
      apy: "12%",
      allocation: "30%",
      risk: "High",
      icon: TrendingUp,
      description: "DEX liquidity provision for maximum yields"
    },
    {
      name: "Staking Strategy",
      apy: "7%",
      allocation: "30%",
      risk: "Medium",
      icon: Lock,
      description: "Balanced staking approach with steady returns"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "ERC4626 Compliant",
      description: "Industry-standard tokenized vault implementation with full compatibility"
    },
    {
      icon: Zap,
      title: "Automated Operations",
      description: "Smart rebalancing every 24h with yield harvesting and compounding"
    },
    {
      icon: Activity,
      title: "Multi-Strategy Allocation",
      description: "Diversified portfolio across lending, liquidity, and staking protocols"
    },
    {
      icon: Code2,
      title: "Built with Foundry",
      description: "Fast, portable and modular toolkit for Ethereum development"
    },
    {
      icon: FileCheck,
      title: "Audited Contracts",
      description: "Security-first approach with comprehensive testing coverage"
    },
    {
      icon: Layers,
      title: "Composable Architecture",
      description: "Modular design allowing easy strategy additions and upgrades"
    }
  ];
  
  const contractInfo = [
    { label: "Vault Token", value: "yvETH (Yield Vault ETH)" },
    { label: "Underlying Asset", value: "vETH (Vault ETH)" },
    { label: "Solidity Version", value: "0.8.20" },
    { label: "Framework", value: "Foundry + OpenZeppelin" }
  ];

  return (
    <div className="min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="pt-20 pb-16 md:pt-20 md:pb-24">
          <motion.div
            className="flex flex-col items-center space-y-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Activity className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span className="text-xs font-medium text-primary">ERC4626 Tokenized Vault</span>
            </motion.div>

            <motion.h1
              className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent pb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Yield Aggregator V1
            </motion.h1>

            <motion.p
              className="mx-auto max-w-3xl text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Institutional-grade yield optimization protocol deploying{" "}
              <span className="font-semibold text-foreground">vETH across multiple DeFi strategies</span>{" "}
              for{" "}
              <span className="font-semibold text-foreground">maximized returns</span>
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button size="lg" className="h-12 px-8 rounded-lg text-base font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                Launch Application
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 rounded-lg text-base font-medium border-border hover:bg-accent transition-all">
                <BarChart3 className="mr-2 w-4 h-4" />
                Documentation
              </Button>
            </motion.div>

            <motion.div
              className="flex flex-col items-center space-y-4 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="flex items-center gap-6 text-sm font-medium">
                <span className="text-primary">ERC4626 Standard</span>
                <span className="text-muted-foreground/30">•</span>
                <span className="text-primary">Auto-Rebalancing</span>
                <span className="text-muted-foreground/30">•</span>
                <span className="text-primary">Multi-Strategy</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Built with Foundry • OpenZeppelin • Solidity 0.8.20
              </p>
            </motion.div>

          </motion.div>
        </section>

        {/* Strategies Section */}
        <section className="py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="space-y-12"
          >
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Diversified Strategy Portfolio
              </h2>
              <p className="text-lg text-muted-foreground">
                Automated allocation across three battle-tested DeFi strategies for optimal risk-adjusted returns
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {strategies.map((strategy, index) => {
                const Icon = strategy.icon;
                const riskColors = {
                  Low: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
                  Medium: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
                  High: "text-orange-600 dark:text-orange-400 bg-orange-500/10 border-orange-500/20"
                };

                return (
                  <motion.div
                    key={strategy.name}
                    className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  >
                    <div className="space-y-5">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                        </div>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${riskColors[strategy.risk as 'Low' | 'Medium' | 'High']}`}>
                          {strategy.risk} Risk
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{strategy.name}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {strategy.description}
                        </p>
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-baseline">
                          <span className="text-sm text-muted-foreground">Base APY</span>
                          <span className="text-2xl font-bold text-primary">{strategy.apy}</span>
                        </div>

                        <div className="flex justify-between items-baseline">
                          <span className="text-sm text-muted-foreground">Allocation</span>
                          <span className="text-xl font-bold text-foreground">{strategy.allocation}</span>
                        </div>

                        <div className="pt-1">
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: strategy.allocation }}
                              transition={{ delay: 1.0 + index * 0.1, duration: 0.8 }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="space-y-12"
          >
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Enterprise-Grade Features
              </h2>
              <p className="text-lg text-muted-foreground">
                Built with security, efficiency, and composability at the core
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    className="flex flex-col p-8 rounded-2xl bg-card border border-border hover:border-primary/40 hover:bg-accent/50 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
                  >
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 w-fit mb-5">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            className="space-y-12"
          >
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground">
                Simple deposit, automated optimization, seamless withdrawals
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Deposit vETH", description: "Transfer your vETH tokens to the vault contract" },
                { step: "02", title: "Receive yvETH", description: "Get yvETH shares representing your vault position" },
                { step: "03", title: "Auto-Optimize", description: "Vault automatically rebalances and harvests yields" },
                { step: "04", title: "Withdraw Anytime", description: "Redeem yvETH for vETH + earned yields" }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  className="relative p-8 rounded-2xl bg-card border border-border"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7 + index * 0.1, duration: 0.5 }}
                >
                  <div className="text-5xl font-bold text-primary/20 mb-4">{item.step}</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <div className="w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center">
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Contract Information Section */}
        <section className="py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.5 }}
            className="space-y-12"
          >
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Technical Specifications
              </h2>
              <p className="text-lg text-muted-foreground">
                Transparent, auditable, and battle-tested smart contract architecture
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {contractInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  className="p-8 rounded-2xl bg-card border border-border"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.1 + index * 0.1, duration: 0.5 }}
                >
                  <div className="text-sm text-muted-foreground mb-2 font-medium">{info.label}</div>
                  <div className="font-mono text-base font-semibold text-foreground">{info.value}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.5 }}
            >
              <Button size="lg" variant="outline" className="h-12 px-6 rounded-lg border-border hover:bg-accent transition-all">
                <Code2 className="mr-2 w-4 h-4" />
                View on GitHub
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-6 rounded-lg border-border hover:bg-accent transition-all">
                <FileCheck className="mr-2 w-4 h-4" />
                Read Audit Report
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="py-20 pb-32 md:py-28 md:pb-40">
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/5 via-transparent to-primary/5 p-12 md:p-20 text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.8 }}
          >
            <div className="relative z-10 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium text-primary">Ready to Deploy</span>
              </div>

              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                Start Optimizing Your Yields
              </h2>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Connect your wallet and deposit vETH to begin earning automated, risk-adjusted yields across multiple DeFi protocols
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <Button size="lg" className="h-12 px-8 rounded-lg text-base font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                  <Wallet className="mr-2 w-5 h-5" />
                  Connect Wallet
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 rounded-lg text-base font-medium border-border hover:bg-accent transition-all">
                  Learn More
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </section>
      </div>
    </div>
  );
}