import { combineReducers } from 'redux';
/* import boyReducer from './boy-reducer';
import girlReducer from './girl-reducer'; */
import userReducer from './user-reducer'
import workexpReducer from './workexp-reducer'

const allReducers = {
  /* boys: boyReducer,
  girls: girlReducer,  */
  user: userReducer,
  workExp: workexpReducer
}

const rootReducer = combineReducers(allReducers);

export default rootReducer;