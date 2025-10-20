import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import i18next from 'i18next';

// Import actions from slice
import {
  loadFormData,
  submitFormSuccess,
  submitFormFailure,
  generateAiSuggestionSuccess,
  generateAiSuggestionFailure,
} from './slice';

// Import action types for saga watchers
import type {
  GenerateAiSuggestionPayload,
  SubmitFormPayload,
  ApplicationFormData,
} from './types';

// Import services
import { generateAiText } from '../services/chatgptApi';
import { submitUserApplication } from '../services/applicationApi';
import {
  saveFormDataToStorage,
  loadFormDataFromStorage,
} from '../services/persistenceService';

import { sanitizeAiResponse } from '../../../utils/sanitization';

// Selectors
const selectFormData = (state: any) => state.userApplication.formData;

/**
 * Handle AI suggestion generation
 */
function* handleGenerateAiSuggestion(
  action: PayloadAction<GenerateAiSuggestionPayload>
) {
  try {
    const { fieldName, prompt } = action.payload;

    // Call ChatGPT API
    const response: { text: string } = yield call(generateAiText, prompt);

    // ✅ Sanitize AI response to prevent XSS attacks
    const sanitizedSuggestion = sanitizeAiResponse(response.text);

    // Update Redux state with sanitized suggestion
    yield put(
      generateAiSuggestionSuccess({
        fieldName,
        suggestion: sanitizedSuggestion,
      })
    );

    // Show success message
    yield call(
      message.success,
      i18next.t('applicationForm.messages.responseGenerated')
    );
  } catch (error: any) {
    // Handle AI-specific errors (business logic)
    let errorMessage = i18next.t(
      'applicationForm.messages.errorFetchingMessage'
    );

    if (error?.code === 'context_length_exceeded') {
      errorMessage = i18next.t(
        'applicationForm.messages.contextLengthExceeded'
      );
    } else if (error?.code === 'rate_limit_exceeded') {
      errorMessage = i18next.t('applicationForm.messages.rateLimitExceeded');
    }

    yield put(generateAiSuggestionFailure(errorMessage));
    yield call(message.error, i18next.t(errorMessage));
  }
}

/**
 * Handle form submission
 */
function* handleSubmitForm(_action: PayloadAction<SubmitFormPayload>) {
  try {
    // Get current form data from Redux state
    const formData: ApplicationFormData = yield select(selectFormData); //  select means it will get data from the state

    // Submit to mock API
    yield call(submitUserApplication, formData);

    // Update Redux state
    yield put(submitFormSuccess());

    // Show success message
    yield call(
      // call means it will invoke a function, first argument is the function, rest are its args
      message.success,
      i18next.t('applicationForm.messages.submitSuccess')
    );

    // Set localStorage flag to indicate successful submission
    localStorage.setItem('isDataSubmitted', 'true');
  } catch (error: any) {
    yield put(submitFormFailure(error.message || 'Submission failed'));
    yield call(
      // this can handle UI by calling message.error from antd
      message.error,
      i18next.t('applicationForm.messages.submitError')
    );
  }
}

/**
 * Save form data to localStorage whenever step data changes
 */
function* handleSaveStepData(_action: PayloadAction<any>) {
  try {
    // Get updated form data from Redux state
    const formData: ApplicationFormData = yield select(selectFormData);

    // Save to localStorage
    yield call(saveFormDataToStorage, formData);
  } catch (error) {
    console.error('Error saving form data to localStorage:', error);
  }
}

/**
 * Load form data from localStorage on app initialization
 */
function* handleLoadFormData() {
  try {
    // Load from localStorage
    const formData: ApplicationFormData = yield call(loadFormDataFromStorage);

    // Update Redux state
    yield put(loadFormData(formData));
  } catch (error) {
    console.error('Error loading form data from localStorage:', error);
  }
}

/**
 * Root saga - watches for actions
 */
export function* userApplicationSaga() {
  // Watch for AI suggestion requests
  yield takeLatest(
    // this means only the latest request will be processed
    'userApplication/generateAiSuggestionRequest',
    handleGenerateAiSuggestion
  );

  // Watch for form submission requests
  yield takeEvery('userApplication/submitFormRequest', handleSubmitForm); // this means every submission request will be processed

  // Watch for step data changes to auto-save to localStorage
  yield takeEvery('userApplication/setStepData', handleSaveStepData);

  // Load form data on saga start
  yield call(handleLoadFormData); // this means it runs once when the saga starts
}
