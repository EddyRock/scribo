import { useDispatch } from 'react-redux';
import type { TNotificationAction } from '@/store/reducers/notifications-reducer';


function useNotifications() {
  const dispatch = useDispatch();

  const showNotification = (message: string, autoHideDuration?: number) => {
    dispatch<TNotificationAction>({
      type: 'SHOW_NOTIFICATION',
      payload: { message, autoHideDuration },
    });
  };

  const hideNotification = (id: string) => {
    dispatch<TNotificationAction>({
      type: 'HIDE_NOTIFICATION',
      payload: { id },
    });
  };

  return { showNotification, hideNotification };
}

export default useNotifications;