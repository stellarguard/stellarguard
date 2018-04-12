import React from 'react';
import {
  withStyles,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography
} from 'material-ui';
import { inject, observer } from 'mobx-react';

import { Redirect, withRouter } from 'react-router-dom';

import ResetPasswordForm from './ResetPasswordForm';
import Page from '../../components/Page';

const styles = () => ({
  root: {
    height: '100%'
  }
});

@withStyles(styles)
@withRouter
@inject('rootStore')
@observer
class ResetPasswordPage extends React.Component {
  state = { goToSignInPage: false };

  render() {
    const { classes, location } = this.props;
    const { goToSignInPage } = this.state;
    if (goToSignInPage) {
      return <Redirect to="/signin" />;
    }

    const search = new URLSearchParams(location.search);
    const code = search.get('code');

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
              <CardHeader title="Reset Your Password" />
              <CardContent>
                <Typography gutterBottom>
                  Check your email for the password reset code.
                </Typography>
                <Typography>
                  Then click the link or enter the reset code below to reset
                  your password.
                </Typography>
                <ResetPasswordForm
                  code={code}
                  onResetPassword={this.onResetPassword}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Page>
    );
  }

  onResetPassword = () => {
    this.props.rootStore.uiState.showSnackbar({
      message:
        'Your password has been reset. Please log in with your new password.'
    });
    this.setState({ goToSignInPage: true });
  };
}

export default ResetPasswordPage;
