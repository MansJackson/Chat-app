import { SET_NOTIFICATION } from '../actions/types';
import { IAction } from '../interfaces';

const initialState = '';

export default function (state = initialState, action: IAction): string {
  const { payload } = action;
  switch (action.type) {
    case SET_NOTIFICATION:
      return payload;
    default:
      return state;
  }
}
