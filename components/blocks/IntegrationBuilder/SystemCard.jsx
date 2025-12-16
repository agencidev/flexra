"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function SystemCard({ system, isSelected, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        group flex flex-col items-center gap-3 p-4 rounded-2xl
        transition-all duration-200 cursor-pointer
        ${isSelected
          ? "bg-gray-900 ring-2 ring-gray-900 ring-offset-2"
          : "bg-white border border-gray-100 hover:shadow-lg hover:border-gray-200"
        }
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`
        w-12 h-12 rounded-xl flex items-center justify-center
        ${isSelected ? "bg-white" : "bg-gray-50 group-hover:bg-gray-100"}
        transition-colors
      `}>
        <Image
          src={system.logo}
          alt={system.name}
          width={32}
          height={32}
          className="w-8 h-8 object-contain"
        />
      </div>
      <span className={`
        text-sm font-medium
        ${isSelected ? "text-white" : "text-gray-700"}
      `}>
        {system.name}
      </span>
    </motion.button>
  );
}
