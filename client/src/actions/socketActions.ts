import io from 'socket.io-client';
import { Dispatch } from 'redux';
import { CREATE_SOCKET } from './types';

const createSocket = () => (dispatch: Dispatch): void => {
  const socket = io(window.location.href, { reconnection: false });
  dispatch({
    type: CREATE_SOCKET,
    payload: socket,
  });
};

export default createSocket;
