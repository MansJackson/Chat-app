import { Dispatch } from 'redux';
import moment from 'moment';
import {
  ADD_MESSAGE, SET_NICKNAME, CLEAR_MESSAGES,
} from './types';

export const sendMessage = (
  nickname: string, message: string, socket: SocketIOClient.Socket,
) => (dispatch: Dispatch): void => {
  socket.emit('send-chat-message', { nickname, message });
  dispatch({
    type: ADD_MESSAGE,
    payload: {
      nickname: 'You',
      message,
      type: 'sent',
      time: moment().format('LT'),
    },
  });
};

export const disconnect = () => (dispatch: Dispatch): void => {
  dispatch({
    type: CLEAR_MESSAGES,
  });
  dispatch({
    type: SET_NICKNAME,
    payload: '',
  });
};

export const recievedMessage = (
  nickname: string, message: string, type: string,
) => (dispatch: Dispatch): void => {
  dispatch({
    type: ADD_MESSAGE,
    payload: {
      nickname,
      message,
      type,
      time: moment().format('LT'),
    },
  });
};
