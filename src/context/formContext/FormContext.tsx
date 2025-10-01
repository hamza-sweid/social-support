// FormContext.tsx
import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { FormContextType, StepValues } from './types';

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<Record<string, StepValues>>({});

  useEffect(() => {
    const stored = localStorage.getItem('formData');
    if (stored) setFormData(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const setStepValues = (step: string, values: StepValues) => {
    setFormData((prev) => ({ ...prev, [step]: values }));
  };

  const getStepValues = (step: string) => {
    return formData[step] || {};
  };

  const clearForm = () => {
    setFormData({});
    localStorage.removeItem('formData');
  };

  return (
    <FormContext.Provider
      value={{ formData, setStepValues, getStepValues, clearForm }}
    >
      {children}
    </FormContext.Provider>
  );
};

export { FormContext };
