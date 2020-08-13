import { combineReducers } from 'redux';
import nicknameReducer from './nicknameReducer';
import chatReducer from './chatReducer';
import notificationReducer from './notificationReducer';
import inputReducer from './inputReducer';
import userCountReducer from './userCountReducer';
import usersReducer from './usersReducer';

export default combineReducers({
  nickname: nicknameReducer,
  messages: chatReducer,
  notification: notificationReducer,
  input: inputReducer,
  userCount: userCountReducer,
  userList: usersReducer,
});
