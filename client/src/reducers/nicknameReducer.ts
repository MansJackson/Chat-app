import { SET_NICKNAME } from '../actions/types';
import { IAction } from '../interfaces';

const initialState = '';

export default function (state = initialState, action: IAction): string {
  switch (action.type) {
    case SET_NICKNAME:
      return action.payload;
    default:
      return state;
  }
}
