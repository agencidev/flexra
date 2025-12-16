"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useBuilder } from "./BuilderContext";

const steps = [
  { number: 1, label: "System" },
  { number: 2, label: "Mål" },
  { number: 3, label: "Resultat" },
];

export function StepIndicator() {
  const { currentStep, goToStep } = useBuilder();

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.number;
        const isCurrent = currentStep === step.number;
        const isClickable = step.number < currentStep;

        return (
          <div key={step.number} className="flex items-center">
            {/* Step circle */}
            <button
              onClick={() => isClickable && goToStep(step.number)}
              disabled={!isClickable}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-full transition-all
                ${isClickable ? "cursor-pointer hover:bg-gray-100" : "cursor-default"}
                ${isCurrent ? "bg-gray-900 text-white" : ""}
                ${isCompleted ? "text-gray-700" : ""}
                ${!isCurrent && !isCompleted ? "text-gray-400" : ""}
              `}
            >
              <motion.div
                className={`
                  w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
                  ${isCurrent ? "bg-white text-gray-900" : ""}
                  ${isCompleted ? "bg-lime-100 text-lime-700" : ""}
                  ${!isCurrent && !isCompleted ? "bg-gray-100 text-gray-400" : ""}
                `}
                animate={isCompleted ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                ) : (
                  step.number
                )}
              </motion.div>
              <span className="hidden sm:inline text-sm font-medium">
                {step.label}
              </span>
            </button>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="w-8 md:w-12 h-px mx-1 md:mx-2">
                <motion.div
                  className="h-full bg-gray-200"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isCompleted ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    transformOrigin: "left",
                    backgroundColor: isCompleted ? "#84cc16" : "#e5e7eb"
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
