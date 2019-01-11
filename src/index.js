import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers';
import { Provider } from 'react-redux'
import store from './redux/store'
// import { addBoy } from './redux/actions'
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
/* import store from './redux/store'
import { addBoy, addBoyAsync } from './redux/actions'
let dosubscribe = store.subscribe(() =>
  console.log(store.getState())
);
store.dispatch(addBoy('van', 'dark'));
store.dispatch(addBoy('billy', 'ass'));
dosubscribe(); */