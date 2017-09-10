import {combineReducers} from 'redux';
import hydrometries from './hydrometriesReducer';

const rootReducer = combineReducers({
  hydrometries,
});

export default rootReducer;