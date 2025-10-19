import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {
  userApplicationReducer,
  userApplicationSaga,
} from '../features/user-application';
import { loggerMiddleware } from './middleware';

const sagaMiddleware = createSagaMiddleware(); // create the saga middleware

export const store = configureStore({
  reducer: {
    userApplication: userApplicationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false, // serialize means we can store non-serializable data like FormData
    }).concat(sagaMiddleware, loggerMiddleware),
});

sagaMiddleware.run(userApplicationSaga);

export type RootState = ReturnType<typeof store.getState>; // this is used to infer the state type
export type AppDispatch = typeof store.dispatch;
