import {
  MiddlewareAPI,
  isRejectedWithValue,
  Middleware,
} from '@reduxjs/toolkit';
import { baseApi } from 'common/store/baseApi';

export const rtkQueryErrorHandler: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action.payload.status === 401) {
      // You might want to dispatch a logout action at this point and clear state
      // api.dispatch(clearCredentials());
      api.dispatch(baseApi.util.resetApiState());

      // And also dispatch a notification/toast message
      // toast.error('Your session has expired. Please sign in again.', { toastId: 'session-expired' });
    }
  }

  return next(action);
};
