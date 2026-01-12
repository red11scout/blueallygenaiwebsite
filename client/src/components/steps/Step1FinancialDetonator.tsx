/*
 * Step 1: The Four-Driver Financial Detonator
 * 
 * Four business drivers as thermonuclear warheads.
 * Interactive drag-and-drop to calculate savings.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  TrendingDown, 
  TrendingUp, 
  DollarSign, 
  Shield,
  ArrowRight,
  X,
  Check,
  Zap
} from "lucide-react";
import type { CompanyData } from "@/pages/Home";

interface Step1Props {
  companyData: CompanyData | null;
  onNext: () => void;
}

interface Driver {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  genai1Savings: number;
  genai2Savings: number;
}

export default function Step1FinancialDetonator({ companyData, onNext }: Step1Props) {
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [showDifferentiator, setShowDifferentiator] = useState(true);

  const annualBleed = companyData?.annualBleed || 43;

  const drivers: Driver[] = [
    {
      id: "cost",
      name: "Decrease Cost",
      icon: <TrendingDown className="w-8 h-8" />,
      description: "Reduce operational expenses through AI automation",
      genai1Savings: Math.round(annualBleed * 0.074),
      genai2Savings: Math.round(annualBleed * 0.435)
    },
    {
      id: "revenue",
      name: "Increase Revenue",
      icon: <TrendingUp className="w-8 h-8" />,
      description: "Accelerate sales cycles and improve conversion",
      genai1Savings: Math.round(annualBleed * 0.12),
      genai2Savings: Math.round(annualBleed * 0.52)
    },
    {
      id: "capital",
      name: "Optimize Capital",
      icon: <DollarSign className="w-8 h-8" />,
      description: "Improve working capital and asset utilization",
      genai1Savings: Math.round(annualBleed * 0.08),
      genai2Savings: Math.round(annualBleed * 0.38)
    },
    {
      id: "risk",
      name: "Mitigate Risk",
      icon: <Shield className="w-8 h-8" />,
      description: "Reduce compliance failures and security threats",
      genai1Savings: Math.round(annualBleed * 0.05),
      genai2Savings: Math.round(annualBleed * 0.28)
    }
  ];

  const selectedDriverData = drivers.find(d => d.id === selectedDriver);

  const handleDriverClick = (driverId: string) => {
    setSelectedDriver(driverId);
    setShowComparison(true);
  };

  return (
    <div className="min-h-screen py-24 px-4 relative">
      {/* Background */}
      <div className="absolute inset-0 spotlight" />
      
      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-4">
            Step 1: Financial Impact Analysis
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] mb-4">
            The Four-Driver <span className="text-gradient-cyan">Financial Detonator</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select a business driver to see how GenAI 2.0 transforms your ${annualBleed}M bleed into strategic advantage.
          </p>
        </motion.div>

        {/* Driver Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {drivers.map((driver, index) => (
            <motion.div
              key={driver.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleDriverClick(driver.id)}
              className={`
                glass-card rounded-2xl p-6 cursor-pointer transition-all duration-300
                hover:border-primary/50 hover:glow-cyan
                ${selectedDriver === driver.id ? 'border-primary glow-cyan' : 'border-border/50'}
              `}
            >
              <div className={`
                w-16 h-16 rounded-xl flex items-center justify-center mb-4
                ${selectedDriver === driver.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
                }
                transition-all duration-300
              `}>
                {driver.icon}
              </div>
              <h3 className="text-xl font-semibold font-[family-name:var(--font-display)] mb-2">
                {driver.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {driver.description}
              </p>
              
              {/* Quick Preview */}
              <div className="mt-4 pt-4 border-t border-border/30">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">2.0 Savings:</span>
                  <span className="text-primary font-bold font-[family-name:var(--font-mono)]">
                    ${driver.genai2Savings}M
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Panel */}
        <AnimatePresence>
          {showComparison && selectedDriverData && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="glass-card rounded-2xl p-8 mb-12 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Your Bleed */}
                <div className="text-center p-6 bg-destructive/10 rounded-xl border border-destructive/30">
                  <p className="text-sm text-muted-foreground mb-2">Your Current Bleed</p>
                  <p className="text-4xl font-bold text-destructive font-[family-name:var(--font-mono)]">
                    ${annualBleed}M
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">Annual Loss</p>
                </div>

                {/* GenAI 1.0 */}
                <div className="text-center p-6 bg-muted/30 rounded-xl border border-border/50 relative">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <X className="w-24 h-24 text-destructive/30" strokeWidth={1} />
                  </motion.div>
                  <div className="relative z-10 opacity-60">
                    <p className="text-sm text-muted-foreground mb-2">GenAI 1.0 Band-Aid</p>
                    <p className="text-4xl font-bold text-muted-foreground font-[family-name:var(--font-mono)] line-through">
                      ${selectedDriverData.genai1Savings}M
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {Math.round((selectedDriverData.genai1Savings / annualBleed) * 100)}% → Still Bleeding
                    </p>
                  </div>
                </div>

                {/* GenAI 2.0 */}
                <div className="text-center p-6 bg-primary/10 rounded-xl border border-primary/50 glow-cyan relative overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                    className="relative z-10"
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <p className="text-sm text-primary font-medium">GenAI 2.0 Tourniquet</p>
                    </div>
                    <p className="text-4xl font-bold text-primary font-[family-name:var(--font-mono)]">
                      ${selectedDriverData.genai2Savings}M
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {Math.round((selectedDriverData.genai2Savings / annualBleed) * 100)}% → Survivable
                    </p>
                  </motion.div>
                  
                  {/* Animated particles */}
                  <motion.div
                    className="absolute inset-0 opacity-30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-primary rounded-full"
                        animate={{
                          y: [0, -100],
                          opacity: [1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.4,
                        }}
                        style={{
                          left: `${20 + i * 15}%`,
                          bottom: 0,
                        }}
                      />
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* EPS Impact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-8 text-center"
              >
                <div className="inline-flex items-center gap-3 bg-primary/10 rounded-full px-6 py-3 border border-primary/30">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-foreground">
                    Positive EPS Revision: <span className="text-primary font-bold">+${(selectedDriverData.genai2Savings * 0.15).toFixed(1)}/share</span>
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GenAI 2.0 Differentiator */}
        <AnimatePresence>
          {showDifferentiator && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card rounded-2xl p-6 mb-12 border border-primary/30"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                  <h3 className="text-lg font-semibold font-[family-name:var(--font-display)]">
                    BlueAlly 2.0 vs. 1.0 Toy Models
                  </h3>
                </div>
                <button 
                  onClick={() => setShowDifferentiator(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Dimension</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">1.0: Public API Wrappers</th>
                      <th className="text-left py-3 px-4 text-primary font-medium">2.0: Enterprise AI OS</th>
                      <th className="text-right py-3 px-4 text-muted-foreground font-medium">Financial Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/30">
                      <td className="py-3 px-4 font-medium">Architecture</td>
                      <td className="py-3 px-4 text-muted-foreground">Single LLM, prompt roulette</td>
                      <td className="py-3 px-4 text-primary">Multi-agent, fine-tuned ensemble</td>
                      <td className="py-3 px-4 text-right text-green-400 font-[family-name:var(--font-mono)]">$12M less rework</td>
                    </tr>
                    <tr className="border-b border-border/30">
                      <td className="py-3 px-4 font-medium">Data</td>
                      <td className="py-3 px-4 text-muted-foreground">Sends secrets to OpenAI</td>
                      <td className="py-3 px-4 text-primary">Air-gapped, HPE GreenLake</td>
                      <td className="py-3 px-4 text-right text-green-400 font-[family-name:var(--font-mono)]">$50M insurance savings</td>
                    </tr>
                    <tr className="border-b border-border/30">
                      <td className="py-3 px-4 font-medium">Throughput</td>
                      <td className="py-3 px-4 text-muted-foreground">1 req/sec, human babysat</td>
                      <td className="py-3 px-4 text-primary">500 req/sec, autonomous</td>
                      <td className="py-3 px-4 text-right text-green-400 font-[family-name:var(--font-mono)]">$8.4M labor arb</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Governance</td>
                      <td className="py-3 px-4 text-muted-foreground">Manual audit nightmare</td>
                      <td className="py-3 px-4 text-primary">Automated compliance, blockchain log</td>
                      <td className="py-3 px-4 text-right text-green-400 font-[family-name:var(--font-mono)]">$2M legal avoidance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={onNext}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold glow-cyan px-8 py-6 text-lg group"
          >
            See the 23 processes causing this bleed
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
