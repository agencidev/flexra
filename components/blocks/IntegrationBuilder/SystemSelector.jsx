"use client";

import { motion } from "framer-motion";
import { SystemCard } from "./SystemCard";
import { useBuilder } from "./BuilderContext";
import { getSystemsByCategory, categoryLabels } from "../../../lib/integration-builder/data";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export function SystemSelector() {
  const { selectSystem, selectedSystem } = useBuilder();
  const systemsByCategory = getSystemsByCategory();

  // Ordning för kategorier
  const categoryOrder = [
    "accounting",
    "payments",
    "crm",
    "communication",
    "storage",
    "scheduling",
    "project-management",
    "support",
    "other",
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="mb-2">Vilket system använder ni?</h3>
        <p className="text-gray-600">
          Välj det system ni vill koppla ihop med andra verktyg
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {categoryOrder.map((category) => {
          const systems = systemsByCategory[category];
          if (!systems || systems.length === 0) return null;

          return (
            <motion.div key={category} variants={item}>
              <h6 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                {categoryLabels[category]}
              </h6>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {systems.map((system) => (
                  <motion.div key={system.id} variants={item}>
                    <SystemCard
                      system={system}
                      isSelected={selectedSystem?.id === system.id}
                      onClick={() => selectSystem(system.id)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
