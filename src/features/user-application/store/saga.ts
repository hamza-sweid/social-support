import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import i18next from 'i18next';

import {
  loadFormData,
  submitFormSuccess,
  submitFormFailure,
  generateAiSuggestionSuccess,
  generateAiSuggestionFailure,
} from './slice';

import type {
  GenerateAiSuggestionPayload,
  SubmitFormPayload,
  ApplicationFormData,
} from './types';

import { generateAiText } from '../services/chatgptApi';
import { submitUserApplication } from '../services/applicationApi';
import {
  saveFormDataToStorage,
  loadFormDataFromStorage,
} from '../services/persistenceService';

import { sanitizeAiResponse } from '../../../utils/sanitization';

const selectFormData = (state: any) => state.userApplication.formData;

function* handleGenerateAiSuggestion(
  action: PayloadAction<GenerateAiSuggestionPayload>
) {
  try {
    const { fieldName, prompt } = action.payload;

    const response: { text: string } = yield call(generateAiText, prompt);

    const sanitizedSuggestion = sanitizeAiResponse(response.text);

    yield put(
      generateAiSuggestionSuccess({
        fieldName,
        suggestion: sanitizedSuggestion,
      })
    );

    yield call(
      message.success,
      i18next.t('applicationForm.messages.responseGenerated')
    );
  } catch (error: any) {
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

function* handleSubmitForm(_action: PayloadAction<SubmitFormPayload>) {
  try {
    const formData: ApplicationFormData = yield select(selectFormData);

    yield call(submitUserApplication, formData);

    yield put(submitFormSuccess());

    yield call(
      message.success,
      i18next.t('applicationForm.messages.submitSuccess')
    );

    localStorage.setItem('isDataSubmitted', 'true');
  } catch (error: any) {
    yield put(submitFormFailure(error.message || 'Submission failed'));
    yield call(
      message.error,
      i18next.t('applicationForm.messages.submitError')
    );
  }
}

function* handleSaveStepData(_action: PayloadAction<any>) {
  try {
    const formData: ApplicationFormData = yield select(selectFormData);

    yield call(saveFormDataToStorage, formData);
  } catch (error) {
    console.error('Error saving form data to localStorage:', error);
  }
}

function* handleLoadFormData() {
  try {
    const formData: ApplicationFormData = yield call(loadFormDataFromStorage);

    yield put(loadFormData(formData));
  } catch (error) {
    console.error('Error loading form data from localStorage:', error);
  }
}

export function* userApplicationSaga() {
  yield takeLatest(
    'userApplication/generateAiSuggestionRequest',
    handleGenerateAiSuggestion
  );

  yield takeEvery('userApplication/submitFormRequest', handleSubmitForm);

  yield takeEvery('userApplication/setStepData', handleSaveStepData);

  yield call(handleLoadFormData);
}
