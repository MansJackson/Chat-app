import { Dispatch } from 'redux';
import { SET_INPUT } from './types';

const updateInput = (value: string) => (dispatch: Dispatch): void => {
  dispatch({
    type: SET_INPUT,
    payload: value,
  });
};

export default updateInput;
