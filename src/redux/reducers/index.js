import { combineReducers } from 'redux';
import boyReducer from './boy-reducer';
import girlReducer from './girl-reducer';
import userReducer from './user-reducer'

const allReducers = {
  boys: boyReducer,
  girls: girlReducer, 
  user: userReducer
}

const rootReducer = combineReducers(allReducers);

export default rootReducer;