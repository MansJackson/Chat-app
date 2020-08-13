import { SET_USERLIST } from '../actions/types';
import { IActionUserList } from '../interfaces';

const initialState: Array<string> = [];

export default function setUserCount(state = initialState, action: IActionUserList): Array<string> {
  switch (action.type) {
    case SET_USERLIST:
      return action.payload;
    default:
      return state;
  }
}
