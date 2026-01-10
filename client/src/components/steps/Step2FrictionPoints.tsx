/*
 * Step 2: The Friction Point Auction
 * 
 * 8 business functions as live pain markets.
 * Each shows cost-per-hour of friction.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight,
  Clock,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Skull,
  Volume2,
  VolumeX
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
  const [expandedId, setExpandedId] = useState<string | null>("procurement");
  const [isMuted, setIsMuted] = useState(true);

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
        frictionPoints.forEach(f => {
          updated[f.id] = (prev[f.id] || 0) + f.costPerMinute;
        });
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSelect = (friction: FrictionPoint) => {
    setSelectedId(friction.id);
    onSelect(friction);
  };

  const selectedFriction = frictionPoints.find(f => f.id === selectedId);

  return (
    <div className="min-h-screen py-24 px-4 relative">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('/images/diagnostic-scan.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-4">
            Step 2: Pain Point Analysis
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] mb-4 text-foreground">
            The <span className="text-gradient-red">Friction Point</span> Auction
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            8 business functions bleeding money every minute. Select your highest-cost pain point.
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
                onClick={() => {
                  setExpandedId(isExpanded ? null : friction.id);
                  handleSelect(friction);
                }}
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
                      <span>{friction.hoursPerWeek} hrs/week in purgatory</span>
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
                  <p className="text-xs text-muted-foreground mb-1">Wasted this session:</p>
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
                  <span>Competitor solved in {friction.competitorSolvedWeeks} weeks with BlueAlly</span>
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
                      {/* 1.0 Failure Graveyard */}
                      <div className="bg-muted/30 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Skull className="w-4 h-4 text-destructive" />
                          <span>1.0 Failure Graveyard</span>
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

                      {/* 2.0 Teaser */}
                      <div className="bg-primary/10 rounded-lg p-3 border border-primary/30">
                        <p className="text-sm text-primary font-medium">
                          GenAI 2.0 agent network: {friction.genai2Accuracy}% straight-through processing
                        </p>
                      </div>

                      {/* Weekly Impact */}
                      <div className="flex justify-between items-center text-sm">
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

        {/* Social Proof Feed */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass-card rounded-xl p-4 mb-12 overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Live Activity</span>
          </div>
          
          <div className="space-y-2">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-sm text-foreground/80"
            >
              <span className="text-primary">Sarah, CFO of {companyData?.competitor || "TechCorp"}</span>, just identified 5 friction points. 
              Her estimated bleed: <span className="text-destructive font-semibold">$2.3M/quarter</span>
            </motion.div>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-foreground/80"
            >
              She booked a workshop <span className="text-primary">47 seconds ago</span>. 
              <span className="text-destructive font-semibold"> 2 slots remain this month.</span>
            </motion.div>
          </div>
        </motion.div>

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
            disabled={!selectedId}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold glow-cyan px-8 py-6 text-lg group disabled:opacity-50"
          >
            See the workflow surgery for your #1 pain
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          {!selectedId && (
            <p className="text-sm text-muted-foreground mt-2">Select a friction point to continue</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
