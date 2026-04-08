"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";

export default function SoulSearching() {
  const [step, setStep] = useState(0);

  const handleNext = (nextStep: number) => {
    if (step < nextStep) setStep(nextStep);
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-12 bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm p-1 not-prose">
      {/* Step 0 -> Step 1: Q1 */}
      <div 
        className={`p-6 cursor-pointer transition-colors ${step === 0 ? 'hover:bg-white/5' : ''} rounded-lg ${step > 0 ? 'opacity-50 grayscale' : ''}`}
        onClick={() => handleNext(1)}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg md:text-xl font-bold text-accent-cyan flex items-center gap-3">
            <span className="font-mono text-xs bg-accent-cyan/20 px-2 py-1 rounded text-accent-cyan">Q1</span>
            你是不是只想不勞而獲求片資源？
          </h3>
          <motion.div
            animate={{ rotate: step >= 1 ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-text-muted shrink-0 ml-4"
          >
            <ChevronDown />
          </motion.div>
        </div>
      </div>

      {/* Step 1 -> Step 2: Q2 */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="overflow-hidden border-t border-white/10"
          >
            <div 
              className={`p-6 cursor-pointer transition-colors ${step === 1 ? 'hover:bg-white/5' : ''} rounded-lg ${step > 1 ? 'opacity-50 grayscale' : ''}`}
              onClick={() => handleNext(2)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg md:text-xl font-bold text-accent-orange flex items-center gap-3">
                  <span className="font-mono text-xs bg-accent-orange/20 px-2 py-1 rounded text-accent-orange">Q2</span>
                  你能理解翻譯背後付出的時間成本與磨練嗎？
                </h3>
                <motion.div
                  animate={{ rotate: step >= 2 ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-text-muted shrink-0 ml-4"
                >
                  <ChevronDown />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 2: Conclusion */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -20 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="overflow-hidden border-t border-white/10 bg-black/20"
          >
            <div className="p-8 text-center flex flex-col items-center">
              <h4 className="text-xl md:text-2xl font-bold text-text-title mb-8 leading-relaxed">
                既然你明白了這份重量。<br className="hidden md:block" />
                歡迎來到我的創作空間，與我深入交流。
              </h4>
              
              <a 
                href="https://portaly.cc/AdultArtist" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent-cyan text-base-dark font-bold font-mono rounded hover:bg-accent-cyan/90 transition-all hover:scale-105 active:scale-95 text-lg w-full md:w-auto"
              >
                // 前往我的 Portaly
                <ExternalLink size={20} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
