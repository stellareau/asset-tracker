import { combineReducers } from 'redux';
import {checkout} from './reducers/checkout';
import {admin} from './reducers/admin';
import {assets} from './reducers/assets';

// Import the rest of the reducers here
const rootReducer = combineReducers({
  // List of reducers goes here
  checkout,
  admin,
  assets,
});

export default rootReducer;