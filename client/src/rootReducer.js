import { combineReducers } from 'redux';
import {checkout} from './reducers/checkout';
import {admin} from './reducers/admin';
import {assets} from './reducers/assets';
import {stocktake} from './reducers/stocktake';

// Import the rest of the reducers here
const rootReducer = combineReducers({
  // List of reducers goes here
  checkout,
  admin,
  assets,
  stocktake
});

export default rootReducer;