/*
 * Step 5: The BlueAlly Oracle & Competitive Doomsday Clock
 * 
 * Radar screen with use case blips.
 * Doomsday clock counting down competitive window.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight,
  Clock,
  Rocket,
  Flame,
  Target,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";
import type { UseCase } from "@/pages/Home";

interface Step5Props {
  useCases: UseCase[];
  onUpdate: (cases: UseCase[]) => void;
  onNext: () => void;
}

const defaultUseCases: UseCase[] = [
  { id: "1", name: "Invoice Processing", value: 92, timeToValue: 6, effort: 3, successProb: 89, tokenBurn: 2400 },
  { id: "2", name: "Contract Review", value: 85, timeToValue: 8, effort: 5, successProb: 82, tokenBurn: 3800 },
  { id: "3", name: "Customer Support", value: 78, timeToValue: 4, effort: 4, successProb: 91, tokenBurn: 5200 },
  { id: "4", name: "Sales Forecasting", value: 71, timeToValue: 10, effort: 6, successProb: 74, tokenBurn: 1800 },
  { id: "5", name: "Compliance Audit", value: 88, timeToValue: 12, effort: 7, successProb: 86, tokenBurn: 2100 },
  { id: "6", name: "HR Onboarding", value: 65, timeToValue: 5, effort: 3, successProb: 93, tokenBurn: 1200 },
];

export default function Step5PriorityOracle({ useCases, onUpdate, onNext }: Step5Props) {
  const [doomsdayDays, setDoomsdayDays] = useState(47);
  const [selectedCase, setSelectedCase] = useState<UseCase | null>(null);
  const [cases, setCases] = useState<UseCase[]>(useCases.length > 0 ? useCases : defaultUseCases);

  // Doomsday countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setDoomsdayDays(prev => Math.max(0, prev - 0.001));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate priority score
  const calculateScore = (useCase: UseCase) => {
    return (useCase.value * 0.40) + 
           ((1 / useCase.timeToValue) * 100 * 0.25) + 
           ((1 / useCase.effort) * 100 * 0.20) + 
           (useCase.successProb * 0.15);
  };

  // Sort by priority score
  const sortedCases = [...cases].sort((a, b) => calculateScore(b) - calculateScore(a));

  // Update parent
  useEffect(() => {
    onUpdate(cases);
  }, [cases, onUpdate]);

  return (
    <div className="min-h-screen py-24 px-4 relative">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: "url('/images/priority-radar.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-4">
            Step 5: Strategic Prioritization
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] mb-4 text-foreground">
            The <span className="text-gradient-cyan">BlueAlly Oracle</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Use cases ranked by value, time-to-value, effort, and probability of success.
          </p>
        </motion.div>

        {/* Doomsday Clock */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-6 mb-12 border border-destructive/30 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-destructive animate-pulse" />
            <span className="text-sm text-destructive font-medium uppercase tracking-wider">
              Competitive AI Advantage Window
            </span>
          </div>
          <div className="text-5xl sm:text-6xl font-bold text-destructive font-[family-name:var(--font-mono)] ticker">
            {Math.floor(doomsdayDays)} days
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Average time for competitor to copy. When it hits zero, your blips turn gray.
          </p>
        </motion.div>

        {/* Radar Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-6 mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold font-[family-name:var(--font-display)]">
              Use Case Priority Matrix
            </h3>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-muted-foreground">High Priority</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                <span className="text-muted-foreground">Lower Priority</span>
              </div>
            </div>
          </div>

          {/* Scatter Plot Visualization */}
          <div className="relative h-80 bg-muted/10 rounded-xl border border-border/30 overflow-hidden">
            {/* Grid */}
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(to right, oklch(0.3 0.02 260 / 0.3) 1px, transparent 1px),
                linear-gradient(to bottom, oklch(0.3 0.02 260 / 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '20% 25%'
            }} />

            {/* Axis Labels */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-muted-foreground">
              Value →
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
              Time-to-Value →
            </div>

            {/* Quadrant Labels */}
            <div className="absolute top-4 left-4 text-xs text-primary/50">Quick Wins</div>
            <div className="absolute top-4 right-4 text-xs text-muted-foreground/50">Strategic</div>
            <div className="absolute bottom-8 left-4 text-xs text-muted-foreground/50">Low Priority</div>
            <div className="absolute bottom-8 right-4 text-xs text-muted-foreground/50">Long-term</div>

            {/* Use Case Blips */}
            {sortedCases.map((useCase, index) => {
              const score = calculateScore(useCase);
              const x = (useCase.timeToValue / 15) * 80 + 10; // 10-90% based on TtV
              const y = 100 - (useCase.value / 100) * 80 - 10; // 10-90% based on value
              const size = Math.max(20, score / 2);
              const isTopThree = index < 3;

              return (
                <motion.div
                  key={useCase.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedCase(useCase)}
                  className={`
                    absolute cursor-pointer transition-all duration-300
                    ${isTopThree ? 'z-10' : 'z-0'}
                  `}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  {/* Blip */}
                  <div 
                    className={`
                      rounded-full flex items-center justify-center
                      ${isTopThree 
                        ? 'bg-primary glow-cyan' 
                        : 'bg-muted-foreground/50'
                      }
                      ${selectedCase?.id === useCase.id ? 'ring-2 ring-white' : ''}
                    `}
                    style={{ width: size, height: size }}
                  >
                    {isTopThree && (
                      <Rocket className="w-3 h-3 text-primary-foreground" />
                    )}
                  </div>
                  
                  {/* Label */}
                  <div className={`
                    absolute top-full left-1/2 -translate-x-1/2 mt-1 
                    whitespace-nowrap text-xs
                    ${isTopThree ? 'text-primary' : 'text-muted-foreground'}
                  `}>
                    {useCase.name}
                  </div>

                  {/* Token Burn Indicator */}
                  <div className="absolute -top-1 -right-1">
                    <Flame 
                      className={`w-3 h-3 ${
                        useCase.tokenBurn > 3000 
                          ? 'text-destructive' 
                          : 'text-orange-400'
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Scoring Formula */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-xl p-6 mb-8"
        >
          <h3 className="text-lg font-semibold font-[family-name:var(--font-display)] mb-4">
            Priority Scoring Engine
          </h3>
          <div className="bg-muted/20 rounded-lg p-4 font-[family-name:var(--font-mono)] text-sm overflow-x-auto">
            <code className="text-primary">
              Priority Score = (Value × 0.40) + (1/TtV × 0.25) + (1/Effort × 0.20) + (ProbSuccess × 0.15)
            </code>
          </div>
        </motion.div>

        {/* Top 3 Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {sortedCases.slice(0, 3).map((useCase, index) => {
            const score = calculateScore(useCase);
            
            return (
              <motion.div
                key={useCase.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-xl p-6 border border-primary/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                    <span className="font-semibold">{useCase.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Score</p>
                    <p className="text-lg font-bold text-primary font-[family-name:var(--font-mono)]">
                      {score.toFixed(0)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Value</p>
                    <p className="font-semibold">{useCase.value}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Time-to-Value</p>
                    <p className="font-semibold">{useCase.timeToValue} weeks</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Effort</p>
                    <p className="font-semibold">{useCase.effort}/10</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Success Prob</p>
                    <p className="font-semibold text-primary">{useCase.successProb}%</p>
                  </div>
                </div>

                {/* Token Burn */}
                <div className="mt-4 pt-4 border-t border-border/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Flame className="w-4 h-4 text-orange-400" />
                      <span>Monthly Token Burn</span>
                    </div>
                    <span className="font-[family-name:var(--font-mono)] text-sm">
                      ${useCase.tokenBurn.toLocaleString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Success Rate Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          <div className="glass-card rounded-xl p-6 border-destructive/20">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <span className="font-medium">DIY GenAI 1.0</span>
            </div>
            <div className="text-4xl font-bold text-destructive font-[family-name:var(--font-mono)] mb-2">
              31%
            </div>
            <p className="text-sm text-muted-foreground">Success Rate</p>
            <div className="mt-4 h-2 bg-muted/30 rounded-full overflow-hidden">
              <div className="h-full bg-destructive/50 w-[31%]" />
            </div>
          </div>

          <div className="glass-card rounded-xl p-6 border-primary/30">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="font-medium text-primary">BlueAlly 2.0</span>
            </div>
            <div className="text-4xl font-bold text-primary font-[family-name:var(--font-mono)] mb-2">
              73%
            </div>
            <p className="text-sm text-muted-foreground">Success Rate</p>
            <div className="mt-4 h-2 bg-muted/30 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[73%]" />
            </div>
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
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold glow-cyan px-8 py-6 text-lg group"
          >
            See the 5-year P&L waterfall for your top 3
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
