import './polyfills';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import App from './App';
import RootStore from './stores/rootStore';
const rootStore = new RootStore();

const app = (
  <BrowserRouter>
    <Provider rootStore={rootStore}>
      <App />
    </Provider>
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
