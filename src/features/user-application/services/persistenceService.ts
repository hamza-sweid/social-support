import type { ApplicationFormData } from '../store/types';

/**
 * Save form data to localStorage
 */
export const saveFormDataToStorage = (formData: ApplicationFormData): void => {
  localStorage.setItem('formData', JSON.stringify(formData));
};

/**
 * Load form data from localStorage
 */
export const loadFormDataFromStorage = (): ApplicationFormData => {
  const stored = localStorage.getItem('formData');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error parsing stored form data:', error);
    }
  }

  return {
    personalInfo: null,
    familyInfo: null,
    situationInfo: null,
  };
};

/**
 * Clear form data from localStorage
 */
export const clearFormDataFromStorage = (): void => {
  localStorage.removeItem('formData');
  localStorage.removeItem('isDataSubmitted');
};

/**
 * Check if form data has been submitted
 */
export const isFormSubmitted = (): boolean => {
  return localStorage.getItem('isDataSubmitted') === 'true';
};
