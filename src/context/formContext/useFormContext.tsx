// useFormContext.ts
import { useContext } from 'react';
import { FormContext } from './FormContext';
import type { FormContextType } from './types';

export const useFormContext = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context)
    throw new Error('useFormContext must be used within FormProvider');
  return context;
};
