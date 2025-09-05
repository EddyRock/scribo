export interface INotification {
  id: string;
  message: string;
  autoHideDuration: number;
}

export interface INotificationState {
  notifications: INotification[];
}

export type TNotificationAction = {
  type: 'SHOW_NOTIFICATION' | 'HIDE_NOTIFICATION';
  payload?: {
    id?: string;
    message?: string;
    autoHideDuration?: number;
  };
};

const DEFAULT_HIDE_DURATION = 3000;

const initialNotificationState: INotificationState = {
  notifications: [],
};

export const notificationsReducer = (state = initialNotificationState, action: TNotificationAction) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      const newNotification: INotification = {
        id: Date.now().toString(),
        message: action.payload?.message || '',
        autoHideDuration: action.payload?.autoHideDuration || DEFAULT_HIDE_DURATION,
      };
      console.log('New notification:', newNotification);
      return {
        ...state,
        notifications: [...state.notifications, newNotification],
      };
    case 'HIDE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload?.id
        ),
      };
    default:
      return state;
  }
};