import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  UserApplicationState,
  SetStepDataPayload,
  GenerateAiSuggestionPayload,
  AiSuggestionSuccessPayload,
  SubmitFormPayload,
} from './types';

const initialState: UserApplicationState = {
  formData: {
    personalInfo: null,
    familyInfo: null,
    situationInfo: null,
  },
  currentStep: 1,
  submission: {
    isSubmitting: false,
    isSubmitted: false,
    error: null,
  },
  aiSuggestions: {
    suggestions: {},
    loading: false,
    error: null,
    currentField: null,
  },
};

export const userApplicationSlice = createSlice({
  name: 'userApplication',
  initialState,
  reducers: {
    // Form step management
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },

    // Form data management (replaces FormContext setStepValues)
    setStepData: (state, action: PayloadAction<SetStepDataPayload>) => {
      const { step, data } = action.payload;
      (state.formData as any)[step] = data;
    },

    // Load form data from localStorage (replaces FormContext getStepValues)
    loadFormData: (state, action: PayloadAction<any>) => {
      state.formData = action.payload;
    },

    // Form submission actions (replaces current form submission logic)
    submitFormRequest: (state, _action: PayloadAction<SubmitFormPayload>) => {
      state.submission.isSubmitting = true;
      state.submission.error = null;
    },
    submitFormSuccess: (state) => {
      state.submission.isSubmitting = false;
      state.submission.isSubmitted = true;
    },
    submitFormFailure: (state, action: PayloadAction<string>) => {
      state.submission.isSubmitting = false;
      state.submission.error = action.payload;
    },

    // AI suggestion actions (replaces SuggestionModal state)
    generateAiSuggestionRequest: (
      state,
      action: PayloadAction<GenerateAiSuggestionPayload>
    ) => {
      state.aiSuggestions.loading = true;
      state.aiSuggestions.error = null;
      state.aiSuggestions.currentField = action.payload.fieldName;
    },
    generateAiSuggestionSuccess: (
      state,
      action: PayloadAction<AiSuggestionSuccessPayload>
    ) => {
      state.aiSuggestions.loading = false;
      state.aiSuggestions.suggestions[action.payload.fieldName] =
        action.payload.suggestion;
      state.aiSuggestions.currentField = null;
    },
    generateAiSuggestionFailure: (state, action: PayloadAction<string>) => {
      state.aiSuggestions.loading = false;
      state.aiSuggestions.error = action.payload;
      state.aiSuggestions.currentField = null;
    },

    // Clear AI suggestion error
    clearAiError: (state) => {
      state.aiSuggestions.error = null;
    },

    // Reset form (replaces FormContext clearForm)
    resetForm: () => initialState,

    // Reset submission state
    resetSubmission: (state) => {
      state.submission.isSubmitted = false;
      state.submission.error = null;
    },
  },
});

export const {
  setCurrentStep,
  setStepData,
  loadFormData,
  submitFormRequest,
  submitFormSuccess,
  submitFormFailure,
  generateAiSuggestionRequest,
  generateAiSuggestionSuccess,
  generateAiSuggestionFailure,
  clearAiError,
  resetForm,
  resetSubmission,
} = userApplicationSlice.actions;

export default userApplicationSlice.reducer;
