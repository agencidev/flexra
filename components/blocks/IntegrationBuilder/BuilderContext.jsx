"use client";

import { createContext, useContext, useState, useMemo, useCallback } from "react";
import { getAvailableGoals, getOutputSystems, getSystemById, getGoalById } from "../../../lib/integration-builder/data";

const BuilderContext = createContext(null);

export function BuilderProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSystemId, setSelectedSystemId] = useState(null);
  const [selectedGoalId, setSelectedGoalId] = useState(null);

  // Hämta valt system
  const selectedSystem = useMemo(() => {
    return selectedSystemId ? getSystemById(selectedSystemId) : null;
  }, [selectedSystemId]);

  // Hämta valt mål
  const selectedGoal = useMemo(() => {
    return selectedGoalId ? getGoalById(selectedGoalId) : null;
  }, [selectedGoalId]);

  // Hämta tillgängliga mål baserat på valt system
  const availableGoals = useMemo(() => {
    if (!selectedSystemId) return [];
    return getAvailableGoals(selectedSystemId);
  }, [selectedSystemId]);

  // Hämta output-system baserat på valt mål (exkludera källsystemet)
  const outputSystems = useMemo(() => {
    if (!selectedGoalId) return [];
    const outputs = getOutputSystems(selectedGoalId);
    // Filtrera bort källsystemet så vi inte visar samma system på båda sidor
    return outputs.filter((system) => system.id !== selectedSystemId);
  }, [selectedGoalId, selectedSystemId]);

  // Välj system och gå till steg 2
  const selectSystem = useCallback((systemId) => {
    setSelectedSystemId(systemId);
    setSelectedGoalId(null); // Återställ mål när system ändras
    setCurrentStep(2);
  }, []);

  // Välj mål och gå till steg 3
  const selectGoal = useCallback((goalId) => {
    setSelectedGoalId(goalId);
    setCurrentStep(3);
  }, []);

  // Gå till specifikt steg
  const goToStep = useCallback((step) => {
    if (step < currentStep) {
      setCurrentStep(step);
      if (step === 1) {
        setSelectedSystemId(null);
        setSelectedGoalId(null);
      } else if (step === 2) {
        setSelectedGoalId(null);
      }
    }
  }, [currentStep]);

  // Återställ allt
  const reset = useCallback(() => {
    setCurrentStep(1);
    setSelectedSystemId(null);
    setSelectedGoalId(null);
  }, []);

  const value = {
    // State
    currentStep,
    selectedSystem,
    selectedGoal,
    availableGoals,
    outputSystems,
    // Actions
    selectSystem,
    selectGoal,
    goToStep,
    reset,
  };

  return (
    <BuilderContext.Provider value={value}>
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error("useBuilder must be used within a BuilderProvider");
  }
  return context;
}
