/*
 * CHAPTER 1: The Four Ways Your Enterprise Bleeds
 * 
 * Galloway: "Every dollar you waste on GenAI 1.0 is a dollar your competitor invests in 2.0"
 * Gladwell: Frame it as a medical diagnosis - the four vital signs of enterprise health
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingDown, 
  TrendingUp, 
  DollarSign, 
  Shield,
  X,
  Check,
  Zap,
  ArrowDown
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
  gallowayQuote: string;
  genai1Savings: number;
  genai2Savings: number;
}

export default function Step1FinancialDetonator({ companyData, onNext }: Step1Props) {
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  const annualBleed = companyData?.annualBleed || 43;

  const drivers: Driver[] = [
    {
      id: "cost",
      name: "Cost",
      icon: <TrendingDown className="w-8 h-8" />,
      description: "The money walking out the door while your team 'evaluates vendors'",
      gallowayQuote: "You're paying people to do what robots should do. That's not employment. That's charity.",
      genai1Savings: Math.round(annualBleed * 0.074),
      genai2Savings: Math.round(annualBleed * 0.435)
    },
    {
      id: "revenue",
      name: "Revenue",
      icon: <TrendingUp className="w-8 h-8" />,
      description: "The deals you're losing while competitors close in half the time",
      gallowayQuote: "Your sales cycle is a competitive disadvantage disguised as 'relationship building.'",
      genai1Savings: Math.round(annualBleed * 0.12),
      genai2Savings: Math.round(annualBleed * 0.52)
    },
    {
      id: "capital",
      name: "Capital",
      icon: <DollarSign className="w-8 h-8" />,
      description: "The cash trapped in processes that should take minutes, not months",
      gallowayQuote: "Working capital tied up in manual processes is just laziness with a spreadsheet.",
      genai1Savings: Math.round(annualBleed * 0.08),
      genai2Savings: Math.round(annualBleed * 0.38)
    },
    {
      id: "risk",
      name: "Risk",
      icon: <Shield className="w-8 h-8" />,
      description: "The compliance failures waiting to become headlines",
      gallowayQuote: "The question isn't if you'll have a breach. It's whether you'll have documented negligence.",
      genai1Savings: Math.round(annualBleed * 0.05),
      genai2Savings: Math.round(annualBleed * 0.28)
    }
  ];

  const selectedDriverData = drivers.find(d => d.id === selectedDriver);
  const totalGenAI2Savings = drivers.reduce((sum, d) => sum + d.genai2Savings, 0);

  const handleDriverClick = (driverId: string) => {
    setSelectedDriver(driverId);
    setShowComparison(true);
  };

  return (
    <div className="min-h-screen py-24 px-4 relative">
      <div className="absolute inset-0 spotlight" />
      
      <div className="container relative z-10">
        {/* Gladwell-style Chapter Opening */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-4">
            Chapter 1
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] mb-6 text-foreground">
            The Four Ways <span className="text-gradient-red">Your Enterprise Bleeds</span>
          </h2>
          
          {/* Gladwell Hook */}
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-lg text-muted-foreground italic mb-4">
              "In medicine, there are four vital signs: pulse, temperature, respiration, blood pressure. 
              In business, there are also four. And right now, yours are all flashing red."
            </p>
          </div>
          
          {/* Galloway Punch */}
          <div className="inline-block bg-destructive/10 border border-destructive/30 rounded-lg px-6 py-3">
            <p className="text-sm text-foreground">
              Your ${annualBleed}M annual bleed breaks down into four categories. 
              <span className="text-destructive font-semibold"> Pick one. Any one. They all hurt.</span>
            </p>
          </div>
        </motion.div>

        {/* Driver Cards - Simplified, Story-Driven */}
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
                w-14 h-14 rounded-xl flex items-center justify-center mb-4
                ${selectedDriver === driver.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
                }
                transition-all duration-300
              `}>
                {driver.icon}
              </div>
              <h3 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-2">
                {driver.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {driver.description}
              </p>
              
              {/* The Number */}
              <div className="pt-4 border-t border-border/30">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Recoverable</span>
                  <span className="text-2xl text-primary font-bold font-[family-name:var(--font-mono)]">
                    ${driver.genai2Savings}M
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Panel - Galloway Style */}
        <AnimatePresence>
          {showComparison && selectedDriverData && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="glass-card rounded-2xl p-8 mb-12 overflow-hidden"
            >
              {/* Galloway Quote */}
              <div className="text-center mb-8">
                <p className="text-lg text-muted-foreground italic max-w-2xl mx-auto">
                  "{selectedDriverData.gallowayQuote}"
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* The Problem */}
                <div className="text-center p-6 bg-destructive/10 rounded-xl border border-destructive/30">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">The Problem</p>
                  <p className="text-4xl font-bold text-destructive font-[family-name:var(--font-mono)]">
                    ${annualBleed}M
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">bleeding annually</p>
                </div>

                {/* The Wrong Answer */}
                <div className="text-center p-6 bg-muted/30 rounded-xl border border-border/50 relative">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <X className="w-20 h-20 text-destructive/20" strokeWidth={1} />
                  </motion.div>
                  <div className="relative z-10 opacity-60">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">GenAI 1.0</p>
                    <p className="text-4xl font-bold text-muted-foreground font-[family-name:var(--font-mono)] line-through">
                      ${selectedDriverData.genai1Savings}M
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {Math.round((selectedDriverData.genai1Savings / annualBleed) * 100)}% recovery
                    </p>
                    <p className="text-xs text-destructive mt-1">Still dying, just slower</p>
                  </div>
                </div>

                {/* The Right Answer */}
                <div className="text-center p-6 bg-primary/10 rounded-xl border border-primary/50 glow-cyan relative overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                    className="relative z-10"
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <p className="text-xs text-primary font-medium uppercase tracking-wider">GenAI 2.0</p>
                    </div>
                    <p className="text-4xl font-bold text-primary font-[family-name:var(--font-mono)]">
                      ${selectedDriverData.genai2Savings}M
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {Math.round((selectedDriverData.genai2Savings / annualBleed) * 100)}% recovery
                    </p>
                    <p className="text-xs text-primary mt-1">Survivable. Investable.</p>
                  </motion.div>
                </div>
              </div>

              {/* The Difference */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-8 text-center"
              >
                <div className="inline-flex items-center gap-3 bg-primary/10 rounded-full px-6 py-3 border border-primary/30">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-foreground">
                    The difference: <span className="text-primary font-bold">${selectedDriverData.genai2Savings - selectedDriverData.genai1Savings}M</span> more per year
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The 1.0 vs 2.0 Truth Table - Gladwell Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-6 mb-12 border border-primary/30"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
            <h3 className="text-lg font-semibold font-[family-name:var(--font-display)]">
              The Difference Between 1.0 and 2.0
            </h3>
          </div>
          
          {/* Gladwell Insight */}
          <p className="text-muted-foreground italic mb-6 max-w-2xl">
            "Malcolm Gladwell would call this a 'tipping point' - the moment when small differences 
            in approach create massive differences in outcome. Here's what that looks like in dollars:"
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Dimension</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">1.0: The Toy</th>
                  <th className="text-left py-3 px-4 text-primary font-medium">2.0: The Weapon</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">$ Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                <tr>
                  <td className="py-3 px-4 text-foreground">Architecture</td>
                  <td className="py-3 px-4 text-muted-foreground">Single LLM, prompt roulette</td>
                  <td className="py-3 px-4 text-foreground">Multi-agent, fine-tuned ensemble</td>
                  <td className="py-3 px-4 text-right text-primary font-mono">$12M less rework</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-foreground">Data</td>
                  <td className="py-3 px-4 text-muted-foreground">Sends secrets to OpenAI</td>
                  <td className="py-3 px-4 text-foreground">Air-gapped, your infrastructure</td>
                  <td className="py-3 px-4 text-right text-primary font-mono">$50M insurance savings</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-foreground">Throughput</td>
                  <td className="py-3 px-4 text-muted-foreground">1 req/sec, human babysat</td>
                  <td className="py-3 px-4 text-foreground">500 req/sec, autonomous</td>
                  <td className="py-3 px-4 text-right text-primary font-mono">$8.4M labor arb</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-foreground">Governance</td>
                  <td className="py-3 px-4 text-muted-foreground">Manual audit nightmare</td>
                  <td className="py-3 px-4 text-foreground">Automated compliance, blockchain log</td>
                  <td className="py-3 px-4 text-right text-primary font-mono">$2M legal avoidance</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Transition to Next Chapter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-4 max-w-lg mx-auto">
            You've seen the four vital signs. Now let's find the specific processes 
            that are causing the bleeding.
          </p>
          
          <motion.button
            onClick={onNext}
            className="group flex items-center gap-2 mx-auto text-primary hover:text-primary/80 transition-colors"
            whileHover={{ y: 2 }}
          >
            <span className="text-sm font-medium">Chapter 2: Pick Your Poison</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
