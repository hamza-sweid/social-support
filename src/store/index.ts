import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {
  userApplicationReducer,
  userApplicationSaga,
} from '../features/user-application';
import { loggerMiddleware } from './middleware';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    userApplication: userApplicationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware, loggerMiddleware),
});

sagaMiddleware.run(userApplicationSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
