/*
 * Header Component - BlueAlly AI Portal
 * Fixed navigation with progress indicator, theme toggle, and clear CTA
 * Optimized for mobile with hamburger menu and responsive design
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Sun, Moon, HelpCircle, Menu, X, ChevronRight } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Calculate ROI based on progress - starts at $0 and builds up
  const maxROI = companyData ? Math.round(companyData.annualBleed * 0.435) : 0;
  const displayROI = totalROI > 0 ? totalROI : Math.round(maxROI * (currentStep / 7) * 10) / 10;

  const handleBookCall = () => {
    setMobileMenuOpen(false);
    const ctaSection = document.getElementById('final-cta');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToStep = (stepIndex: number) => {
    setMobileMenuOpen(false);
    const stepSections = document.querySelectorAll('section');
    if (stepSections[stepIndex]) {
      stepSections[stepIndex].scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50">
        {/* Progress Bar */}
        <div className="h-1 bg-muted relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary to-primary/80"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

        <div className="container flex items-center justify-between h-14 md:h-16 px-4">
          {/* Logo - switches based on theme */}
          <div className="flex items-center gap-2">
            <img 
              src={isDark ? "/images/blueally-logo-light.png" : "/images/blueally-logo-dark.png"}
              alt="BlueAlly"
              className="h-6 md:h-7 w-auto"
            />
            <span className="text-xs font-medium text-primary hidden sm:inline bg-primary/10 px-2 py-0.5 rounded">AI</span>
          </div>

          {/* Step Indicator - Desktop Only */}
          <div className="hidden lg:flex items-center gap-1">
            {stepLabels.map((label, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <button 
                    onClick={() => scrollToStep(index)}
                    className={`flex items-center cursor-pointer ${index < stepLabels.length - 1 ? 'pr-1' : ''}`}
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
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Step {index + 1}: {label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* Right side: Theme toggle + CTA + Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* ROI Display - Desktop only */}
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

            {/* Primary CTA - Desktop */}
            <Button 
              size="default"
              onClick={handleBookCall}
              className="hidden sm:flex bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Strategy Call
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 sm:hidden"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-background z-50 sm:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Menu Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <img 
                      src={isDark ? "/images/blueally-logo-light.png" : "/images/blueally-logo-dark.png"}
                      alt="BlueAlly"
                      className="h-6 w-auto"
                    />
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">AI</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5 text-foreground" />
                  </button>
                </div>

                {/* ROI Display - Mobile */}
                {displayROI > 0 && (
                  <div className="p-4 bg-primary/5 border-b border-border">
                    <div className="text-sm text-muted-foreground mb-1">Your Estimated ROI</div>
                    <div className="text-2xl font-bold text-primary">${displayROI.toFixed(1)}M</div>
                    <div className="text-xs text-muted-foreground mt-1">5-year projected savings</div>
                  </div>
                )}

                {/* Step Navigation */}
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Your Progress
                  </div>
                  <div className="space-y-1">
                    {stepLabels.map((label, index) => (
                      <button
                        key={index}
                        onClick={() => scrollToStep(index)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                          index === currentStep 
                            ? 'bg-primary/10 text-primary' 
                            : index < currentStep 
                              ? 'text-foreground hover:bg-muted' 
                              : 'text-muted-foreground hover:bg-muted'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                          index <= currentStep 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {index + 1}
                        </div>
                        <span className="flex-1 text-left text-sm font-medium">{label}</span>
                        {index === currentStep && (
                          <ChevronRight className="w-4 h-4 text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile CTA */}
                <div className="p-4 border-t border-border bg-muted/30">
                  <Button 
                    size="lg"
                    onClick={handleBookCall}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Strategy Call
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    30-minute call • No commitment
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
