/*
 * BLUEALLY AI PORTAL - Financial Surgeon's Theater
 * 
 * Design Philosophy: Clinical precision meets operating theater drama
 * - Dark backgrounds for surgical focus
 * - Cyan (#00E5FF) as BlueAlly's healing intervention
 * - Red for bleeding metrics
 * - ECG-style animations for financial trajectories
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll } from "framer-motion";

// Components
import Header from "@/components/Header";
import Step0Diagnostic from "@/components/steps/Step0Diagnostic";
import Step1FinancialDetonator from "@/components/steps/Step1FinancialDetonator";
import Step2FrictionPoints from "@/components/steps/Step2FrictionPoints";
import Step3WorkflowAutopsy from "@/components/steps/Step3WorkflowAutopsy";
import Step4KPIForge from "@/components/steps/Step4KPIForge";
import Step5PriorityOracle from "@/components/steps/Step5PriorityOracle";
import Step6FinancialWaterfall from "@/components/steps/Step6FinancialWaterfall";
import Step7BeforeAfter from "@/components/steps/Step7BeforeAfter";
import ConversionTriggers from "@/components/ConversionTriggers";
import Footer from "@/components/Footer";

// Types
export interface CompanyData {
  domain: string;
  companyName: string;
  sgaPercent: number;
  industryAvgSga: number;
  annualBleed: number;
  competitor: string;
  competitorStockChange: number;
  yourStockChange: number;
  evMultiplePremium: number;
}

export interface FrictionPoint {
  id: string;
  name: string;
  hoursPerWeek: number;
  costPerMinute: number;
  competitorSolvedWeeks: number;
  failedExperiments: string[];
  genai2Accuracy: number;
}

export interface WorkflowData {
  beforeCost: number;
  afterCost: number;
  savingsPercent: number;
  volumePerMonth: number;
  errorRate: number;
  laborRate: number;
}

export interface UseCase {
  id: string;
  name: string;
  value: number;
  timeToValue: number;
  effort: number;
  successProb: number;
  tokenBurn: number;
}

export default function Home() {
  // State
  const [currentStep, setCurrentStep] = useState(0);
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [selectedFriction, setSelectedFriction] = useState<FrictionPoint | null>(null);
  const [workflowData, setWorkflowData] = useState<WorkflowData | null>(null);
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [email, setEmail] = useState("");
  const [timeOnSite, setTimeOnSite] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const step0Ref = useRef<HTMLElement>(null);
  const step1Ref = useRef<HTMLElement>(null);
  const step2Ref = useRef<HTMLElement>(null);
  const step3Ref = useRef<HTMLElement>(null);
  const step4Ref = useRef<HTMLElement>(null);
  const step5Ref = useRef<HTMLElement>(null);
  const step6Ref = useRef<HTMLElement>(null);
  const step7Ref = useRef<HTMLElement>(null);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Time tracking for conversion triggers
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOnSite(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll progress tracking
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      setScrollProgress(value);
      // Determine current step based on scroll
      const stepIndex = Math.min(Math.floor(value * 8), 7);
      setCurrentStep(stepIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Handler for company diagnostic completion
  const handleDiagnosticComplete = useCallback((data: CompanyData) => {
    setCompanyData(data);
    step1Ref.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Handler for friction point selection
  const handleFrictionSelect = useCallback((friction: FrictionPoint) => {
    setSelectedFriction(friction);
  }, []);

  // Handler for workflow data update
  const handleWorkflowUpdate = useCallback((data: WorkflowData) => {
    setWorkflowData(data);
  }, []);

  // Handler for use case updates
  const handleUseCaseUpdate = useCallback((cases: UseCase[]) => {
    setUseCases(cases);
  }, []);

  // Navigation handlers
  const scrollToStep = useCallback((stepRef: React.RefObject<HTMLElement | null>) => {
    stepRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Fixed Header with Progress */}
      <Header 
        scrollProgress={scrollProgress} 
        currentStep={currentStep}
        companyData={companyData}
      />

      {/* Main Content - Single Page Scroll */}
      <main className="relative">
        {/* Step 0: Diagnostic Assassination */}
        <section ref={step0Ref} className="min-h-screen relative">
          <Step0Diagnostic onComplete={handleDiagnosticComplete} />
        </section>

        {/* Step 1: Four-Driver Financial Detonator */}
        <section ref={step1Ref} className="min-h-screen relative">
          <Step1FinancialDetonator 
            companyData={companyData}
            onNext={() => scrollToStep(step2Ref)}
          />
        </section>

        {/* Step 2: Friction Point Auction */}
        <section ref={step2Ref} className="min-h-screen relative">
          <Step2FrictionPoints 
            companyData={companyData}
            onSelect={handleFrictionSelect}
            onNext={() => scrollToStep(step3Ref)}
          />
        </section>

        {/* Step 3: Workflow Autopsy & Resurrection */}
        <section ref={step3Ref} className="min-h-screen relative">
          <Step3WorkflowAutopsy 
            frictionPoint={selectedFriction}
            onUpdate={handleWorkflowUpdate}
            onNext={() => scrollToStep(step4Ref)}
          />
        </section>

        {/* Step 4: KPI Forge */}
        <section ref={step4Ref} className="min-h-screen relative">
          <Step4KPIForge 
            workflowData={workflowData}
            companyData={companyData}
            onNext={() => scrollToStep(step5Ref)}
          />
        </section>

        {/* Step 5: Priority Oracle & Doomsday Clock */}
        <section ref={step5Ref} className="min-h-screen relative">
          <Step5PriorityOracle 
            useCases={useCases}
            onUpdate={handleUseCaseUpdate}
            onNext={() => scrollToStep(step6Ref)}
          />
        </section>

        {/* Step 6: Financial Waterfall */}
        <section ref={step6Ref} className="min-h-screen relative">
          <Step6FinancialWaterfall 
            workflowData={workflowData}
            useCases={useCases}
            onNext={() => scrollToStep(step7Ref)}
          />
        </section>

        {/* Step 7: Before/After Existential Reckoning */}
        <section ref={step7Ref} className="min-h-screen relative">
          <Step7BeforeAfter 
            companyData={companyData}
            workflowData={workflowData}
          />
        </section>
      </main>

      {/* Conversion Triggers Overlay */}
      <ConversionTriggers 
        timeOnSite={timeOnSite}
        scrollProgress={scrollProgress}
        companyData={companyData}
        email={email}
        onEmailChange={setEmail}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
