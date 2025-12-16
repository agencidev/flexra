"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowLeft, CheckCircle, Loader2, Send,
  Rocket, Lightbulb, Calendar, MessageCircle, User, Building2, Sparkles
} from "lucide-react";
import { Button } from "../ui/button";
import { Turnstile } from "@marsidev/react-turnstile";

/**
 * ContactFormWizard
 *
 * Modern steg-för-steg wizard med AI-känsla.
 * Pastellfärger, Lucide-ikoner, subtila animationer.
 */

const topics = [
  {
    id: "project",
    label: "Nytt projekt",
    icon: Rocket,
    color: "#fce7f3", // Rosa
    iconColor: "text-pink-700",
    description: "Starta ett nytt AI- eller automationsprojekt"
  },
  {
    id: "consultation",
    label: "Rådgivning",
    icon: Lightbulb,
    color: "#fef9c3", // Gul
    iconColor: "text-yellow-700",
    description: "Utforska möjligheter och få expertråd"
  },
  {
    id: "demo",
    label: "Boka demo",
    icon: Calendar,
    color: "#ecfccb", // Lime
    iconColor: "text-lime-700",
    description: "Se våra lösningar i action"
  },
  {
    id: "other",
    label: "Annat",
    icon: MessageCircle,
    color: "#e0e7ff", // Indigo light
    iconColor: "text-indigo-600",
    description: "Generella frågor eller annat ärende"
  },
];

const steps = [
  { id: 1, label: "Ämne" },
  { id: 2, label: "Uppgifter" },
  { id: 3, label: "Meddelande" },
];

const inputStyles = `
  w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm
  text-gray-900 placeholder:text-gray-400 font-sans text-base
  focus:outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-100
  transition-all duration-300
`;

