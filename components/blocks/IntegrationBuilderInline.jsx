"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  ShoppingCart,
  PiggyBank,
  Users,
  BarChart3,
  Headphones,
  FolderKanban,
} from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";

// Återanvänd befintliga komponenter
import { SystemCard } from "./IntegrationBuilder/SystemCard";
import { FlowNode } from "./IntegrationBuilder/FlowNode";
import { GetStartedButton } from "../ui/get-started-button";
import { Button } from "../ui/button";

// Återanvänd befintlig data
import {
  systems,
  automationGoals,
  getSystemById,
  getGoalById,
  getOutputSystems,
} from "../../lib/integration-builder/data";

// ====== VERKSAMHETSOMRÅDEN - Lätt att utöka ======
const businessAreas = [
  {
    id: "procurement",
    title: "Inköp",
    description: "Automatisera inköpsprocesser och leverantörshantering",
    icon: ShoppingCart,
    color: "#fce7f3",
    goals: ["purchase-orders", "supplier-management", "inventory-alerts"],
  },
  {
    id: "finance",
    title: "Ekonomi",
    description: "Effektivisera fakturering, bokföring och rapporter",
    icon: PiggyBank,
    color: "#fef9c3",
    goals: ["auto-invoicing", "budget-tracking", "report-generation"],
  },
  {
    id: "sales",
    title: "Sälj & CRM",
    description: "Hantera leads, kontakter och säljprocesser",
    icon: Users,
    color: "#ecfccb",
    goals: ["sync-contacts", "lead-notifications", "task-automation"],
  },
  {
    id: "management",
    title: "Ledning",
    description: "Dashboards, KPI:er och teamanalys",
    icon: BarChart3,
    color: "#e0e7ff",
    goals: ["executive-dashboard", "team-analytics", "report-generation"],
  },
  {
    id: "support",
    title: "Kundservice",
    description: "Automatisera support och kundkommunikation",
    icon: Headphones,
    color: "#cffafe", // cyan-100
    goals: ["customer-support", "workflow-triggers"],
  },
  {
    id: "projects",
    title: "Projekt",
    description: "Uppgiftshantering och arbetsflöden",
    icon: FolderKanban,
    color: "#ffedd5", // orange-100 (peach)
    goals: ["task-automation", "workflow-triggers", "data-backup"],
  },
];

// Input styling - font-sans för både value och placeholder
const inputStyles = `
  w-full px-4 py-3 rounded-xl border border-gray-200
  focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200
  transition-colors bg-white text-gray-900
  font-sans text-base placeholder:text-gray-400 placeholder:font-sans
`;

