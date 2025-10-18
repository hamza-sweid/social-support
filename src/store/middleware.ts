import type { Middleware } from '@reduxjs/toolkit';

/**
 * Simple Redux logger middleware for development
 * Logs actions and state changes to console
 */
export const loggerMiddleware: Middleware =
  (store) => (next) => (action: any) => {
    if (import.meta.env.DEV) {
      console.group(`🚀 Redux Action: ${action.type}`);
      console.log('📤 Action:', action);
      console.log('📊 State before:', store.getState());

      const result = next(action);

      console.log('📊 State after:', store.getState());
      console.groupEnd();

      return result;
    }

    return next(action);
  };
