import { Button } from "@heroui/button";
import DefaultLayout from "@/layouts/default";
import { useState, useEffect } from "react";

export default function IndexPage() {
  const [currentAPY, setCurrentAPY] = useState(7.8);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    const interval = setInterval(() => {
      setCurrentAPY(prev => prev + (Math.random() - 0.5) * 0.1);
    }, 3000);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  const strategies = [
    { name: "Lending", apy: 4.0, alloc: 40, risk: "Conservative", color: "bg-cyan-500" },
    { name: "Liquidity", apy: 12.0, alloc: 30, risk: "Aggressive", color: "bg-purple-500" },
    { name: "Staking", apy: 7.0, alloc: 30, risk: "Moderate", color: "bg-orange-500" }
  ];

  return (
    <DefaultLayout>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .glass-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glass-hover:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-4px);
        }

        .grid-pattern {
          background-image: 
            linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .spotlight {
          position: fixed;
          inset: 0;
          background: radial-gradient(600px circle at var(--x) var(--y), rgba(139, 92, 246, 0.1), transparent 40%);
          pointer-events: none;
          z-index: 0;
        }

        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .float {
          animation: float 4s ease-in-out infinite;
        }

        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.2s; opacity: 0; }
        .delay-3 { animation-delay: 0.3s; opacity: 0; }
        .delay-4 { animation-delay: 0.4s; opacity: 0; }

        .gradient-text {
          background: linear-gradient(135deg, #ffffff 0%, #a78bfa 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .stat-card {
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.5s;
        }

        .stat-card:hover::before {
          left: 100%;
        }
      `}</style>

      {/* Spotlight Effect */}
      <div 
        className="spotlight"
        style={{
          '--x': `${mousePosition.x}px`,
          '--y': `${mousePosition.y}px`
        } as React.CSSProperties}
      />

      {/* Background */}
      <div className="fixed inset-0 -z-20 bg-black" />
      <div className="fixed inset-0 -z-10 grid-pattern" />
      
      {/* Ambient Glow */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px]" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px]" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 py-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm text-white/70">Live on Mainnet</span>
              </div>

              <h1 className="fade-in-up delay-1 text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block text-white mb-2">Automated</span>
                <span className="block gradient-text">Yield Optimization</span>
              </h1>

              <p className="fade-in-up delay-2 text-xl text-white/60 leading-relaxed max-w-xl">
                Institutional-grade DeFi infrastructure that maximizes returns across multiple strategies. Non-custodial, audited, and built for scale.
              </p>

              <div className="fade-in-up delay-3 flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-white/90 font-semibold px-8 h-12 transition-all hover:scale-105"
                >
                  Launch App
                </Button>
                <Button
                  size="lg"
                  className="glass text-white hover:bg-white/10 font-medium px-8 h-12"
                >
                  Documentation
                </Button>
              </div>

              {/* Stats */}
              <div className="fade-in-up delay-4 grid grid-cols-3 gap-4 pt-6">
                <div className="glass rounded-xl p-5 stat-card">
                  <div className="text-3xl font-bold text-white mb-1">
                    {currentAPY.toFixed(2)}%
                  </div>
                  <div className="text-sm text-white/50">Current APY</div>
                </div>

                <div className="glass rounded-xl p-5 stat-card">
                  <div className="text-3xl font-bold text-white mb-1">$2.4M</div>
                  <div className="text-sm text-white/50">TVL</div>
                </div>

                <div className="glass rounded-xl p-5 stat-card">
                  <div className="text-3xl font-bold text-white mb-1">1,247</div>
                  <div className="text-sm text-white/50">Users</div>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative hidden lg:block">
              <div className="relative w-full h-[500px]">
                {/* Floating Strategy Cards */}
                {strategies.map((strategy, i) => (
                  <div
                    key={i}
                    className="absolute glass rounded-2xl p-6 float"
                    style={{
                      top: `${i * 150}px`,
                      right: i % 2 === 0 ? '0' : '80px',
                      width: '300px',
                      animationDelay: `${i * 0.5}s`
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 ${strategy.color} rounded-xl flex items-center justify-center text-white font-bold text-xl`}>
                        {strategy.name[0]}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-semibold">{strategy.name}</div>
                        <div className="text-white/50 text-sm">{strategy.risk}</div>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-white">{strategy.apy}</span>
                      <span className="text-lg text-white/40">% APY</span>
                    </div>
                  </div>
                ))}

                {/* Center Accent */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-violet-500/30 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Process Flow */}
      <section className="relative px-6 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Simple, Powerful,<br />
              <span className="gradient-text">Fully Automated</span>
            </h2>
            <p className="text-xl text-white/60">
              Start earning in three simple steps
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Deposit vETH",
                desc: "Connect your wallet and deposit any amount of vETH. No minimum, no lock-up periods.",
                color: "from-cyan-500 to-blue-500"
              },
              {
                step: "02",
                title: "Auto-Deploy",
                desc: "Our algorithm instantly allocates your funds across lending, staking, and liquidity strategies.",
                color: "from-purple-500 to-pink-500"
              },
              {
                step: "03",
                title: "Earn & Compound",
                desc: "Watch your yields compound automatically. Withdraw anytime with zero penalties.",
                color: "from-orange-500 to-red-500"
              }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="glass glass-hover rounded-3xl p-10 h-full">
                  <div className={`inline-block text-8xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-6 opacity-20`}>
                    {item.step}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-lg text-white/60 leading-relaxed">{item.desc}</p>
                </div>
                
                {/* Arrow connector */}
                {i < 2 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white/20">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="relative px-6 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Visual */}
            <div className="relative">
              <div className="glass rounded-3xl p-10 space-y-8">
                <div>
                  <div className="text-white/50 text-sm mb-2">Live Performance</div>
                  <div className="text-6xl font-bold text-white mb-4">
                    {currentAPY.toFixed(2)}%
                  </div>
                  <div className="text-white/60">Current weighted APY across all strategies</div>
                </div>

                <div className="space-y-4">
                  {strategies.map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-4 glass rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${s.color}`} />
                        <span className="text-white font-medium">{s.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">{s.apy}%</div>
                        <div className="text-white/50 text-xs">{s.alloc}% allocated</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Optimized for Maximum Returns
                </h2>
                <p className="text-xl text-white/60 leading-relaxed">
                  Our intelligent rebalancing algorithm continuously monitors market conditions and adjusts your portfolio allocation to maximize yields while managing risk.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="glass rounded-xl p-6">
                  <div className="text-3xl font-bold text-white mb-2">24/7</div>
                  <div className="text-white/60 text-sm">Active Monitoring</div>
                </div>
                <div className="glass rounded-xl p-6">
                  <div className="text-3xl font-bold text-white mb-2">&lt;0.1%</div>
                  <div className="text-white/60 text-sm">Protocol Fee</div>
                </div>
                <div className="glass rounded-xl p-6">
                  <div className="text-3xl font-bold text-white mb-2">$2.4M</div>
                  <div className="text-white/60 text-sm">Total Deposits</div>
                </div>
                <div className="glass rounded-xl p-6">
                  <div className="text-3xl font-bold text-white mb-2">1,247</div>
                  <div className="text-white/60 text-sm">Active Users</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Trust */}
      <section className="relative px-6 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Built on Trust
            </h2>
            <p className="text-xl text-white/60">
              Security and transparency are non-negotiable
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Audited Smart Contracts",
                desc: "Comprehensive security audits by CertiK with ongoing bug bounty programs",
                metric: "100%",
                label: "Code Coverage"
              },
              {
                title: "Non-Custodial Protocol",
                desc: "You maintain full control of your assets at all times through your wallet",
                metric: "0",
                label: "Admin Keys"
              },
              {
                title: "Proven Track Record",
                desc: "Millions secured with zero security incidents since launch",
                metric: "99.9%",
                label: "Uptime"
              }
            ].map((item, i) => (
              <div key={i} className="glass glass-hover rounded-2xl p-8">
                <div className="text-5xl font-bold text-white mb-2">{item.metric}</div>
                <div className="text-white/50 text-sm mb-6">{item.label}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative px-6 py-32">
        <div className="max-w-5xl mx-auto">
          <div className="relative glass rounded-3xl overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10" />
            
            <div className="relative p-12 lg:p-20 text-center">
              <h2 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Start Earning Today
              </h2>
              <p className="text-2xl text-white/60 mb-12 max-w-3xl mx-auto">
                Join thousands earning institutional-grade yields
              </p>

              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 font-bold px-16 h-16 text-lg transition-all hover:scale-105"
              >
                Connect Wallet
              </Button>

              <div className="flex items-center justify-center gap-8 mt-12 text-white/50 text-sm">
                <div className="flex items-center gap-2">
                  <CheckIcon />
                  <span>No minimum deposit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon />
                  <span>Withdraw anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon />
                  <span>Zero lock-up</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);