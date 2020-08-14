import { Dispatch } from 'redux';

export interface ISocket {
  socket: SocketIOClient.Socket,
}

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

export interface IActionUserList {
  type: string,
  payload: Array<string>
}

export interface ISocketAction {
  type: string,
  payload: SocketIOClient.Socket,
}

// state and props
export interface IRootState {
  nickname: string,
  messages: Array<IChatMessage>,
  notification: string,
  input: string,
  userCount: number,
  userList: Array<string>,
  socket: SocketIOClient.Socket,
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
  time: string,
}

export interface IUserCount {
  userCount: number,
}

export interface IUsers {
  users: Array<string>
}

export interface IChatDispatchProps {
  recievedMsg: (nickname: string, message: string, type: string, time: string) =>
  (dispatch: Dispatch) => void,

  setInput: (value: string) => (dispatch: Dispatch) => void,
  discon: () => (dispatch: Dispatch) => void,
  notify: (message: string) => (dispatch: Dispatch) => void,
  updateUsers: () => (dispatch: Dispatch) => void,
  connectSocket: () => (dispatch: Dispatch) => void,
}

export interface IChatMessageInputDispatch {
  setInput: (value: string) => (dispatch: Dispatch) => void,
  notify: (message: string) => (dispatch: Dispatch) => void,
  sendMsg: (nickname: string, message: string, socket: SocketIOClient.Socket) =>
  (dispatch: Dispatch) => void,
}

export type IChatProps =
  IChatMessages
  & IChatDispatchProps
  & INickname
  & IInput
  & ISocket;

export type IChatTopbarProps = IUserCount & IUsers;
export type IChatMessageInputProps = INickname & IInput & ISocket;
