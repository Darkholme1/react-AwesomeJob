import { combineReducers } from 'redux';
/* import boyReducer from './boy-reducer';
import girlReducer from './girl-reducer'; */
import userReducer from './user-reducer'
import workexpReducer from './workexp-reducer'
import projectexpReducer from './projectexp-reducer'
import eduexpReducer from './eduexp-reducer'
import chatReducer from './chat-reducer'

const allReducers = {
  /* boys: boyReducer,
  girls: girlReducer,  */
  user: userReducer,
  workExp: workexpReducer,
  projectExp: projectexpReducer,
  eduExp: eduexpReducer,
  chat: chatReducer
}

const rootReducer = combineReducers(allReducers);

export default rootReducer;