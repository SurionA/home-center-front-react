import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function hydrometries(state = initialState.hydrometries, action) {  
  switch(action.type) {
    case types.LOAD_HYDROMETRIES_SUCCESS:
      return action.hydrometries;
    default:
      return state;
  };
};