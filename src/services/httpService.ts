import axios from 'axios';
import { message } from 'antd';
import i18next from 'i18next';

const httpService = axios.create({
  //  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

httpService.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

httpService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      message.error(i18next.t('applicationForm.messages.requestedTimeOut'));
    } else if (!error.response) {
      message.error(i18next.t('applicationForm.messages.networkError'));
    } else if (error.response.status === 401) {
      message.error(i18next.t('applicationForm.messages.unauthorizedError'));
    } else {
      message.error(i18next.t('applicationForm.messages.httpError'));
    }

    return Promise.reject(error);
  }
);

export default httpService;
