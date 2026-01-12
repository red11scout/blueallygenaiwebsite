/*
 * Step 1: Financial Impact Analysis
 * 
 * Shows four key business drivers and their potential AI impact.
 * Clear explanations with tooltips for deeper understanding.
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
  HelpCircle,
  CheckCircle2,
  Info
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { CompanyData } from "@/pages/Home";

interface Step1Props {
  companyData: CompanyData | null;
  onNext: () => void;
}

interface Driver {
  id: string;
  name: string;
  icon: React.ReactNode;
  shortDesc: string;
  longDesc: string;
  examples: string[];
  currentCost: number;
  withAI: number;
}

export default function Step1FinancialDetonator({ companyData, onNext }: Step1Props) {
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [viewedDrivers, setViewedDrivers] = useState<Set<string>>(new Set());

  const annualBleed = companyData?.annualBleed || 43;

  const drivers: Driver[] = [
    {
      id: "cost",
      name: "Reduce Costs",
      icon: <TrendingDown className="w-6 h-6" />,
      shortDesc: "Cut operational expenses with AI automation",
      longDesc: "AI can automate repetitive tasks, reduce errors, and streamline processes - directly lowering your operating costs.",
      examples: ["Automated data entry", "Smart document processing", "Predictive maintenance"],
      currentCost: annualBleed,
      withAI: Math.round(annualBleed * 0.565) // 43.5% savings
    },
    {
      id: "revenue",
      name: "Grow Revenue",
      icon: <TrendingUp className="w-6 h-6" />,
      shortDesc: "Accelerate sales and improve conversion",
      longDesc: "AI-powered insights help identify opportunities, personalize customer experiences, and close deals faster.",
      examples: ["Lead scoring", "Personalized recommendations", "Demand forecasting"],
      currentCost: Math.round(annualBleed * 0.8),
      withAI: Math.round(annualBleed * 0.8 * 0.48) // 52% improvement
    },
    {
      id: "capital",
      name: "Optimize Capital",
      icon: <DollarSign className="w-6 h-6" />,
      shortDesc: "Improve cash flow and asset utilization",
      longDesc: "Better forecasting and inventory management means less capital tied up in operations.",
      examples: ["Inventory optimization", "Cash flow prediction", "Asset utilization"],
      currentCost: Math.round(annualBleed * 0.6),
      withAI: Math.round(annualBleed * 0.6 * 0.62) // 38% improvement
    },
    {
      id: "risk",
      name: "Reduce Risk",
      icon: <Shield className="w-6 h-6" />,
      shortDesc: "Prevent compliance failures and fraud",
      longDesc: "AI monitors for anomalies, ensures compliance, and catches issues before they become costly problems.",
      examples: ["Fraud detection", "Compliance monitoring", "Security threat detection"],
      currentCost: Math.round(annualBleed * 0.4),
      withAI: Math.round(annualBleed * 0.4 * 0.72) // 28% improvement
    }
  ];

  const selectedDriverData = drivers.find(d => d.id === selectedDriver);
  const totalPotentialSavings = drivers.reduce((sum, d) => sum + (d.currentCost - d.withAI), 0);

  const handleDriverClick = (driverId: string) => {
    setSelectedDriver(driverId);
    setViewedDrivers(prev => new Set(Array.from(prev).concat(driverId)));
  };

  return (
    <div className="min-h-screen py-24 px-4 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="container relative z-10 max-w-5xl mx-auto">
        {/* Header with explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-4 bg-primary/10 px-3 py-1 rounded-full">
            <span>Step 1 of 8</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Where Can AI Help Your Business?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Click each card to explore how AI can impact different areas of your business. 
            We'll calculate conservative savings estimates based on your company profile.
          </p>
          
          {/* Quick context */}
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-lg">
            <Info className="w-4 h-4" />
            <span>Based on {companyData?.companyName || "your company"}'s ${annualBleed}M annual SG&A spend</span>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-4 h-4 text-muted-foreground/70" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>SG&A (Selling, General & Administrative) expenses are operational costs that AI can help reduce through automation and optimization.</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </motion.div>

        {/* Driver Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {drivers.map((driver, index) => (
            <motion.div
              key={driver.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleDriverClick(driver.id)}
              className={`
                relative rounded-xl p-5 cursor-pointer transition-all duration-300 border-2
                ${selectedDriver === driver.id 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border bg-card hover:border-primary/50 hover:bg-muted/30'
                }
              `}
            >
              {/* Viewed indicator */}
              {viewedDrivers.has(driver.id) && (
                <div className="absolute top-3 right-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className={`
                  w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
                  ${selectedDriver === driver.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                  }
                `}>
                  {driver.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {driver.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {driver.shortDesc}
                  </p>
                  
                  {/* Savings preview */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Potential savings:</span>
                    <span className="font-bold text-primary">
                      ${driver.currentCost - driver.withAI}M/year
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed View Panel */}
        <AnimatePresence>
          {selectedDriverData && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="rounded-xl border border-border bg-card p-6 mb-8 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Explanation */}
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    How AI Helps {selectedDriverData.name}
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    {selectedDriverData.longDesc}
                  </p>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Common use cases:</p>
                    <ul className="space-y-1">
                      {selectedDriverData.examples.map((example, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right: Numbers comparison */}
                <div className="bg-muted/30 rounded-lg p-5">
                  <p className="text-sm font-medium text-muted-foreground mb-4">Financial Impact</p>
                  
                  <div className="space-y-4">
                    {/* Current state */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Current annual cost</p>
                        <p className="text-2xl font-bold text-foreground">${selectedDriverData.currentCost}M</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">With AI optimization</p>
                        <p className="text-2xl font-bold text-primary">${selectedDriverData.withAI}M</p>
                      </div>
                    </div>

                    {/* Savings bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Your savings</span>
                        <span className="font-semibold text-primary">
                          ${selectedDriverData.currentCost - selectedDriverData.withAI}M/year
                        </span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${((selectedDriverData.currentCost - selectedDriverData.withAI) / selectedDriverData.currentCost) * 100}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full bg-primary rounded-full"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {Math.round(((selectedDriverData.currentCost - selectedDriverData.withAI) / selectedDriverData.currentCost) * 100)}% reduction
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Summary & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Total potential */}
          <div className="inline-flex items-center gap-4 bg-primary/10 border border-primary/30 rounded-xl px-6 py-4 mb-6">
            <div className="text-left">
              <p className="text-sm text-muted-foreground">Total potential annual savings</p>
              <p className="text-3xl font-bold text-primary">${totalPotentialSavings}M</p>
            </div>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-5 h-5 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>This is a conservative estimate based on industry benchmarks. Actual savings depend on your specific implementation and processes.</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Progress indicator */}
          <p className="text-sm text-muted-foreground mb-4">
            {viewedDrivers.size < 4 
              ? `Explore ${4 - viewedDrivers.size} more area${4 - viewedDrivers.size > 1 ? 's' : ''} to continue`
              : "Great! You've explored all areas. Let's dive deeper."
            }
          </p>

          <Button 
            onClick={onNext}
            size="lg"
            disabled={viewedDrivers.size < 2}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            Continue to Pain Points
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
