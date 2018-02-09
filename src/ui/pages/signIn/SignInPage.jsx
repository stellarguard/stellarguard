import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import { Redirect } from 'react-router';
import { inject, observer } from 'mobx-react';

import SignInForm from './SignInForm';

const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 64px)'
  },
  card: {
    margin: '0 auto',
    padding: '20px'
  },
  spacer: {
    flexGrow: 1
  }
});

@inject('rootStore')
@observer
class SignInPage extends React.Component {
  render() {
    const { classes, rootStore } = this.props;
    if (rootStore.sessionStore.isSignedIn) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div className={classes.root}>
        <div className={classes.spacer} />
        <Card className={classes.card}>
          <CardHeader
            title="Sign in"
            subheader="with your StellarGuard account"
          />
          <CardContent>
            <SignInForm />
          </CardContent>
        </Card>
        <div className={classes.spacer} />
      </div>
    );
  }
}

export default withStyles(styles)(SignInPage);
