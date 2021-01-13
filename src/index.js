import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './redux/reducers/index';
import App from './components/App';
import './index.scss';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
  ),
);
/* eslint-enable */

const root = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  root,
);
