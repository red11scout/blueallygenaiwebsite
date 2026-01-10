/*
 * Step 0: The Diagnostic Assassination
 * 
 * Entry: Single input [Company.com]. Auto-submit on .com entry.
 * Extracts financial data and displays killer metrics.
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react";
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
  
  const sgaPercent = 18 + Math.random() * 8; // 18-26%
  const industryAvgSga = 15 + Math.random() * 4; // 15-19%
  const revenue = 150 + Math.random() * 350; // $150M - $500M
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
    "Extracting financial data...",
    "Analyzing SG&A metrics...",
    "Scanning competitor landscape...",
    "Calculating market position..."
  ];

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Auto-submit on .com detection
  useEffect(() => {
    if (domain.toLowerCase().endsWith(".com") && !isAnalyzing && !companyData) {
      handleAnalyze();
    }
  }, [domain]);

  const handleAnalyze = async () => {
    if (!domain || isAnalyzing) return;
    
    setIsAnalyzing(true);
    setAnalysisPhase(0);

    // Simulate analysis phases
    for (let i = 0; i < analysisPhases.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setAnalysisPhase(i + 1);
    }

    // Generate and set data
    const data = generateCompanyData(domain);
    setCompanyData(data);
    setIsAnalyzing(false);
    
    // Reveal results with animation
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
      {/* Background Image - hidden in light mode for better contrast */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 dark:opacity-30 hidden dark:block"
        style={{ backgroundImage: "url('/images/hero-neural-network.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />

      {/* Animated Grid Background */}
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
              {/* Headline */}
              <div className="space-y-4">
                <motion.h1 
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-foreground">Your Enterprise is </span>
                  <span className="text-gradient-red">Bleeding</span>
                </motion.h1>
                <motion.p 
                  className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Enter your company domain. We'll diagnose the financial hemorrhage in 3.2 seconds.
                </motion.p>
              </div>

              {/* Input */}
              <motion.div 
                className="relative max-w-md mx-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
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
                
                {/* Analyzing Overlay */}
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

              {/* Hint */}
              <motion.p 
                className="text-sm text-muted-foreground/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
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
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Diagnostic Report</p>
                <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)] text-foreground">
                  {companyData?.companyName}
                </h2>
              </motion.div>

              {/* Killer Metric - Annual Bleed */}
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
                      Critical Finding
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    Your SG&A is <span className="text-foreground font-semibold">{companyData?.sgaPercent}%</span> vs. 
                    Industry <span className="text-foreground font-semibold">{companyData?.industryAvgSga}%</span>
                  </p>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                    className="text-5xl sm:text-7xl font-bold text-gradient-red font-[family-name:var(--font-display)] pulse-vital"
                  >
                    ${companyData?.annualBleed}M
                  </motion.div>
                  <p className="text-lg text-muted-foreground mt-2">Annual Bleed</p>
                </div>
              </motion.div>

              {/* Competitor Comparison */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 gap-4"
              >
                {/* Competitor */}
                <div className="glass-card rounded-xl p-6 border border-primary/20">
                  <p className="text-sm text-muted-foreground mb-2">{companyData?.competitor}</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-2xl font-bold text-green-400 font-[family-name:var(--font-mono)]">
                      +{companyData?.competitorStockChange.toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Just announced AI initiative</p>
                </div>

                {/* Your Company */}
                <div className="glass-card rounded-xl p-6 border border-destructive/20">
                  <p className="text-sm text-muted-foreground mb-2">Your Stock</p>
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-destructive" />
                    <span className="text-2xl font-bold text-destructive font-[family-name:var(--font-mono)]">
                      {companyData?.yourStockChange.toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Valued as legacy asset</p>
                </div>
              </motion.div>

              {/* Industry Position */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="glass-card rounded-xl p-6"
              >
                <p className="text-sm text-muted-foreground mb-4">AI Adoption Quadrant</p>
                <div className="relative h-32 bg-muted/20 rounded-lg overflow-hidden">
                  {/* Quadrant Grid */}
                  <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                    <div className="border-r border-b border-border/30 flex items-center justify-center">
                      <span className="text-xs text-muted-foreground/50">Explorers</span>
                    </div>
                    <div className="border-b border-border/30 flex items-center justify-center">
                      <span className="text-xs text-primary/70 font-medium">AI Leaders</span>
                    </div>
                    <div className="border-r border-border/30 flex items-center justify-center">
                      <span className="text-xs text-destructive/70 font-medium">Laggards</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-xs text-muted-foreground/50">Followers</span>
                    </div>
                  </div>
                  
                  {/* Your Position Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: "spring" }}
                    className="absolute bottom-6 left-8 w-4 h-4 bg-destructive rounded-full glow-red"
                  />
                  
                  {/* Leader Premium */}
                  <div className="absolute top-4 right-4 text-right">
                    <span className="text-xs text-muted-foreground">Leaders Premium:</span>
                    <span className="block text-lg font-bold text-primary">
                      {companyData?.evMultiplePremium.toFixed(1)}x EV/EBITDA
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <Button
                  size="lg"
                  onClick={handleContinue}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold glow-cyan px-8 py-6 text-lg"
                >
                  Unlock 90-Day Recovery Plan →
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
