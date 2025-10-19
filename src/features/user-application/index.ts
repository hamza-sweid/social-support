// Export store items (for store configuration)
export { default as userApplicationReducer } from './store/slice';
export { userApplicationSaga } from './store/saga';

// Export specific actions needed by components and hooks
export {
  resetForm,
  resetSubmission,
  setCurrentStep,
  setStepData,
  submitFormRequest,
  generateAiSuggestionRequest,
} from './store/slice';

// Export specific selectors needed by hooks
export {
  selectFormData,
  selectCurrentStep,
  selectPersonalInfo,
  selectFamilyInfo,
  selectSituationInfo,
  selectIsSubmitting,
  selectIsSubmitted,
  selectIsFormComplete,
  selectAiSuggestions,
  selectAiLoading,
} from './store/selectors';

// Export specific types needed by components
export type {
  PersonalInfoData,
  FamilyInfoData,
  SituationInfoData,
  ApplicationFormData,
  SetStepDataPayload,
} from './store/types';

// Export hooks (main public API)
export * from './hooks';
