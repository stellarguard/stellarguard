import React from 'react';
import { withStyles, Grid, Card, CardHeader, CardContent } from 'material-ui';
import { Redirect } from 'react-router';
import { inject, observer } from 'mobx-react';

import SignInForm from './SignInForm';
import { Page, LogoAvatar } from '../../components';

const styles = () => ({
  root: {
    height: '100%'
  }
});

@inject('rootStore')
@observer
class SignInPage extends React.Component {
  render() {
    const { classes, rootStore } = this.props;
    if (rootStore.sessionStore.isSignedIn) {
      let to = '/';
      if (rootStore.sessionStore.returnUrl) {
        to = rootStore.sessionStore.returnUrl;
        rootStore.sessionStore.setReturnUrl(null);
      }
      return <Redirect to={to} />;
    }

    return (
      <Page>
        <Grid
          className={classes.root}
          container
          spacing={0}
          alignItems="center"
          justify="center"
        >
          <Grid item md={6} sm={8} xs={12}>
            <Card>
              <CardHeader
                title="Sign in"
                subheader="with your StellarGuard account"
                avatar={<LogoAvatar />}
              />
              <CardContent>
                <SignInForm />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Page>
    );
  }
}

export default withStyles(styles)(SignInPage);
