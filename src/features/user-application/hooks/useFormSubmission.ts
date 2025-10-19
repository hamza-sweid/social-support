import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import type { AppDispatch } from '../../../store';
import {
  submitFormRequest,
  selectIsSubmitting,
  selectIsFormComplete,
} from '../index';

/**
 * Hook for managing form submission
 * Replaces form submission logic in ApplicationForm Index.tsx
 */
export const useFormSubmission = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isSubmitting = useSelector(selectIsSubmitting);
  const isFormComplete = useSelector(selectIsFormComplete);

  // Submit form (replaces handleFinishForm in ApplicationForm)
  const submitForm = useCallback(() => {
    if (isFormComplete) {
      dispatch(submitFormRequest({}));
    }
  }, [dispatch, isFormComplete]);

  return {
    // State
    isSubmitting,

    // Actions
    submitForm,
  };
};
