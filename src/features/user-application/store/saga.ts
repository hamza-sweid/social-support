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

    // Update Redux state with suggestion
    yield put(
      generateAiSuggestionSuccess({
        fieldName,
        suggestion: response.text,
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

    if (error.response?.status === 400) {
      errorMessage = 'Invalid prompt - please check your input';
    } else if (error.response?.status === 402) {
      errorMessage = 'API quota exceeded - please try later';
    } else if (error.response?.status === 413) {
      errorMessage = 'Prompt too long - please shorten it';
    }
    // Global errors (timeout, network, 401, 429) already handled by httpService interceptor

    yield put(generateAiSuggestionFailure(errorMessage));
  }
}

/**
 * Handle form submission
 */
function* handleSubmitForm(action: PayloadAction<SubmitFormPayload>) {
  try {
    // Get current form data from Redux state
    const formData: ApplicationFormData = yield select(selectFormData);

    // Submit to mock API
    yield call(submitUserApplication, formData);

    // Update Redux state
    yield put(submitFormSuccess());

    // Show success message
    yield call(
      message.success,
      i18next.t('applicationForm.messages.submitSuccess')
    );

    // Navigate to user data page if requested
    if (action.payload.shouldNavigate !== false) {
      window.location.href = '/user-data';
    }
  } catch (error: any) {
    yield put(submitFormFailure(error.message || 'Submission failed'));
    yield call(
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
    'userApplication/generateAiSuggestionRequest',
    handleGenerateAiSuggestion
  );

  // Watch for form submission requests
  yield takeEvery('userApplication/submitFormRequest', handleSubmitForm);

  // Watch for step data changes to auto-save to localStorage
  yield takeEvery('userApplication/setStepData', handleSaveStepData);

  // Load form data on saga start
  yield call(handleLoadFormData);
}
