import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { authReducer, notificationsReducer, foldersReducer } from './reducers/index';

import type { IAuthState } from './reducers/auth-reducer';
import type { INotificationState } from './reducers/notifications-reducer';

export interface IRootState {
  auth: IAuthState;
  notifications: INotificationState;
}

const rootReducer = combineReducers({
  auth: authReducer,
  notifications: notificationsReducer,
  folders: foldersReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});