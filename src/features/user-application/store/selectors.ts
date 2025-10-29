import type { RootState } from '../../../store';

export const selectFormData = (state: RootState) =>
  state.userApplication.formData;
export const selectPersonalInfo = (state: RootState) =>
  state.userApplication.formData.personalInfo;
export const selectFamilyInfo = (state: RootState) =>
  state.userApplication.formData.familyInfo;
export const selectSituationInfo = (state: RootState) =>
  state.userApplication.formData.situationInfo;

export const selectCurrentStep = (state: RootState) =>
  state.userApplication.currentStep;

export const selectIsSubmitting = (state: RootState) =>
  state.userApplication.submission.isSubmitting;
export const selectIsSubmitted = (state: RootState) =>
  state.userApplication.submission.isSubmitted;

export const selectAiSuggestions = (state: RootState) =>
  state.userApplication.aiSuggestions.suggestions;
export const selectAiLoading = (state: RootState) =>
  state.userApplication.aiSuggestions.loading;

export const selectIsFormComplete = (state: RootState) => {
  const { personalInfo, familyInfo, situationInfo } =
    state.userApplication.formData;
  return personalInfo !== null && familyInfo !== null && situationInfo !== null;
};
