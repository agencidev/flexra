"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Brain } from "lucide-react";

export function FlowNode({
  system,
  isCenter = false,
  delay = 0,
  size = "normal" // "normal" | "small"
}) {
  const sizeClasses = size === "small"
    ? "w-14 h-14 md:w-16 md:h-16"
    : "w-16 h-16 md:w-20 md:h-20";

  const logoSize = size === "small" ? 28 : 40;
  const textSize = size === "small" ? "text-xs" : "text-sm";

  if (isCenter) {
    // Flexra AI nod i mitten
    return (
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay, duration: 0.4, type: "spring" }}
        className="flex flex-col items-center gap-2"
      >
        <motion.div
          className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center shadow-xl"
          animate={{
            boxShadow: [
              "0 0 20px rgba(0,0,0,0.2)",
              "0 0 40px rgba(0,0,0,0.3)",
              "0 0 20px rgba(0,0,0,0.2)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Brain className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={1.5} />
        </motion.div>
        <span className="text-sm font-medium text-gray-700">Flexra AI</span>
      </motion.div>
    );
  }

  // System nod
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="flex flex-col items-center gap-2"
    >
      <div className={`${sizeClasses} rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-md`}>
        <Image
          src={system.logo}
          alt={system.name}
          width={logoSize}
          height={logoSize}
          className="object-contain"
        />
      </div>
      <span className={`${textSize} font-medium text-gray-700`}>{system.name}</span>
    </motion.div>
  );
}
