"use client";

import { motion } from "framer-motion";
import {
  Users,
  Receipt,
  Bell,
  CheckSquare,
  BarChart3,
  HeadphonesIcon,
  Workflow,
  Database,
  ShoppingCart,
  Truck,
  Package,
  LayoutDashboard,
  PiggyBank,
  TrendingUp,
} from "lucide-react";

// Mappa ikon-namn till komponenter
const iconMap = {
  Users,
  Receipt,
  Bell,
  CheckSquare,
  BarChart3,
  HeadphonesIcon,
  Workflow,
  Database,
  ShoppingCart,
  Truck,
  Package,
  LayoutDashboard,
  PiggyBank,
  TrendingUp,
};

// Pastellfärger för mål
const goalColors = [
  "#fce7f3", // rosa
  "#fef9c3", // gul
  "#ecfccb", // lime
  "#e0f2fe", // ljusblå
  "#f3e8ff", // lila
  "#fef3c7", // amber
];

export function GoalCard({ goal, index, isSelected, onClick }) {
  const IconComponent = iconMap[goal.icon] || CheckSquare;
  const bgColor = goalColors[index % goalColors.length];

  return (
    <motion.button
      onClick={onClick}
      className={`
        group flex flex-col items-start text-left p-6 rounded-2xl
        transition-all duration-200 cursor-pointer w-full
        ${isSelected
          ? "ring-2 ring-gray-900 ring-offset-2"
          : "hover:shadow-lg"
        }
      `}
      style={{ backgroundColor: bgColor }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center mb-4">
        <IconComponent className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
      </div>
      <h5 className="mb-2">{goal.title}</h5>
      <p className="text-gray-600 text-sm leading-relaxed">
        {goal.description}
      </p>
    </motion.button>
  );
}
