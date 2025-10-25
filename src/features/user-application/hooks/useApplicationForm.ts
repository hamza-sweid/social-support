import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import type { AppDispatch } from '../../../store';
import {
  setCurrentStep,
  setStepData,
  selectCurrentStep,
  selectFormData,
  selectPersonalInfo,
  selectFamilyInfo,
  selectSituationInfo,
} from '../index';
import type { SetStepDataPayload } from '../store/types';
import { FormStepValue } from '../../../types/enum';

/**
 * Hook for managing application form steps and data
 * Replaces useFormContext from FormContext
 */
export const useApplicationForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentStep = useSelector(selectCurrentStep);
  const formData = useSelector(selectFormData);
  const personalInfo = useSelector(selectPersonalInfo);
  const familyInfo = useSelector(selectFamilyInfo);
  const situationInfo = useSelector(selectSituationInfo);

  // Go to specific step
  const goToStep = useCallback(
    (step: number) => {
      if (step >= 1 && step <= 3) {
        dispatch(setCurrentStep(step));
      }
    },
    [dispatch]
  );

  // Save step data (replaces FormContext setStepValues)
  const saveStepData = useCallback(
    (payload: SetStepDataPayload) => {
      dispatch(setStepData(payload));
    },
    [dispatch]
  );

  // Get step data by step name (replaces FormContext getStepValues)
  const getStepData = useCallback(
    (
      step:
        | FormStepValue.PERSONAL_INFO
        | FormStepValue.FAMILY_INFO
        | FormStepValue.SITUATION_INFO
    ) => {
      switch (step) {
        case FormStepValue.PERSONAL_INFO:
          return personalInfo;
        case FormStepValue.FAMILY_INFO:
          return familyInfo;
        case FormStepValue.SITUATION_INFO:
          return situationInfo;
        default:
          return null;
      }
    },
    [personalInfo, familyInfo, situationInfo]
  );

  return {
    // Current state
    currentStep,
    formData,

    // Navigation functions
    goToStep,

    // Data management functions
    saveStepData,
    getStepData,
  };
};
