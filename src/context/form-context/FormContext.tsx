import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { FormContextType, StepValues } from './types';

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<Record<string, StepValues>>(() => {
    const stored = sessionStorage.getItem('formData');
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    sessionStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const setStepValues = (step: string, values: StepValues) => {
    setFormData((prev) => ({ ...prev, [step]: values }));
  };

  const getStepValues = (step: string) => {
    const isDataSubmitted = sessionStorage.getItem('isDataSubmitted');
    if (isDataSubmitted) {
      return {};
    }
    return formData[step] || {};
  };

  const clearForm = () => {
    setFormData({});
    sessionStorage.removeItem('formData');
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
