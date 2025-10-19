import type { RootState } from '../../../store';

// Form data selectors
export const selectFormData = (state: RootState) =>
  state.userApplication.formData;
export const selectPersonalInfo = (state: RootState) =>
  state.userApplication.formData.personalInfo;
export const selectFamilyInfo = (state: RootState) =>
  state.userApplication.formData.familyInfo;
export const selectSituationInfo = (state: RootState) =>
  state.userApplication.formData.situationInfo;

// Form flow selectors
export const selectCurrentStep = (state: RootState) =>
  state.userApplication.currentStep;

// Submission selectors
export const selectIsSubmitting = (state: RootState) =>
  state.userApplication.submission.isSubmitting;
export const selectIsSubmitted = (state: RootState) =>
  state.userApplication.submission.isSubmitted;

// AI suggestions selectors
export const selectAiSuggestions = (state: RootState) =>
  state.userApplication.aiSuggestions.suggestions;
export const selectAiLoading = (state: RootState) =>
  state.userApplication.aiSuggestions.loading;

// Form completion status
export const selectIsFormComplete = (state: RootState) => {
  const { personalInfo, familyInfo, situationInfo } =
    state.userApplication.formData;
  return personalInfo !== null && familyInfo !== null && situationInfo !== null;
};
