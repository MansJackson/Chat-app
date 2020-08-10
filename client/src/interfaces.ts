import { Dispatch } from 'redux';

// API responses
export interface IValidNameResponse {
  valid: boolean,
  message: string,
}

// Actions
export interface IAction {
  type: string,
  payload: string,
}

export interface IActionMessages {
  type: string,
  payload: IChatMessage,
}

export interface IActionUserCount {
  type: string,
  payload: number,
}

// state and props
export interface IRootState {
  nickname: string,
  messages: Array<IChatMessage>,
  notification: string,
  input: string,
  userCount: number,
}

export interface IHomeProps {
  notification: string,
  nickname: string,
}

export interface INotification {
  notification: string,
}

export interface IInput {
  input: string,
}

// nickname
export interface INickname {
  nickname: string,
}

export interface INicknameFormDispatch {
  sendNickname: (nickname: string) => (dispatch: Dispatch) => void,
  setInput: (value: string) => (dispatch: Dispatch) => void,
}

export type INicknameFormProps = IInput;

// Chat
export interface IChatMessages {
  messages: [IChatMessage]
}

export interface IChatMessage {
  nickname: string,
  message: string,
  type: string,
}

export interface IUserCount {
  userCount: number,
}

export interface IChatDispatchProps {
  sendMsg: (nickname: string, message: string, socket: SocketIOClient.Socket) =>
  (dispatch: Dispatch) => void,
  setInput: (value: string) => (dispatch: Dispatch) => void,
  recievedMsg: (nickname: string, message: string, type: string) => (dispatch: Dispatch) => void,
  discon: () => (dispatch: Dispatch) => void,
  notify: (message: string) => (dispatch: Dispatch) => void,
  updateUsers: () => (dispatch: Dispatch) => void,
}

export type IChatProps = IChatMessages & IChatDispatchProps & INickname & IInput & IUserCount;
