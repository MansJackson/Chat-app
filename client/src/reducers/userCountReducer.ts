import { SET_USERCOUNT } from '../actions/types';
import { IActionUserCount } from '../interfaces';

const initialState = 0;

export default function setUserCount(state = initialState, action: IActionUserCount): number {
  switch (action.type) {
    case SET_USERCOUNT:
      return action.payload;
    default:
      return state;
  }
}
