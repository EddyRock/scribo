import { IconButton, Snackbar } from '@mui/material';
import type { SnackbarCloseReason } from '@mui/material/Snackbar';
import { Close } from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';

import type { IRootState } from '@/store';

function Notification() {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state: IRootState) => state.notifications);
  // TODO: Do small cleaning;
  // TODO: Add a logo to the Signup page;
  const onHandleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
    id?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    onRemoveNotification(id);
  };

  const onRemoveNotification = (id?: string) => {
    if (id) {
      dispatch({ type: 'HIDE_NOTIFICATION', payload: { id } });
    }
  };

  const getActions = (id?: string) => (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => onRemoveNotification(id)}>
        <Close fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div className="fixed right-4 bottom-4 flex flex-col-reverse gap-2">
      {notifications.map((notification) => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={notification.autoHideDuration}
          onClose={(event, reason) => onHandleClose(event, reason, notification.id)}
          message={notification.message}
          action={getActions(notification.id)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          style={{
            position: 'relative',
            transform: 'none'
          }}
        />
      ))}
    </div>
  );
}

export default Notification;
