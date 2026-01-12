/*
 * CHAPTER 2: Pick Your Poison
 * 
 * Galloway: Live counters showing money burning as they read
 * Gladwell: The psychology of why we ignore obvious waste
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Skull,
  ArrowDown,
  Flame
} from "lucide-react";
import type { CompanyData, FrictionPoint } from "@/pages/Home";

interface Step2Props {
  companyData: CompanyData | null;
  onSelect: (friction: FrictionPoint) => void;
  onNext: () => void;
}

const frictionPoints: FrictionPoint[] = [
  {
    id: "procurement",
    name: "Procurement",
    hoursPerWeek: 47,
    costPerMinute: 2.45,
    competitorSolvedWeeks: 11,
    failedExperiments: ["Claude for POs: 34% hallucination on terms", "GPT-4 wrapper: 2hr latency", "Copilot: No ERP integration"],
    genai2Accuracy: 98.7
  },
  {
    id: "finance",
    name: "Finance & Accounting",
    hoursPerWeek: 62,
    costPerMinute: 3.20,
    competitorSolvedWeeks: 8,
    failedExperiments: ["ChatGPT for reconciliation: 12% error rate", "Bard for forecasting: Missed Q3 by 23%"],
    genai2Accuracy: 99.2
  },
  {
    id: "hr",
    name: "HR & Talent",
    hoursPerWeek: 38,
    costPerMinute: 1.85,
    competitorSolvedWeeks: 6,
    failedExperiments: ["AI screening: Bias detected", "Chatbot onboarding: 45% abandonment"],
    genai2Accuracy: 97.8
  },
  {
    id: "legal",
    name: "Legal & Compliance",
    hoursPerWeek: 54,
    costPerMinute: 4.50,
    competitorSolvedWeeks: 14,
    failedExperiments: ["Contract review AI: Missed liability clauses", "Compliance bot: False positives"],
    genai2Accuracy: 99.5
  },
  {
    id: "customer",
    name: "Customer Service",
    hoursPerWeek: 120,
    costPerMinute: 1.20,
    competitorSolvedWeeks: 4,
    failedExperiments: ["Basic chatbot: 67% escalation rate", "Voice AI: Accent failures"],
    genai2Accuracy: 96.4
  },
  {
    id: "sales",
    name: "Sales Operations",
    hoursPerWeek: 45,
    costPerMinute: 2.80,
    competitorSolvedWeeks: 9,
    failedExperiments: ["Lead scoring AI: 28% accuracy", "Email gen: Generic, ignored"],
    genai2Accuracy: 94.2
  },
  {
    id: "it",
    name: "IT Operations",
    hoursPerWeek: 72,
    costPerMinute: 3.60,
    competitorSolvedWeeks: 7,
    failedExperiments: ["Ticket routing: 40% misclassification", "Code assist: Security vulnerabilities"],
    genai2Accuracy: 98.1
  },
  {
    id: "supply",
    name: "Supply Chain",
    hoursPerWeek: 58,
    costPerMinute: 2.90,
    competitorSolvedWeeks: 12,
    failedExperiments: ["Demand forecasting: 35% MAPE", "Inventory AI: Stockouts increased"],
    genai2Accuracy: 97.3
  }
];

export default function Step2FrictionPoints({ companyData, onSelect, onNext }: Step2Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [costTickers, setCostTickers] = useState<Record<string, number>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [totalBurned, setTotalBurned] = useState(0);

  // Sort by cost (highest first)
  const sortedFrictions = [...frictionPoints].sort(
    (a, b) => (b.hoursPerWeek * b.costPerMinute * 60) - (a.hoursPerWeek * a.costPerMinute * 60)
  );

  // Initialize cost tickers
  useEffect(() => {
    const initial: Record<string, number> = {};
    frictionPoints.forEach(f => {
      initial[f.id] = 0;
    });
    setCostTickers(initial);
  }, []);

  // Animate cost tickers
  useEffect(() => {
    const interval = setInterval(() => {
      setCostTickers(prev => {
        const updated = { ...prev };
        let total = 0;
        frictionPoints.forEach(f => {
          updated[f.id] = (prev[f.id] || 0) + f.costPerMinute;
          total += updated[f.id];
        });
        setTotalBurned(total);
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSelect = (friction: FrictionPoint) => {
    setSelectedId(friction.id);
    setExpandedId(friction.id);
    onSelect(friction);
  };

  return (
    <div className="min-h-screen py-24 px-4 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('/images/diagnostic-scan.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="container relative z-10">
        {/* Chapter Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-4">
            Chapter 2
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] mb-6 text-foreground">
            Pick Your <span className="text-gradient-red">Poison</span>
          </h2>
          
          {/* Gladwell Insight */}
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-lg text-muted-foreground italic">
              "Here's the psychology of waste: we ignore it because it's distributed. 
              $10,000 here, $50,000 there. It doesn't feel like millions until you see it all at once."
            </p>
          </div>
        </motion.div>

        {/* Live Burn Counter - Galloway Style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-6 mb-12 border border-destructive/30 bg-destructive/5"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Flame className="w-6 h-6 text-destructive animate-pulse" />
              <div>
                <p className="text-sm text-foreground font-medium">Money burned while reading this page</p>
                <p className="text-xs text-muted-foreground">Across all 8 friction points below</p>
              </div>
            </div>
            <div className="text-right">
              <motion.p 
                className="text-3xl sm:text-4xl font-bold text-destructive font-[family-name:var(--font-mono)]"
                key={Math.floor(totalBurned)}
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
              >
                ${totalBurned.toFixed(2)}
              </motion.p>
              <p className="text-xs text-muted-foreground italic">"That's not a rounding error."</p>
            </div>
          </div>
        </motion.div>

        {/* Galloway Commentary */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            <span className="text-foreground font-medium">Pick one.</span> We'll show you exactly 
            how a competitor fixed it, how long it took, and what it cost them. 
            <span className="text-destructive"> Spoiler: less than you're spending to not fix it.</span>
          </p>
        </motion.div>

        {/* Friction Point Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {sortedFrictions.map((friction, index) => {
            const weeklyWaste = friction.hoursPerWeek * friction.costPerMinute * 60;
            const isExpanded = expandedId === friction.id;
            const isSelected = selectedId === friction.id;

            return (
              <motion.div
                key={friction.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSelect(friction)}
                className={`
                  glass-card rounded-xl p-5 cursor-pointer transition-all duration-300
                  ${isSelected ? 'border-primary glow-cyan' : 'border-border/50 hover:border-primary/30'}
                  ${isExpanded ? 'lg:col-span-2 lg:row-span-2' : ''}
                `}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold font-[family-name:var(--font-display)]">
                      {friction.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Clock className="w-3 h-3" />
                      <span>{friction.hoursPerWeek} hrs/week</span>
                    </div>
                  </div>
                  {index === 0 && (
                    <div className="flex items-center gap-1 bg-destructive/20 text-destructive text-xs px-2 py-1 rounded-full">
                      <AlertCircle className="w-3 h-3" />
                      Highest
                    </div>
                  )}
                </div>

                {/* Cost Ticker */}
                <div className="bg-destructive/10 rounded-lg p-3 mb-3 border border-destructive/20">
                  <p className="text-xs text-muted-foreground mb-1">Burned this session:</p>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-destructive" />
                    <span className="text-2xl font-bold text-destructive font-[family-name:var(--font-mono)] ticker">
                      ${(costTickers[friction.id] || 0).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Competitor Badge */}
                <div className="flex items-center gap-2 text-xs text-primary mb-3">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Fixed in {friction.competitorSolvedWeeks} weeks</span>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4"
                    >
                      {/* Gladwell Story */}
                      <div className="bg-muted/20 rounded-lg p-3 border border-border/30">
                        <p className="text-sm text-muted-foreground italic">
                          "A Fortune 500 company spent {friction.hoursPerWeek} hours per week on this. 
                          They called it 'the cost of doing business.' Their competitor called it 'an opportunity.'"
                        </p>
                      </div>

                      {/* 1.0 Failure Graveyard */}
                      <div className="bg-destructive/5 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Skull className="w-4 h-4 text-destructive" />
                          <span>The 1.0 Graveyard</span>
                        </div>
                        <ul className="space-y-1">
                          {friction.failedExperiments.map((exp, i) => (
                            <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                              <span className="text-destructive">✗</span>
                              {exp}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* 2.0 Result */}
                      <div className="bg-primary/10 rounded-lg p-3 border border-primary/30">
                        <p className="text-sm text-primary font-medium">
                          GenAI 2.0: {friction.genai2Accuracy}% straight-through processing
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          "The difference between a demo and a deployment."
                        </p>
                      </div>

                      {/* Weekly Impact */}
                      <div className="flex justify-between items-center text-sm pt-2 border-t border-border/30">
                        <span className="text-muted-foreground">Weekly waste:</span>
                        <span className="text-destructive font-bold font-[family-name:var(--font-mono)]">
                          ${weeklyWaste.toLocaleString()}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* The Graveyard Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-6 mb-12 border border-destructive/20"
        >
          <div className="flex items-center gap-2 mb-4">
            <Skull className="w-5 h-5 text-destructive" />
            <h3 className="text-lg font-semibold font-[family-name:var(--font-display)]">
              The GenAI 1.0 Graveyard
            </h3>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4 italic">
            "These are real attempts. Real failures. Real money gone. The 67% failure rate isn't a statistic. 
            It's a confession that most companies are still playing with toys."
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-destructive/5 rounded-lg border border-destructive/20">
              <p className="text-destructive font-medium mb-1">The Hallucination Problem</p>
              <p className="text-xs text-muted-foreground">34% of 1.0 outputs contain fabricated data</p>
            </div>
            <div className="p-4 bg-destructive/5 rounded-lg border border-destructive/20">
              <p className="text-destructive font-medium mb-1">The Integration Problem</p>
              <p className="text-xs text-muted-foreground">0% of wrappers connect to your ERP</p>
            </div>
            <div className="p-4 bg-destructive/5 rounded-lg border border-destructive/20">
              <p className="text-destructive font-medium mb-1">The Scale Problem</p>
              <p className="text-xs text-muted-foreground">1 req/sec doesn't move the needle</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border/30">
            <p className="text-sm text-primary">
              GenAI 2.0 agent networks: <span className="font-bold">98.7% straight-through processing, 500 req/sec, air-gapped.</span>
            </p>
          </div>
        </motion.div>

        {/* Transition */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-4 max-w-lg mx-auto">
            You've identified the bleeding. Now let's perform surgery. 
            We'll show you exactly what happens to one transaction, step by step.
          </p>
          
          <motion.button
            onClick={onNext}
            disabled={!selectedId}
            className="group flex items-center gap-2 mx-auto text-primary hover:text-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ y: selectedId ? 2 : 0 }}
          >
            <span className="text-sm font-medium">
              {selectedId ? "Chapter 3: The Autopsy" : "Select a friction point to continue"}
            </span>
            {selectedId && <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
