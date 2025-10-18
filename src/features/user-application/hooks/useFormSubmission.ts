import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import type { AppDispatch } from '../../../store';
import {
  submitFormRequest,
  resetSubmission,
  selectIsSubmitting,
  selectIsSubmitted,
  selectSubmissionError,
  selectFormData,
  selectIsFormComplete,
} from '../index';

/**
 * Hook for managing form submission
 * Replaces form submission logic in ApplicationForm Index.tsx
 */
export const useFormSubmission = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isSubmitting = useSelector(selectIsSubmitting);
  const isSubmitted = useSelector(selectIsSubmitted);
  const submissionError = useSelector(selectSubmissionError);
  const formData = useSelector(selectFormData);
  const isFormComplete = useSelector(selectIsFormComplete);

  // Submit form (replaces handleFinishForm in ApplicationForm)
  const submitForm = useCallback(
    (shouldNavigate = true) => {
      if (isFormComplete) {
        dispatch(submitFormRequest({ shouldNavigate }));
      }
    },
    [dispatch, isFormComplete]
  );

  // Clear submission state
  const clearSubmissionState = useCallback(() => {
    dispatch(resetSubmission());
  }, [dispatch]);

  return {
    // State
    isSubmitting,
    isSubmitted,
    submissionError,
    formData,
    isFormComplete,

    // Actions
    submitForm,
    clearSubmissionState,
  };
};
