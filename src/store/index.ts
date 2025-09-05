import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { authReducer } from './reducers/auth-reducer';
import { notificationsReducer } from './reducers/notifications-reducer';

import type { IAuthState } from './reducers/auth-reducer';
import type { INotificationState } from './reducers/notifications-reducer';

export interface IRootState {
  auth: IAuthState;
  notifications: INotificationState;
}

const rootReducer = combineReducers({
  auth: authReducer,
  notifications: notificationsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});