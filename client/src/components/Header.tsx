/*
 * Header Component - BlueAlly AI Portal
 * Fixed navigation with progress indicator, theme toggle, and clear CTA
 */

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Sun, Moon, HelpCircle } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { CompanyData } from "@/pages/Home";

interface HeaderProps {
  scrollProgress: number;
  currentStep: number;
  companyData: CompanyData | null;
  totalROI?: number;
}

const stepLabels = [
  "Company Analysis",
  "Financial Impact",
  "Pain Points",
  "Workflow Review",
  "ROI Calculator",
  "Priorities",
  "Projections",
  "Summary"
];

export default function Header({ scrollProgress, currentStep, companyData, totalROI = 0 }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  
  // Calculate ROI based on progress - starts at $0 and builds up
  const maxROI = companyData ? Math.round(companyData.annualBleed * 0.435) : 0;
  const displayROI = totalROI > 0 ? totalROI : Math.round(maxROI * (currentStep / 7) * 10) / 10;

  const handleBookCall = () => {
    // Scroll to the final CTA section or open booking modal
    const ctaSection = document.getElementById('final-cta');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      {/* Progress Bar */}
      <div className="h-1 bg-muted relative overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary to-primary/80"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <div className="container flex items-center justify-between h-16">
        {/* Logo - switches based on theme */}
        <div className="flex items-center gap-2">
          <img 
            src={isDark ? "/images/blueally-logo-light.png" : "/images/blueally-logo-dark.png"}
            alt="BlueAlly"
            className="h-7 w-auto"
          />
          <span className="text-xs font-medium text-primary hidden sm:inline bg-primary/10 px-2 py-0.5 rounded">AI</span>
        </div>

        {/* Step Indicator - Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {stepLabels.map((label, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div 
                  className={`flex items-center cursor-default ${index < stepLabels.length - 1 ? 'pr-1' : ''}`}
                >
                  <div 
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index <= currentStep 
                        ? 'bg-primary' 
                        : 'bg-muted-foreground/30'
                    }`}
                  />
                  {index < stepLabels.length - 1 && (
                    <div 
                      className={`w-8 h-0.5 transition-all duration-300 ${
                        index < currentStep 
                          ? 'bg-primary' 
                          : 'bg-muted-foreground/20'
                      }`}
                    />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Step {index + 1}: {label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Current Step Label - Mobile */}
        <div className="lg:hidden text-sm text-muted-foreground">
          <span className="text-primary font-semibold">{currentStep + 1}</span>
          <span className="mx-1 text-muted-foreground/50">/</span>
          <span className="text-muted-foreground/70">8</span>
          <span className="ml-2 text-foreground font-medium">{stepLabels[currentStep]}</span>
        </div>

        {/* Right side: Theme toggle + CTA */}
        <div className="flex items-center gap-2">
          {/* ROI Display (when available) */}
          {displayROI > 0 && (
            <div className="hidden md:flex items-center gap-1 text-sm mr-2">
              <span className="text-muted-foreground">Your ROI:</span>
              <span className="font-bold text-primary">${displayROI.toFixed(1)}M</span>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>This is your estimated 5-year ROI based on your inputs. Complete all steps for a detailed breakdown.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
            ) : (
              <Moon className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
            )}
          </button>

          {/* Primary CTA - Clear action */}
          <Button 
            size="default"
            onClick={handleBookCall}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            <Calendar className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Book Strategy Call</span>
            <span className="sm:hidden">Book Call</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
