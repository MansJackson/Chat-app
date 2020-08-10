import { Dispatch } from 'redux';
import { SET_NOTIFICATION } from './types';

const notification = (message: string) => (dispatch: Dispatch): void => {
  dispatch({
    type: SET_NOTIFICATION,
    payload: message,
  });
  setTimeout((): void => {
    dispatch({
      type: SET_NOTIFICATION,
      payload: '',
    });
  }, 4000);
};

export default notification;
