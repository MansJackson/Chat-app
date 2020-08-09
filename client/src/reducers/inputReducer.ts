import { SET_INPUT } from '../actions/types';
import { IAction } from '../interfaces';

const initialState = '';

export default function (state = initialState, action: IAction): string {
  switch (action.type) {
    case SET_INPUT:
      return action.payload;
    default:
      return state;
  }
}
