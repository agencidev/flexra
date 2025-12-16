"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { GoalCard } from "./GoalCard";
import { useBuilder } from "./BuilderContext";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function GoalSelector() {
  const { availableGoals, selectGoal, selectedGoal, selectedSystem, goToStep } = useBuilder();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <button
          onClick={() => goToStep(1)}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Byt system
        </button>
        <h3 className="mb-2">
          Vad vill ni automatisera med {selectedSystem?.name}?
        </h3>
        <p className="text-gray-600">
          Välj ett mål för att se hur vi kan koppla ihop era system
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {availableGoals.map((goal, index) => (
          <motion.div key={goal.id} variants={item}>
            <GoalCard
              goal={goal}
              index={index}
              isSelected={selectedGoal?.id === goal.id}
              onClick={() => selectGoal(goal.id)}
            />
          </motion.div>
        ))}
      </motion.div>

      {availableGoals.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Inga automationsmål tillgängliga för detta system.
        </div>
      )}
    </div>
  );
}
