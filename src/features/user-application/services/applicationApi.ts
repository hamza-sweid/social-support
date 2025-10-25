import { t } from 'i18next';
import type { ApplicationFormData } from '../store/types';

/**
 * Submit user application (mock API)
 * @param data - Application form data
 * @returns Promise with success response
 */
export const submitUserApplication = async (_data: ApplicationFormData) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Store submission flag in localStorage
  localStorage.setItem('isDataSubmitted', 'true');

  return {
    success: true,
    message: t('applicationForm.messages.submitSuccess'),
  };
};
