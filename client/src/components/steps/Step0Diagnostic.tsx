/*
 * Step 0: The Diagnostic - AI-Powered Company Research
 * 
 * Entry: Single input [Company.com]. Auto-submit on .com entry.
 * Uses real AI to research the company and provide actual financial insights.
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, TrendingDown, TrendingUp, AlertTriangle, Building2, Users, DollarSign, Info } from "lucide-react";
import { trpc } from "@/lib/trpc";
import type { CompanyData } from "@/pages/Home";

interface Step0DiagnosticProps {
  onComplete: (data: CompanyData) => void;
}

export default function Step0Diagnostic({ onComplete }: Step0DiagnosticProps) {
  const [domain, setDomain] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisPhase, setAnalysisPhase] = useState(0);
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const analysisPhases = [
    "Researching company profile...",
    "Analyzing financial data...",
    "Scanning competitive landscape...",
    "Calculating AI opportunity...",
    "Generating conservative estimates..."
  ];

  // Company research mutation
  const researchMutation = trpc.company.research.useMutation({
    onSuccess: (data) => {
      // Transform API response to CompanyData format
      const transformedData: CompanyData = {
        domain: data.domain,
        companyName: data.companyName,
        sgaPercent: data.sgaPercent * 100, // Convert to percentage
        industryAvgSga: data.industryAvgSga * 100,
        annualBleed: Math.round(data.aiOpportunity.conservativeTarget / 1000000), // Convert to millions
        competitor: data.competitors[0]?.name || "Industry Leader",
        competitorStockChange: data.competitors[0]?.aiMaturity === 'leader' ? 8.5 : 4.2,
        yourStockChange: -2.3,
        evMultiplePremium: 3.2,
        // Extended data from AI research
        revenue: data.revenue,
        employees: data.employees,
        industry: data.industry,
        subIndustry: data.subIndustry,
        revenueSource: data.revenueSource,
        employeesSource: data.employeesSource,
        aiOpportunity: {
          conservativeTarget: data.aiOpportunity.conservativeTarget,
          moderateTarget: data.aiOpportunity.conservativeTarget * 1.5, // Derive from conservative
          aggressiveTarget: data.aiOpportunity.conservativeTarget * 2.2, // Derive from conservative
          topProcesses: data.aiOpportunity.topProcesses,
        },
        fiveYearProjection: data.fiveYearProjection,
        dataQuality: {
          overallConfidence: data.dataQuality.overallConfidence,
          notes: data.dataQuality.estimationNotes || [],
        },
      };
      
      setCompanyData(transformedData);
      setIsAnalyzing(false);
      setShowResults(true);
    },
    onError: (err) => {
      setError(err.message || "Failed to research company. Please try again.");
      setIsAnalyzing(false);
    }
  });

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Auto-submit on .com detection
  useEffect(() => {
    const domainLower = domain.toLowerCase();
    if ((domainLower.endsWith(".com") || domainLower.endsWith(".io") || domainLower.endsWith(".co") || domainLower.endsWith(".net") || domainLower.endsWith(".org")) && !isAnalyzing && !companyData) {
      handleAnalyze();
    }
  }, [domain]);

  // Progress animation during analysis
  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setAnalysisPhase(prev => (prev + 1) % analysisPhases.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isAnalyzing]);

  const handleAnalyze = async () => {
    if (!domain || isAnalyzing) return;
    
    setIsAnalyzing(true);
    setAnalysisPhase(0);
    setError(null);

    // Call the real AI research API
    researchMutation.mutate({ domain });
  };

  const handleContinue = () => {
    if (companyData) {
      onComplete(companyData);
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(1)}B`;
    }
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/images/hero-neural-network.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, oklch(0.5 0.15 240 / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(0.5 0.15 240 / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
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
                  <span className="text-foreground">Discover Your </span>
                  <span className="text-primary">AI Opportunity</span>
                </motion.h1>
                <motion.p 
                  className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Enter your company domain. Our AI will research your organization and calculate conservative ROI estimates.
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
                  className="h-16 text-xl text-center bg-card/50 border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 font-[family-name:var(--font-mono)]"
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
                          {analysisPhases[analysisPhase]}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Error Message */}
              {error && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-destructive"
                >
                  {error}
                </motion.p>
              )}

              {/* Hint */}
              <motion.p 
                className="text-sm text-muted-foreground/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Auto-analyzes when you type .com, .io, .co, .net, or .org
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {/* Company Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Building2 className="w-4 h-4" />
                  <span className="uppercase tracking-wider">AI Research Report</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)]">
                  {companyData?.companyName}
                </h2>
                <p className="text-muted-foreground">
                  {companyData?.industry} • {companyData?.subIndustry}
                </p>
              </motion.div>

              {/* Company Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-3 gap-4"
              >
                <div className="glass-card rounded-xl p-4 border border-border">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-xs uppercase">Revenue</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">
                    {formatCurrency(companyData?.revenue || 0)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {companyData?.revenueSource === 'public' ? 'Public data' : 'Estimated'}
                  </p>
                </div>
                <div className="glass-card rounded-xl p-4 border border-border">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-xs uppercase">Employees</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">
                    {(companyData?.employees || 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {companyData?.employeesSource === 'public' ? 'Public data' : 'Estimated'}
                  </p>
                </div>
                <div className="glass-card rounded-xl p-4 border border-border">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                    <Info className="w-4 h-4" />
                    <span className="text-xs uppercase">Data Quality</span>
                  </div>
                  <p className={`text-xl font-bold ${
                    companyData?.dataQuality?.overallConfidence === 'High' ? 'text-green-500' :
                    companyData?.dataQuality?.overallConfidence === 'Medium' ? 'text-yellow-500' : 'text-orange-500'
                  }`}>
                    {companyData?.dataQuality?.overallConfidence}
                  </p>
                  <p className="text-xs text-muted-foreground">Confidence</p>
                </div>
              </motion.div>

              {/* Main Opportunity Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
                <div className="relative glass-card rounded-2xl p-8 border border-primary/30">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <AlertTriangle className="w-5 h-5 text-primary" />
                    <span className="text-sm text-primary font-medium uppercase tracking-wider">
                      Conservative AI Opportunity
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    Based on your SG&A of <span className="text-foreground font-semibold">{companyData?.sgaPercent?.toFixed(1)}%</span> vs. 
                    Industry Best <span className="text-foreground font-semibold">{(companyData?.industryAvgSga ? companyData.industryAvgSga * 0.75 : 15).toFixed(1)}%</span>
                  </p>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                    className="text-5xl sm:text-7xl font-bold text-primary font-[family-name:var(--font-display)]"
                  >
                    {formatCurrency(companyData?.aiOpportunity?.conservativeTarget || 0)}
                  </motion.div>
                  <p className="text-lg text-muted-foreground mt-2">Annual Savings Potential</p>
                  <p className="text-sm text-muted-foreground/70 mt-1">
                    (Conservative estimate with risk-adjusted assumptions)
                  </p>
                </div>
              </motion.div>

              {/* Top Processes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-foreground">Top AI Automation Opportunities</h3>
                <div className="grid gap-3">
                  {companyData?.aiOpportunity?.topProcesses?.slice(0, 3).map((process: any, index: number) => (
                    <motion.div
                      key={process.process}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="glass-card rounded-lg p-4 border border-border flex items-center justify-between"
                    >
                      <div className="text-left">
                        <p className="font-medium text-foreground">{process.process}</p>
                        <p className="text-sm text-muted-foreground">{process.rationale}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">{formatCurrency(process.opportunity)}</p>
                        <p className={`text-xs ${
                          process.confidence === 'High' ? 'text-green-500' :
                          process.confidence === 'Medium' ? 'text-yellow-500' : 'text-orange-500'
                        }`}>
                          {process.confidence} confidence
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* 5-Year Projection Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="glass-card rounded-xl p-6 border border-border"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">5-Year ROI Projection</h3>
                <div className="grid grid-cols-5 gap-2 text-center">
                  {['year1', 'year2', 'year3', 'year4', 'year5'].map((year, i) => (
                    <div key={year}>
                      <p className="text-xs text-muted-foreground mb-1">Year {i + 1}</p>
                      <p className="text-sm font-bold text-foreground">
                        {formatCurrency(companyData?.fiveYearProjection?.[year as keyof typeof companyData.fiveYearProjection] || 0)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Total 5-Year ROI</p>
                    <p className="text-2xl font-bold text-primary">
                      {formatCurrency(companyData?.fiveYearProjection?.totalROI || 0)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Payback Period</p>
                    <p className="text-2xl font-bold text-foreground">
                      {companyData?.fiveYearProjection?.paybackMonths || 0} months
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Continue Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <Button 
                  onClick={handleContinue}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold"
                >
                  Explore Detailed Analysis →
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
