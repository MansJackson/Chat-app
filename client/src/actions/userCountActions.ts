import { Dispatch } from 'redux';
import { SET_USERCOUNT, SET_NOTIFICATION, SET_USERLIST } from './types';

export default () => (dispatch: Dispatch): void => {
  fetch('/api/users')
    .then((res): Promise<Array<string>> => res.json())
    .then((users: Array<string>): void => {
      dispatch({
        type: SET_USERCOUNT,
        payload: users.length,
      });
      dispatch({
        type: SET_USERLIST,
        payload: users,
      });
    })
    .catch((err: Error): void => {
      dispatch({
        type: SET_NOTIFICATION,
        payload: err.message,
      });
      setTimeout(() => {
        dispatch({
          type: SET_NOTIFICATION,
          payload: '',
        });
      }, 4000);
    });
};
