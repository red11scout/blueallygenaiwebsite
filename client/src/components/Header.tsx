/*
 * Header Component - Financial Surgeon's Theater
 * Fixed navigation with progress indicator, theme toggle, and primary CTA
 * ROI counter starts at $0 and builds up as user progresses through steps
 */

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useState } from "react";
import type { CompanyData } from "@/pages/Home";

interface HeaderProps {
  scrollProgress: number;
  currentStep: number;
  companyData: CompanyData | null;
}

const stepLabels = [
  "Diagnostic",
  "Financial Impact",
  "Friction Points",
  "Workflow Analysis",
  "KPI Forge",
  "BlueAlly Oracle",
  "Financial Projection",
  "Transformation"
];

// ROI accumulates as user progresses through steps
// Each step reveals more potential savings
const getROIForStep = (step: number, companyData: CompanyData | null): number => {
  const baseROI = companyData ? companyData.annualBleed * 0.435 : 18.7;
  
  // ROI builds up progressively through steps
  const roiByStep: Record<number, number> = {
    0: 0,           // Start at $0
    1: baseROI * 0.15,  // After diagnostic: 15%
    2: baseROI * 0.30,  // After financial detonator: 30%
    3: baseROI * 0.45,  // After friction points: 45%
    4: baseROI * 0.60,  // After workflow autopsy: 60%
    5: baseROI * 0.75,  // After KPI forge: 75%
    6: baseROI * 0.90,  // After priority oracle: 90%
    7: baseROI,         // Full ROI revealed
  };
  
  return roiByStep[step] || 0;
};

export default function Header({ scrollProgress, currentStep, companyData }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [displayROI, setDisplayROI] = useState(0);
  
  // Animate ROI counter when step changes
  useEffect(() => {
    const targetROI = getROIForStep(currentStep, companyData);
    
    // Animate from current value to target
    const controls = animate(displayROI, targetROI, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate: (value) => setDisplayROI(value)
    });
    
    return () => controls.stop();
  }, [currentStep, companyData]);

  // Format ROI display
  const formatROI = (value: number): string => {
    if (value === 0) return "$0";
    if (value < 1) return `$${(value * 1000).toFixed(0)}K`;
    return `$${value.toFixed(1)}M`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      {/* Progress Bar */}
      <div className="h-1 bg-muted relative overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary to-cyan-400"
          style={{ width: `${scrollProgress * 100}%` }}
        />
        <motion.div
          className="absolute inset-y-0 left-0 bg-primary/50 blur-sm"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img 
            src={theme === 'dark' ? '/images/blueally-logo-light.png' : '/images/blueally-logo-dark.png'}
            alt="BlueAlly"
            className="h-8 w-auto"
          />
          <span className="text-sm text-muted-foreground font-medium">AI</span>
        </div>

        {/* Step Indicator - Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {stepLabels.map((label, index) => (
            <div 
              key={index}
              className={`flex items-center ${index < stepLabels.length - 1 ? 'pr-1' : ''}`}
            >
              <div 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index <= currentStep 
                    ? 'bg-primary glow-cyan' 
                    : 'bg-muted-foreground/30'
                }`}
              />
              {index < stepLabels.length - 1 && (
                <div 
                  className={`w-6 h-0.5 transition-all duration-300 ${
                    index < currentStep 
                      ? 'bg-primary' 
                      : 'bg-muted-foreground/20'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Current Step Label - Mobile */}
        <div className="lg:hidden text-sm text-muted-foreground">
          <span className="text-primary font-medium">{currentStep + 1}</span>
          <span className="mx-1">/</span>
          <span>8</span>
          <span className="ml-2 text-foreground">{stepLabels[currentStep]}</span>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-muted-foreground hover:text-foreground"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>

          {/* Primary CTA with animated ROI counter */}
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold glow-cyan group relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            <Zap className="w-4 h-4 mr-2 group-hover:animate-pulse" />
            <span className="hidden sm:inline">
              Lock in {formatROI(displayROI)} ROI
            </span>
            <span className="sm:hidden">Book Now</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
