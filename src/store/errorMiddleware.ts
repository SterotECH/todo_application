import { Middleware } from '@reduxjs/toolkit';

export const errorMiddleware: Middleware = store => next => action => {
  try {
    return next(action);
  } catch (error) {
    console.error('Redux Error:', error);
    store.dispatch({ type: 'ERROR', payload: error });
    throw error;
  }
};
