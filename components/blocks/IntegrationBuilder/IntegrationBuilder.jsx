"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { BuilderProvider, useBuilder } from "./BuilderContext";
import { StepIndicator } from "./StepIndicator";
import { SystemSelector } from "./SystemSelector";
import { GoalSelector } from "./GoalSelector";
import { FlowVisualization } from "./FlowVisualization";

function BuilderContent({ onClose }) {
  const { currentStep } = useBuilder();

  return (
    <div className="relative">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 pb-6 mb-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-medium">
            Bygg din integration
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Stäng"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <StepIndicator />
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === 1 && <SystemSelector />}
          {currentStep === 2 && <GoalSelector />}
          {currentStep === 3 && <FlowVisualization />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function IntegrationBuilder({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-4 md:inset-8 lg:inset-12 xl:inset-20 bg-white rounded-3xl z-50 overflow-hidden shadow-2xl"
          >
            <div className="h-full overflow-y-auto p-6 md:p-8 lg:p-10">
              <BuilderProvider>
                <BuilderContent onClose={onClose} />
              </BuilderProvider>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Hook för att enkelt använda i andra komponenter
export function useIntegrationBuilder() {
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((prev) => !prev),
  };
}
