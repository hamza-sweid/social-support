export type StepValues = Record<string, any>;

export interface FormContextType {
  formData: Record<string, StepValues>;
  setStepValues: (step: string, values: StepValues) => void;
  getStepValues: (step: string) => StepValues;
  clearForm: () => void;
}
