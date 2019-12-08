import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';

import Home from '../../containers/HomeContainer';
import './App.css';

import reducer from '../../appState';

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(promiseMiddleware),
  ),
);

const App = () => (
  <Provider store={store}>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </Provider>
);

export default App;
