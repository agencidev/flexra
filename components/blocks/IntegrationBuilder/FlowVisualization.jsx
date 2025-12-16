"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Check, ArrowRight } from "lucide-react";
import { FlowNode } from "./FlowNode";
import { useBuilder } from "./BuilderContext";
import { GetStartedButton } from "../../ui/get-started-button";

export function FlowVisualization() {
  const { selectedSystem, selectedGoal, outputSystems, goToStep, reset } = useBuilder();

  if (!selectedSystem || !selectedGoal) return null;

  // Begränsa till max 3 output-system för visualisering
  const displayOutputs = outputSystems.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Navigation */}
      <div className="text-center">
        <button
          onClick={() => goToStep(2)}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Byt mål
        </button>
        <h3 className="mb-2">
          Så här kopplar vi ihop {selectedSystem.name}
        </h3>
        <p className="text-gray-600">
          {selectedGoal.title} med automatisk dataflöde
        </p>
      </div>

      {/* Flow Diagram */}
      <div className="relative py-8">
        {/* Desktop Layout - Horisontell */}
        <div className="hidden md:flex items-center justify-center gap-4 lg:gap-8">
          {/* Source System */}
          <FlowNode system={selectedSystem} delay={0} />

          {/* Arrow 1 */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="flex items-center"
          >
            <div className="w-12 lg:w-20 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400" />
            <ArrowRight className="w-5 h-5 text-gray-400 -ml-1" />
          </motion.div>

          {/* Center - Flexra AI */}
          <FlowNode isCenter delay={0.4} />

          {/* Arrow 2 */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
            className="flex items-center"
          >
            <div className="w-12 lg:w-20 h-0.5 bg-gradient-to-r from-gray-400 to-gray-300" />
            <ArrowRight className="w-5 h-5 text-gray-400 -ml-1" />
          </motion.div>

          {/* Output Systems */}
          <div className="flex flex-col gap-3">
            {displayOutputs.map((system, index) => (
              <FlowNode
                key={system.id}
                system={system}
                size="small"
                delay={0.8 + index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Mobile Layout - Vertikal */}
        <div className="flex md:hidden flex-col items-center gap-4">
          {/* Source System */}
          <FlowNode system={selectedSystem} delay={0} />

          {/* Arrow Down */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="w-0.5 h-8 bg-gradient-to-b from-gray-300 to-gray-400" />
            <ArrowRight className="w-5 h-5 text-gray-400 rotate-90 -mt-1" />
          </motion.div>

          {/* Center - Flexra AI */}
          <FlowNode isCenter delay={0.4} />

          {/* Arrow Down */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="w-0.5 h-8 bg-gradient-to-b from-gray-400 to-gray-300" />
            <ArrowRight className="w-5 h-5 text-gray-400 rotate-90 -mt-1" />
          </motion.div>

          {/* Output Systems */}
          <div className="flex gap-4 flex-wrap justify-center">
            {displayOutputs.map((system, index) => (
              <FlowNode
                key={system.id}
                system={system}
                size="small"
                delay={0.8 + index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.4 }}
        className="max-w-md mx-auto"
      >
        <h6 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 text-center">
          Fördelar
        </h6>
        <ul className="space-y-2">
          {selectedGoal.benefits.map((benefit, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 + index * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="w-5 h-5 rounded-full bg-lime-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-lime-700" strokeWidth={3} />
              </div>
              <span className="text-gray-600">{benefit}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.4 }}
        className="flex flex-col items-center gap-4"
      >
        <GetStartedButton dark>
          Boka demo för {selectedGoal.title.toLowerCase()}
        </GetStartedButton>
        <button
          onClick={reset}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Börja om
        </button>
      </motion.div>
    </div>
  );
}
