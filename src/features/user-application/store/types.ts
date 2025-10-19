// User Application Feature Types
export interface PersonalInfoData {
  name: string;
  nationalId: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  country: string;
  city: string;
  state: string;
  phoneNumber: string;
  email: string;
}

export interface FamilyInfoData {
  dependents: number;
  monthlyIncome: {
    amount: number | null;
    currency: string;
    isUpdated: boolean;
  };
  maritalStatus: string;
  employmentStatus: string;
  housingStatus: string;
}

export interface SituationInfoData {
  currentFinancialSituation: string;
  employmentCircumstances: string;
  reasonForApplying: string;
}

export interface ApplicationFormData {
  personalInfo: PersonalInfoData | null;
  familyInfo: FamilyInfoData | null;
  situationInfo: SituationInfoData | null;
}

// Redux State
export interface UserApplicationState {
  // Form data (synced with localStorage)
  formData: ApplicationFormData;

  // Form flow
  currentStep: number;

  // Submission state (mock API)
  submission: {
    isSubmitting: boolean;
    isSubmitted: boolean;
    error: string | null;
  };

  // AI suggestions (ChatGPT API)
  aiSuggestions: {
    suggestions: Record<string, string>; // fieldName -> suggestion
    loading: boolean;
  };
}

// Action Payloads
export interface SetStepDataPayload {
  step: keyof ApplicationFormData;
  data: PersonalInfoData | FamilyInfoData | SituationInfoData;
}

export interface GenerateAiSuggestionPayload {
  fieldName: string;
  prompt: string;
}

export interface AiSuggestionSuccessPayload {
  fieldName: string;
  suggestion: string;
}

export interface SubmitFormPayload {
  shouldNavigate?: boolean;
}
