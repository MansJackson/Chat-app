import { CREATE_SOCKET } from '../actions/types';
import 'socket.io-client';
import { ISocketAction } from '../interfaces';

const initialState: SocketIOClient.Socket|null = null;

export default function socketReducer(
  state = initialState,
  action: ISocketAction,
): SocketIOClient.Socket|null {
  switch (action.type) {
    case CREATE_SOCKET:
      return action.payload;
    default:
      return state;
  }
}
