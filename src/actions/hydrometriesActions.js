import * as types from './actionTypes';  
import hydrometriesApi from '../api/hydrometriesApi';

export function loadHydrometries() {  
  return function(dispatch) {
    return hydrometriesApi.getAll().then(hydrometries => {
      dispatch(loadHydrometriesSuccess(hydrometries));
    }).catch(error => {
      throw(error);
    });
  };
}

export const loadHydrometriesSuccess = (hydrometries) => ({
    type: types.LOAD_HYDROMETRIES_SUCCESS,
    hydrometries,
})