export function ContactFormWizard({
  title = "Hur kan vi hjälpa dig?",
  subtitle = "Berätta om ditt projekt så skapar vi en skräddarsydd lösning",
  badge = "Kontakt",
  turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  onSubmit,
}) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [turnstileToken, setTurnstileToken] = useState(null);
  const turnstileRef = useRef(null);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateStep = (stepNum) => {
    const newErrors = {};
    if (stepNum === 1 && !formData.topic) newErrors.topic = "Välj ett ämne";
    if (stepNum === 2) {
      if (!formData.name?.trim()) newErrors.name = "Ange ditt namn";
      if (!formData.email?.trim()) newErrors.email = "Ange din e-post";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Ogiltig e-post";
    }
    if (stepNum === 3) {
      if (!formData.message?.trim()) newErrors.message = "Skriv ett meddelande";
      if (turnstileSiteKey && !turnstileToken) newErrors.turnstile = "Verifiera att du inte är en robot";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, 3));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    setStatus("loading");

    try {
      if (turnstileSiteKey && turnstileToken) {
        const res = await fetch("/api/turnstile/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: turnstileToken }),
        });
        if (!(await res.json()).success) {
          setErrors({ turnstile: "Verifiering misslyckades" });
          setStatus("idle");
          turnstileRef.current?.reset();
          return;
        }
      }
      if (onSubmit) await onSubmit(formData);
      else await new Promise((r) => setTimeout(r, 1000));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setStep(1);
    setFormData({});
    setErrors({});
    setStatus("idle");
    setTurnstileToken(null);
  };

  const selectedTopic = topics.find(t => t.id === formData.topic);

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-[#f8f8f6]">
      <div className="container max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium rounded-full bg-white text-gray-600 border border-gray-200 mb-6 uppercase tracking-[0.2em]"
          >
            <Sparkles className="w-3 h-3" />
            {badge}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-3"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Modern Step Indicator */}
        {status !== "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex items-center justify-center gap-1 mb-8"
          >
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center">
                <button
                  onClick={() => s.id < step && setStep(s.id)}
                  disabled={s.id > step}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                    transition-all duration-300
                    ${s.id === step
                      ? "bg-gray-900 text-white"
                      : s.id < step
                        ? "bg-lime-100 text-lime-700 hover:bg-lime-200 cursor-pointer"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }
                  `}
                >
                  {s.id < step ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="w-5 h-5 rounded-full bg-current/20 flex items-center justify-center text-xs">
                      {s.id}
                    </span>
                  )}
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-1 rounded transition-colors duration-300 ${s.id < step ? "bg-lime-200" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </motion.div>
        )}

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08)] border border-gray-100 min-h-[420px] relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="w-20 h-20 rounded-full bg-lime-100 flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-lime-700" />
                </motion.div>
                <h3 className="mb-3">Tack för ditt meddelande!</h3>
                <p className="text-gray-600 mb-8">Vi återkommer inom 24 timmar.</p>
                <Button variant="outline" onClick={reset} className="gap-2">
                  <ArrowLeft className="w-4 h-4" /> Skicka ett till
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {/* Step 1: Topic Selection */}
                {step === 1 && (
                  <div>
                    <p className="text-sm text-gray-500 mb-6 text-center">Välj det som passar bäst</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {topics.map((topic) => {
                        const Icon = topic.icon;
                        const isSelected = formData.topic === topic.id;

                        return (
                          <motion.button
                            key={topic.id}
                            type="button"
                            onClick={() => {
                              handleChange("topic", topic.id);
                              setTimeout(nextStep, 200);
                            }}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className={`
                              relative p-5 rounded-2xl text-left transition-all duration-300
                              ${isSelected
                                ? "ring-2 ring-gray-900 ring-offset-2"
                                : "hover:shadow-lg"
                              }
                            `}
                            style={{ backgroundColor: topic.color }}
                          >
                            <div className={`w-10 h-10 rounded-xl bg-white/60 backdrop-blur-sm flex items-center justify-center mb-3`}>
                              <Icon className={`w-5 h-5 ${topic.iconColor}`} strokeWidth={1.5} />
                            </div>
                            <span className="font-medium text-gray-900 block mb-1">{topic.label}</span>
                            <span className="text-sm text-gray-600">{topic.description}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                    {errors.topic && <p className="text-red-600 text-sm mt-4 text-center">{errors.topic}</p>}
                  </div>
                )}

                {/* Step 2: Personal Info */}
                {step === 2 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      {selectedTopic && (
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: selectedTopic.color }}
                        >
                          <selectedTopic.icon className={`w-5 h-5 ${selectedTopic.iconColor}`} strokeWidth={1.5} />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{selectedTopic?.label}</p>
                        <p className="text-sm text-gray-500">Steg 2 av 3 – Dina uppgifter</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Namn <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={formData.name || ""}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="Ditt namn"
                            className={`${inputStyles} pl-12 ${errors.name ? "border-red-300" : ""}`}
                          />
                        </div>
                        {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          E-post <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            value={formData.email || ""}
                            onChange={(e) => handleChange("email", e.target.value)}
                            placeholder="din@email.se"
                            className={`${inputStyles} pl-12 ${errors.email ? "border-red-300" : ""}`}
                          />
                        </div>
                        {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Företag</label>
                        <div className="relative">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={formData.company || ""}
                            onChange={(e) => handleChange("company", e.target.value)}
                            placeholder="Ditt företag (valfritt)"
                            className={`${inputStyles} pl-12`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Message */}
                {step === 3 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      {selectedTopic && (
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: selectedTopic.color }}
                        >
                          <selectedTopic.icon className={`w-5 h-5 ${selectedTopic.iconColor}`} strokeWidth={1.5} />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{selectedTopic?.label}</p>
                        <p className="text-sm text-gray-500">Steg 3 av 3 – Ditt meddelande</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Meddelande <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          value={formData.message || ""}
                          onChange={(e) => handleChange("message", e.target.value)}
                          placeholder="Berätta om ditt projekt, vilka utmaningar du vill lösa, eller ställ din fråga..."
                          rows={5}
                          className={`${inputStyles} resize-none ${errors.message ? "border-red-300" : ""}`}
                        />
                        {errors.message && <p className="text-red-600 text-xs mt-1">{errors.message}</p>}
                      </div>

                      {turnstileSiteKey && (
                        <div className="flex flex-col items-center pt-2">
                          <Turnstile
                            ref={turnstileRef}
                            siteKey={turnstileSiteKey}
                            onSuccess={setTurnstileToken}
                            onError={() => setTurnstileToken(null)}
                            options={{ theme: "light", language: "sv" }}
                          />
                          {errors.turnstile && <p className="text-red-600 text-xs mt-2">{errors.turnstile}</p>}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {status !== "success" && (
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
              <Button
                type="button"
                variant="ghost"
                onClick={prevStep}
                disabled={step === 1}
                className={`gap-2 ${step === 1 ? "opacity-0 pointer-events-none" : ""}`}
              >
                <ArrowLeft className="w-4 h-4" /> Tillbaka
              </Button>

              {step < 3 ? (
                <Button type="button" onClick={nextStep} className="gap-2">
                  Nästa <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button type="button" onClick={handleSubmit} disabled={status === "loading"} className="gap-2">
                  {status === "loading" ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Skickar...</>
                  ) : (
                    <>Skicka <Send className="w-4 h-4" /></>
                  )}
                </Button>
              )}
            </div>
          )}
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-500"
        >
          {["Svar inom 24h", "Kostnadsfri rådgivning", "Ingen bindningstid"].map((text, i) => (
            <span key={i} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-lime-600" />
              {text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default ContactFormWizard;
