export { default as userApplicationReducer } from './store/slice';
export { userApplicationSaga } from './store/saga';

export {
  resetForm,
  resetSubmission,
  setCurrentStep,
  setStepData,
  submitFormRequest,
  generateAiSuggestionRequest,
} from './store/slice';

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

export type {
  PersonalInfoData,
  FamilyInfoData,
  SituationInfoData,
  ApplicationFormData,
  SetStepDataPayload,
} from './store/types';

export * from './hooks';
