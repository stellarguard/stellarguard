import './polyfills';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import App from './App';
import RootStore from './stores/rootStore';
import history from './history';

const rootStore = new RootStore();

const app = (
  <Router history={history}>
    <Provider rootStore={rootStore}>
      <App />
    </Provider>
  </Router>
);

ReactDOM.render(app, document.getElementById('root'));
