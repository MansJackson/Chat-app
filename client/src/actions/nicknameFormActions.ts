import { Dispatch } from 'redux';
import { SET_NICKNAME, SET_NOTIFICATION } from './types';
import { IValidNameResponse } from '../interfaces';

export default (nickname: string) => (dispatch: Dispatch): void => {
  fetch(`/api/users/${nickname}`)
    .then((res) => res.json())
    .then((res: IValidNameResponse) => {
      if (!res.valid) {
        dispatch({
          type: SET_NOTIFICATION,
          payload: res.message,
        });
        setTimeout(() => {
          dispatch({
            type: SET_NOTIFICATION,
            payload: '',
          });
        }, 4000);
      } else {
        dispatch({
          type: SET_NICKNAME,
          payload: nickname,
        });
      }
    })
    .catch(() => {
      dispatch({
        type: SET_NOTIFICATION,
        payload: 'Unable to connect to server',
      });
      setTimeout(() => {
        dispatch({
          type: SET_NOTIFICATION,
          payload: '',
        });
      }, 4000);
    });
};
