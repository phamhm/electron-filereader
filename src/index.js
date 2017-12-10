import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import RootReducer from './root-reducer';
import FileReaderApp from './filereader-app/app';
import registerServiceWorker from './registerServiceWorker';

const createStoreWithMiddleware =
      applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(RootReducer)}>
    <FileReaderApp/>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
