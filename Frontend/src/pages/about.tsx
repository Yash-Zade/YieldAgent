import React from 'react';
import { Activity, Target, Lightbulb, Users, Shield, Zap, TrendingUp, Lock, Code2, Award, Github, Twitter, Linkedin, Mail, ExternalLink, Heart, Rocket, Globe, CheckCircle2, ArrowRight, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';

export default function AboutPage() {
  const mission = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To democratize access to institutional-grade DeFi yield optimization through secure, transparent, and efficient protocols that maximize returns while managing risk."
    },
    {
      icon: Lightbulb,
      title: "Our Vision",
      description: "Building the future of decentralized finance where sophisticated yield strategies are accessible to everyone, powered by cutting-edge blockchain technology."
    },
    {
      icon: Shield,
      title: "Our Values",
      description: "Security-first development, radical transparency, community-driven governance, and unwavering commitment to user asset protection."
    }
  ];

  const timeline = [
    {
      quarter: "Q1 2024",
      title: "Foundation",
      items: ["Protocol design & architecture", "Smart contract development", "Security audits initiated"]
    },
    {
      quarter: "Q2 2024",
      title: "Launch",
      items: ["Testnet deployment", "Community testing phase", "Mainnet launch"]
    },
    {
      quarter: "Q3 2024",
      title: "Expansion",
      items: ["Additional strategy integrations", "Cross-chain deployment", "DAO governance launch"]
    },
    {
      quarter: "Q4 2024",
      title: "Innovation",
      items: ["Advanced analytics dashboard", "Mobile app release", "Institutional partnerships"]
    }
  ];

  const team = [
    {
      name: "Alex Chen",
      role: "Founder & Lead Developer",
      bio: "Former DeFi protocol architect with 5+ years in smart contract development. Built multiple audited protocols managing $100M+ TVL.",
      avatar: "AC",
      socials: { twitter: "#", linkedin: "#", github: "#" }
    },
    {
      name: "Sarah Martinez",
      role: "Head of Security",
      bio: "Ex-cybersecurity researcher specializing in blockchain security. Led audit teams for top DeFi protocols.",
      avatar: "SM",
      socials: { twitter: "#", linkedin: "#" }
    },
    {
      name: "David Kim",
      role: "Smart Contract Engineer",
      bio: "Solidity expert with background in formal verification. Contributed to OpenZeppelin and major DeFi projects.",
      avatar: "DK",
      socials: { twitter: "#", github: "#" }
    },
    {
      name: "Emma Thompson",
      role: "Product Manager",
      bio: "Previously led product at major DeFi protocols. Passionate about creating intuitive user experiences in Web3.",
      avatar: "ET",
      socials: { twitter: "#", linkedin: "#" }
    }
  ];

  const stats = [
    { label: "Total Value Locked", value: "$12.5M", icon: TrendingUp },
    { label: "Active Users", value: "2,400+", icon: Users },
    { label: "Average APY", value: "7.8%", icon: Zap },
    { label: "Security Score", value: "98/100", icon: Shield }
  ];

  const principles = [
    {
      icon: Shield,
      title: "Security First",
      description: "Every line of code is rigorously tested and audited. We prioritize the safety of user funds above all else."
    },
    {
      icon: Globe,
      title: "Transparency",
      description: "Open-source contracts, public audits, and real-time on-chain data. No hidden fees, no surprises."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by the community, for the community. Your voice shapes the future of the protocol."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Leveraging cutting-edge DeFi strategies and blockchain technology to maximize yields efficiently."
    },
    {
      icon: Lock,
      title: "Risk Management",
      description: "Diversified strategies, automated rebalancing, and conservative allocation to protect your capital."
    },
    {
      icon: Rocket,
      title: "Continuous Improvement",
      description: "Regular upgrades, new features, and strategy optimizations based on market conditions and user feedback."
    }
  ];

  const partners = [
    { name: "Chainlink", type: "Oracle Provider" },
    { name: "OpenZeppelin", type: "Security Framework" },
    { name: "Aave", type: "Lending Protocol" },
    { name: "Uniswap", type: "DEX Integration" },
    { name: "Foundry", type: "Development Tools" },
    { name: "[Audit Firm]", type: "Security Auditor" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="/" className="flex items-center gap-2 font-bold text-lg">
              <Activity className="w-6 h-6 text-primary" />
              <span>Yield Aggregator V1</span>
            </a>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-all">Home</a>
              <a href="/docs" className="text-sm text-muted-foreground hover:text-primary transition-all">Documentation</a>
              <a href="/about" className="text-sm text-primary font-medium">About</a>
              <Button size="sm" className="ml-2">Launch App</Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="pt-20 pb-16 md:pt-28 md:pb-24">
          <motion.div 
            className="text-center space-y-8 max-w-4xl mx-auto"
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
              <Heart className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">Built for the Community</span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent pb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Empowering DeFi Through Innovation
            </motion.h1>
            
            <motion.p 
              className="mx-auto max-w-3xl text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              We're building the next generation of yield optimization protocols—secure, transparent, and accessible to everyone in the decentralized finance ecosystem.
            </motion.p>

            <motion.div
              className="flex flex-col items-center space-y-4 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="flex items-center gap-6 text-sm font-medium">
                <span className="text-primary">ERC4626 Standard</span>
                <span className="text-muted-foreground/30">•</span>
                <span className="text-primary">Security Audited</span>
                <span className="text-muted-foreground/30">•</span>
                <span className="text-primary">Open Source</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-12 md:py-20">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div 
                  key={i} 
                  className="p-8 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <Icon className="w-8 h-8 text-primary mx-auto mb-4" />
                  <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-20 md:py-28">
          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {mission.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={i} 
                  className="p-8 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 w-fit mb-5">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Core Principles */}
        <section className="py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="space-y-12"
          >
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Our Core Principles</h2>
              <p className="text-lg text-muted-foreground">
                The fundamental values that guide every decision we make
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {principles.map((principle, i) => {
                const Icon = principle.icon;
                return (
                  <motion.div 
                    key={i} 
                    className="p-8 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  >
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 w-fit mb-5">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{principle.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{principle.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* Timeline */}
        <section className="py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="space-y-12"
          >
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Our Journey</h2>
              <p className="text-lg text-muted-foreground">
                From concept to mainnet and beyond
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {timeline.map((phase, i) => (
                <motion.div 
                  key={i} 
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + i * 0.1, duration: 0.5 }}
                >
                  <div className="p-8 rounded-2xl bg-card border border-border h-full hover:border-primary/40 transition-all">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
                      <span className="text-xs font-bold text-primary">{phase.quarter}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4">{phase.title}</h3>
                    <ul className="space-y-3">
                      {phase.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
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

        {/* Team Section */}
        <section className="py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.5 }}
            className="space-y-12"
          >
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Meet the Team</h2>
              <p className="text-lg text-muted-foreground">
                Experienced builders passionate about DeFi innovation
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <motion.div 
                  key={i} 
                  className="p-8 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 + i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-5">
                    {member.avatar}
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mb-4">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{member.bio}</p>
                  <div className="flex items-center justify-center gap-2">
                    {member.socials.twitter && (
                      <a href={member.socials.twitter} className="p-2.5 rounded-lg bg-muted hover:bg-primary/10 border border-border hover:border-primary/20 transition-all">
                        <Twitter className="w-4 h-4 text-muted-foreground hover:text-primary transition-all" />
                      </a>
                    )}
                    {member.socials.linkedin && (
                      <a href={member.socials.linkedin} className="p-2.5 rounded-lg bg-muted hover:bg-primary/10 border border-border hover:border-primary/20 transition-all">
                        <Linkedin className="w-4 h-4 text-muted-foreground hover:text-primary transition-all" />
                      </a>
                    )}
                    {member.socials.github && (
                      <a href={member.socials.github} className="p-2.5 rounded-lg bg-muted hover:bg-primary/10 border border-border hover:border-primary/20 transition-all">
                        <Github className="w-4 h-4 text-muted-foreground hover:text-primary transition-all" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Partners Section */}
        <section className="py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.5 }}
            className="space-y-12"
          >
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Trusted Partners</h2>
              <p className="text-lg text-muted-foreground">
                Collaborating with industry leaders to deliver excellence
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {partners.map((partner, i) => (
                <motion.div 
                  key={i} 
                  className="p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.0 + i * 0.05, duration: 0.5 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-sm text-foreground mb-1">{partner.name}</h4>
                  <p className="text-xs text-muted-foreground">{partner.type}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Technology Stack */}
        <section className="py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.5 }}
            className="space-y-12"
          >
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Built with Best-in-Class Tech</h2>
              <p className="text-lg text-muted-foreground">
                Leveraging proven tools and frameworks for maximum security and efficiency
              </p>
            </div>

            <div className="p-8 md:p-12 rounded-3xl border border-border bg-gradient-to-br from-primary/5 via-transparent to-primary/5">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { category: "Smart Contracts", items: ["Solidity 0.8.20", "OpenZeppelin", "ERC4626"] },
                  { category: "Development", items: ["Foundry", "Hardhat", "TypeScript"] },
                  { category: "Infrastructure", items: ["Chainlink", "The Graph", "IPFS"] },
                  { category: "Security", items: ["Slither", "Mythril", "Certora"] }
                ].map((tech, i) => (
                  <div key={i}>
                    <h3 className="font-bold mb-5 text-primary text-lg">{tech.category}</h3>
                    <ul className="space-y-3">
                      {tech.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <Code2 className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Community CTA Section */}
        <section className="py-20 pb-32 md:py-28 md:pb-40">
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/5 via-transparent to-primary/5 p-12 md:p-20 text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            <div className="relative z-10 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <Users className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium text-primary">Join Our Community</span>
              </div>

              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                Be Part of the Future
              </h2>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Connect with thousands of DeFi enthusiasts, developers, and yield farmers. Share strategies, get support, and help shape the future of Yield Aggregator V1.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <Button size="lg" className="h-12 px-8 rounded-lg text-base font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                  <Twitter className="mr-2 w-5 h-5" />
                  Follow on Twitter
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 rounded-lg text-base font-medium border-border hover:bg-accent transition-all">
                  <Github className="mr-2 w-5 h-5" />
                  Star on GitHub
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center justify-center gap-6 pt-6 text-sm font-medium">
                <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-all">
                  <Mail className="w-4 h-4" />
                  <span>Newsletter</span>
                </a>
                <span className="text-muted-foreground/30">•</span>
                <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-all">
                  <BarChart3 className="w-4 h-4" />
                  <span>Blog</span>
                </a>
                <span className="text-muted-foreground/30">•</span>
                <a href="#" className="text-muted-foreground hover:text-primary transition-all">
                  Discord
                </a>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              <span className="font-bold">Yield Aggregator V1</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Yield Aggregator V1. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-all">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-all">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-all">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}