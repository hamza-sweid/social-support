import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { selectFormData, selectIsSubmitted } from '../index';
import { fieldTranslationKeys } from '../../../pages/user-data/constants';

/**
 * Hook for managing user data display
 * Used in UserData page for displaying submitted application data
 */
export const useUserData = () => {
  const formData = useSelector(selectFormData);
  const isSubmitted = useSelector(selectIsSubmitted);

  // Format data for display (similar to UserData page logic)
  const displayData = useMemo(() => {
    if (!formData) return {};

    const formatted: Record<string, any> = {};

    // Process each step's data
    Object.entries(formData).forEach(([stepName, stepData]) => {
      if (stepData) {
        formatted[stepName] = stepData;
      }
    });

    return formatted;
  }, [formData]);

  // Get field labels for display
  const getFieldLabel = (fieldName: string) => {
    return fieldTranslationKeys[fieldName] || fieldName;
  };

  // Check if user has submitted data
  const hasSubmittedData = useMemo(() => {
    return (
      isSubmitted &&
      Object.values(formData).some((stepData) => stepData !== null)
    );
  }, [isSubmitted, formData]);

  // Navigate back to form for updates
  const navigateToFormUpdate = () => {
    // Clear submission state and navigate to form
    localStorage.removeItem('isDataSubmitted');
    window.location.href = '/application-form?step=1';
  };

  return {
    // Data
    formData,
    displayData,
    hasSubmittedData,
    isSubmitted,

    // Utilities
    getFieldLabel,
    navigateToFormUpdate,
  };
};
