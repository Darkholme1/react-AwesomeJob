import { createStore } from 'redux'
import reducer from './reducers'

const devTool = window.devToolsExtension?window.devToolsExtension():f=>f
let store = createStore(reducer, devTool);

export default store;