export function IntegrationBuilderInline({
  title = "Bygg din automation",
  subtitle = "Välj verksamhetsområde och se hur vi automatiserar era processer",
  badge = "Automationsbyggare",
  turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  onSubmit,
}) {
  // State
  const [step, setStep] = useState(1);
  const [selectedAreaId, setSelectedAreaId] = useState(null);
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const [selectedSystemId, setSelectedSystemId] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [turnstileToken, setTurnstileToken] = useState(null);
  const turnstileRef = useRef(null);

  // Derived state
  const selectedArea = businessAreas.find((a) => a.id === selectedAreaId);
  const selectedGoal = selectedGoalId ? getGoalById(selectedGoalId) : null;
  const selectedSystem = selectedSystemId ? getSystemById(selectedSystemId) : null;

  // Get goals for selected area
  const availableGoals = selectedArea
    ? selectedArea.goals.map((gid) => getGoalById(gid)).filter(Boolean)
    : [];

  // Get systems that support the selected goal
  const availableSystems = selectedGoalId
    ? systems.filter((s) => s.supportedGoals?.includes(selectedGoalId)).slice(0, 12)
    : [];

  // Get output systems for visualization
  const outputSystems = selectedGoalId
    ? getOutputSystems(selectedGoalId)
        .filter((s) => s.id !== selectedSystemId)
        .slice(0, 3)
    : [];

  // Handlers
  const selectArea = (id) => {
    setSelectedAreaId(id);
    setSelectedGoalId(null);
    setSelectedSystemId(null);
    setStep(2);
  };

  const selectGoal = (id) => {
    setSelectedGoalId(id);
    setSelectedSystemId(null);
    setStep(3);
  };

  const selectSystem = (id) => {
    setSelectedSystemId(id);
    setStep(4);
  };

  const goBack = () => {
    if (step === 2) {
      setSelectedAreaId(null);
      setStep(1);
    } else if (step === 3) {
      setSelectedGoalId(null);
      setStep(2);
    } else if (step === 4) {
      setSelectedSystemId(null);
      setStep(3);
    }
  };

  const reset = () => {
    setStep(1);
    setSelectedAreaId(null);
    setSelectedGoalId(null);
    setSelectedSystemId(null);
    setFormData({});
    setErrors({});
    setStatus("idle");
    setTurnstileToken(null);
    turnstileRef.current?.reset();
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name?.trim()) newErrors.name = "Namn krävs";
    if (!formData.email?.trim()) newErrors.email = "E-post krävs";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ange en giltig e-post";
    }
    if (turnstileSiteKey && !turnstileToken) {
      newErrors.turnstile = "Verifiera att du inte är en robot";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setStatus("loading");

    try {
      if (turnstileSiteKey && turnstileToken) {
        const verifyRes = await fetch("/api/turnstile/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: turnstileToken }),
        });
        if (!(await verifyRes.json()).success) {
          setErrors({ turnstile: "Verifiering misslyckades" });
          setStatus("idle");
          turnstileRef.current?.reset();
          return;
        }
      }

      if (onSubmit) {
        await onSubmit({
          ...formData,
          area: selectedArea,
          goal: selectedGoal,
          system: selectedSystem,
        });
      } else {
        await new Promise((r) => setTimeout(r, 1000));
        console.log("Builder submit:", { formData, selectedArea, selectedGoal, selectedSystem });
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  // Pastellfärger för mål
  const goalColors = ["#fce7f3", "#fef9c3", "#ecfccb", "#e0e7ff"];

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-[#f8f8f6]">
      <div className="container max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium font-sans rounded-full bg-white text-gray-600 border border-gray-200 mb-6 uppercase tracking-[0.2em]"
          >
            <Sparkles className="w-3 h-3" />
            {badge}
          </motion.span>
          <h2 className="mb-3">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-sans">{subtitle}</p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s <= step ? "bg-gray-900 w-8" : "bg-gray-200 w-4"
              }`}
            />
          ))}
        </div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 md:p-10 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08)] border border-gray-100"
        >
          <AnimatePresence mode="wait">
            {/* STEP 1: Select Business Area */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h5 className="mb-6 text-gray-900 text-center">
                  Välj verksamhetsområde
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {businessAreas.map((area, index) => {
                    const Icon = area.icon;
                    return (
                      <motion.button
                        key={area.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => selectArea(area.id)}
                        className="flex flex-col items-start p-6 rounded-2xl text-left hover:shadow-lg transition-all hover:scale-[1.02]"
                        style={{ backgroundColor: area.color }}
                      >
                        <div className="w-12 h-12 rounded-xl bg-white/60 flex items-center justify-center mb-4">
                          <Icon className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
                        </div>
                        <h6 className="mb-1 text-gray-900">{area.title}</h6>
                        <p className="text-gray-600 text-sm font-sans">{area.description}</p>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 2: Select Goal */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Button variant="ghost" size="sm" onClick={goBack} className="gap-1">
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <h5 className="text-gray-900">
                    {selectedArea?.title}: Vad vill du automatisera?
                  </h5>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableGoals.map((goal, index) => (
                    <motion.button
                      key={goal.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => selectGoal(goal.id)}
                      className="flex flex-col items-start p-5 rounded-2xl text-left hover:shadow-lg transition-all hover:scale-[1.02] border border-gray-100"
                      style={{ backgroundColor: goalColors[index % goalColors.length] }}
                    >
                      <h6 className="mb-1 text-gray-900">{goal.title}</h6>
                      <p className="text-gray-600 text-sm font-sans">{goal.description}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3: Select System */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Button variant="ghost" size="sm" onClick={goBack} className="gap-1">
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <h5 className="text-gray-900">Välj ditt system</h5>
                </div>
                <p className="text-gray-600 text-sm mb-6 font-sans">
                  Vilket system vill du koppla till för {selectedGoal?.title?.toLowerCase()}?
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {availableSystems.map((system, index) => (
                    <motion.div
                      key={system.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <SystemCard
                        system={system}
                        isSelected={selectedSystemId === system.id}
                        onClick={() => selectSystem(system.id)}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 4: Visualization + Contact Form */}
            {step === 4 && status !== "success" && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {/* Flow Visualization */}
                <div className="mb-8">
                  <h5 className="text-gray-900 text-center mb-6">Din automation</h5>
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 py-6">
                    <FlowNode system={selectedSystem} delay={0} />
                    <ArrowRight className="w-6 h-6 text-gray-300 rotate-90 md:rotate-0" />
                    <FlowNode isCenter delay={0.1} />
                    <ArrowRight className="w-6 h-6 text-gray-300 rotate-90 md:rotate-0" />
                    <div className="flex gap-3">
                      {outputSystems.map((sys, i) => (
                        <FlowNode key={sys.id} system={sys} delay={0.2 + i * 0.1} size="small" />
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="flex flex-wrap justify-center gap-3 mt-4">
                    {selectedGoal?.benefits?.map((b, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-lime-50 text-lime-700 text-sm font-sans"
                      >
                        <Check className="w-4 h-4" /> {b}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Mini Contact Form */}
                <div className="border-t border-gray-100 pt-8 mt-8">
                  <h5 className="mb-6 text-gray-900">Intresserad? Få mer info</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">
                        Namn <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name || ""}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Ditt namn"
                        className={`${inputStyles} ${errors.name ? "border-red-300" : ""}`}
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-600 font-sans">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">
                        E-post <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email || ""}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="din@email.se"
                        className={`${inputStyles} ${errors.email ? "border-red-300" : ""}`}
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600 font-sans">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">
                      Företag
                    </label>
                    <input
                      type="text"
                      value={formData.company || ""}
                      onChange={(e) => handleChange("company", e.target.value)}
                      placeholder="Ditt företag (valfritt)"
                      className={inputStyles}
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">
                      Meddelande
                    </label>
                    <textarea
                      value={formData.message || ""}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Berätta mer om era behov..."
                      rows={3}
                      className={`${inputStyles} resize-none`}
                    />
                  </div>

                  {turnstileSiteKey && (
                    <div className="mt-4 flex flex-col items-center">
                      <Turnstile
                        ref={turnstileRef}
                        siteKey={turnstileSiteKey}
                        onSuccess={setTurnstileToken}
                        onError={() => setTurnstileToken(null)}
                        onExpire={() => setTurnstileToken(null)}
                        options={{ theme: "light", language: "sv" }}
                      />
                      {errors.turnstile && (
                        <p className="mt-2 text-sm text-red-600 font-sans">{errors.turnstile}</p>
                      )}
                    </div>
                  )}

                  <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <Button variant="ghost" onClick={reset} className="gap-2">
                      <ArrowLeft className="w-4 h-4" /> Börja om
                    </Button>
                    <GetStartedButton
                      dark
                      onClick={handleSubmit}
                      loading={status === "loading"}
                      loadingText="Aktiverar..."
                    >
                      Aktivera automationen
                    </GetStartedButton>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SUCCESS State */}
            {status === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 rounded-full bg-lime-100 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-lime-700" />
                </div>
                <h3 className="mb-3">Tack!</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto font-sans">
                  Vi kontaktar dig inom 24 timmar angående {selectedGoal?.title?.toLowerCase()} med{" "}
                  {selectedSystem?.name}.
                </p>
                <Button variant="outline" onClick={reset}>
                  Bygg en ny automation
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default IntegrationBuilderInline;
