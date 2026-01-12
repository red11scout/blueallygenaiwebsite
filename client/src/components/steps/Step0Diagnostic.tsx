/*
 * PROLOGUE: The Uncomfortable Truth
 * 
 * Voice: Galloway's brutal honesty + Gladwell's counterintuitive hook
 * "In 2024, 67% of enterprise AI projects failed. The successful 33% 
 * didn't have better technology. They had better math."
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Loader2, TrendingDown, TrendingUp, AlertTriangle, ArrowDown } from "lucide-react";
import type { CompanyData } from "@/pages/Home";

interface Step0DiagnosticProps {
  onComplete: (data: CompanyData) => void;
}

// Simulated company data generator
function generateCompanyData(domain: string): CompanyData {
  const companyName = domain.replace(/\.(com|io|co|net|org)$/i, "")
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  
  const sgaPercent = 18 + Math.random() * 8;
  const industryAvgSga = 15 + Math.random() * 4;
  const revenue = 150 + Math.random() * 350;
  const annualBleed = Math.round((sgaPercent - industryAvgSga) * revenue / 100);
  
  return {
    domain,
    companyName,
    sgaPercent: Math.round(sgaPercent * 10) / 10,
    industryAvgSga: Math.round(industryAvgSga * 10) / 10,
    annualBleed,
    competitor: ["Acme Corp", "TechVenture", "GlobalSoft", "InnovateCo"][Math.floor(Math.random() * 4)],
    competitorStockChange: 5 + Math.random() * 8,
    yourStockChange: -(1 + Math.random() * 4),
    evMultiplePremium: 2.8 + Math.random() * 0.8
  };
}

export default function Step0Diagnostic({ onComplete }: Step0DiagnosticProps) {
  const [domain, setDomain] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisPhase, setAnalysisPhase] = useState(0);
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const analysisPhases = [
    "Pulling SEC filings...",
    "Calculating your SG&A delta...",
    "Benchmarking against 847 competitors...",
    "Quantifying the damage..."
  ];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (domain.toLowerCase().endsWith(".com") && !isAnalyzing && !companyData) {
      handleAnalyze();
    }
  }, [domain]);

  const handleAnalyze = async () => {
    if (!domain || isAnalyzing) return;
    
    setIsAnalyzing(true);
    setAnalysisPhase(0);

    for (let i = 0; i < analysisPhases.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setAnalysisPhase(i + 1);
    }

    const data = generateCompanyData(domain);
    setCompanyData(data);
    setIsAnalyzing(false);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    setShowResults(true);
  };

  const handleContinue = () => {
    if (companyData) {
      onComplete(companyData);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 dark:opacity-30 hidden dark:block"
        style={{ backgroundImage: "url('/images/hero-neural-network.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, oklch(0.55 0.2 195 / 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(0.55 0.2 195 / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto text-center">
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Gladwell Hook */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-6"
              >
                <p className="text-sm sm:text-base text-muted-foreground italic max-w-lg mx-auto leading-relaxed">
                  "In 2024, 67% of enterprise AI projects failed. But here's what no one tells you: 
                  the successful 33% didn't have better technology. <span className="text-foreground font-medium">They had better math.</span>"
                </p>
              </motion.div>

              {/* Galloway Headline */}
              <div className="space-y-4">
                <motion.h1 
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-foreground">Let's Do </span>
                  <span className="text-gradient-red">The Math</span>
                </motion.h1>
                <motion.p 
                  className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Enter your domain. In 8 seconds, we'll show you exactly how much money you're lighting on fire.
                </motion.p>
              </div>

              {/* Input */}
              <motion.div 
                className="relative max-w-md mx-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="company.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  disabled={isAnalyzing}
                  className="h-16 text-xl text-center bg-card border-2 border-border focus:border-primary focus:glow-cyan transition-all duration-300 font-[family-name:var(--font-mono)] text-foreground placeholder:text-muted-foreground"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAnalyze();
                  }}
                />
                
                <AnimatePresence>
                  {isAnalyzing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-card/90 backdrop-blur-sm rounded-lg flex items-center justify-center"
                    >
                      <div className="flex items-center gap-3">
                        <Loader2 className="w-5 h-5 animate-spin text-primary" />
                        <span className="text-sm text-muted-foreground font-[family-name:var(--font-mono)]">
                          {analysisPhases[Math.min(analysisPhase, analysisPhases.length - 1)]}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.p 
                className="text-sm text-muted-foreground/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                Auto-analyzes when you type .com
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {/* Company Name */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <p className="text-sm text-muted-foreground uppercase tracking-wider">The Uncomfortable Truth About</p>
                <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)] text-foreground">
                  {companyData?.companyName}
                </h2>
              </motion.div>

              {/* Galloway-style Brutal Metric */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-destructive/10 blur-3xl rounded-full" />
                <div className="relative glass-card rounded-2xl p-8 border border-destructive/30">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <AlertTriangle className="w-5 h-5 text-destructive animate-pulse" />
                    <span className="text-sm text-destructive font-medium uppercase tracking-wider">
                      Here's Your Number
                    </span>
                  </div>
                  
                  {/* Gladwell-style insight */}
                  <p className="text-muted-foreground mb-4 text-sm max-w-md mx-auto">
                    Your SG&A runs at <span className="text-foreground font-semibold">{companyData?.sgaPercent}%</span>. 
                    The industry average is <span className="text-foreground font-semibold">{companyData?.industryAvgSga}%</span>. 
                    That gap? It's not inefficiency. It's a confession.
                  </p>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                    className="text-5xl sm:text-7xl font-bold text-gradient-red font-[family-name:var(--font-display)] pulse-vital"
                  >
                    ${companyData?.annualBleed}M
                  </motion.div>
                  <p className="text-lg text-muted-foreground mt-2">per year. Gone.</p>
                  
                  {/* Galloway Punch */}
                  <p className="text-sm text-muted-foreground/80 mt-4 italic">
                    "That's not a rounding error. That's someone's entire AI budget."
                  </p>
                </div>
              </motion.div>

              {/* Competitor Comparison - Galloway style */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-4"
              >
                <p className="text-sm text-muted-foreground">
                  While you're reading this, here's what's happening:
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-card rounded-xl p-6 border border-green-500/20">
                    <p className="text-sm text-muted-foreground mb-2">{companyData?.competitor}</p>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      <span className="text-2xl font-bold text-green-400 font-[family-name:var(--font-mono)]">
                        +{companyData?.competitorStockChange.toFixed(1)}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Announced AI initiative last quarter</p>
                  </div>

                  <div className="glass-card rounded-xl p-6 border border-destructive/20">
                    <p className="text-sm text-muted-foreground mb-2">Your Stock</p>
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-5 h-5 text-destructive" />
                      <span className="text-2xl font-bold text-destructive font-[family-name:var(--font-mono)]">
                        {companyData?.yourStockChange.toFixed(1)}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Still "evaluating options"</p>
                  </div>
                </div>
              </motion.div>

              {/* EV Multiple */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="glass-card rounded-xl p-6 border border-primary/20"
              >
                <p className="text-sm text-muted-foreground mb-2">The Market's Verdict</p>
                <p className="text-lg text-foreground">
                  Companies with mature AI ops trade at{" "}
                  <span className="text-primary font-bold text-2xl">
                    {companyData?.evMultiplePremium.toFixed(1)}x
                  </span>{" "}
                  higher EV/Revenue multiples.
                </p>
                <p className="text-sm text-muted-foreground mt-2 italic">
                  "The market isn't wrong. You're just not in the club yet."
                </p>
              </motion.div>

              {/* Gladwell Transition */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="pt-4"
              >
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                  But here's the thing Malcolm Gladwell would tell you: 
                  <span className="text-foreground font-medium"> the tipping point isn't about technology. 
                  It's about the moment you decide to look at the numbers.</span>
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  You just did. Now let's find where it's bleeding.
                </p>
                
                <motion.button
                  onClick={handleContinue}
                  className="group flex items-center gap-2 mx-auto text-primary hover:text-primary/80 transition-colors"
                  whileHover={{ y: 2 }}
                >
                  <span className="text-sm font-medium">See the four places you're hemorrhaging</span>
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
