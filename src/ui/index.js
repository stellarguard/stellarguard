import './polyfills';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, withRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import App from './App';
import RootStore from './stores/rootStore';
import history from './history';
import externalScripts from './externalScripts';
import config from './config';

const rootStore = new RootStore();

@withRouter
class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

const app = (
  <Router history={history}>
    <Provider rootStore={rootStore}>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Provider>
  </Router>
);

ReactDOM.render(app, document.getElementById('root'));

if (config.recaptchaSiteKey) {
  externalScripts.loadRecaptcha();
}
