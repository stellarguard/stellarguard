import React from 'react';
import { Redirect, withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import AppLoader from './AppLoader';

export default function withAuth(Page) {
  @withRouter
  @inject('rootStore')
  @observer
  class ProtectedPage extends React.Component {
    render() {
      const { rootStore, ...rest } = this.props;
      if (rootStore.sessionStore.isSessionLoading) {
        return <AppLoader />;
      }

      if (!rootStore.sessionStore.isSignedIn) {
        return <Redirect to="/signin" />;
      }
      return <Page {...rest} />;
    }
  }

  return ProtectedPage;
}
