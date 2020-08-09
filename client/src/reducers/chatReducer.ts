import { ADD_MESSAGE, CLEAR_MESSAGES } from '../actions/types';
import { IChatMessage, IActionMessages } from '../interfaces';

const initialState: Array<IChatMessage|null> = [];

export default function (state = initialState, action: IActionMessages): Array<IChatMessage|null> {
  switch (action.type) {
    case ADD_MESSAGE:
      return [...state, action.payload];
    case CLEAR_MESSAGES:
      return [];
    default:
      return state;
  }
}
