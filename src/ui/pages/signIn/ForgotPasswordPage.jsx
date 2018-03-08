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

import { Redirect } from 'react-router-dom';

import ForgotPasswordForm from './ForgotPasswordForm';
import Page from '../../components/Page';

const styles = () => ({
  root: {
    height: '100%'
  }
});

@withStyles(styles)
@inject('rootStore')
@observer
class ForgotPasswordPage extends React.Component {
  state = { goToResetPassword: false };

  componentDidMount() {
    this.props.rootStore.uiState.closeSignInDialog();
  }

  render() {
    const { classes, rootStore } = this.props;
    const { goToResetPassword } = this.state;
    if (goToResetPassword) {
      return <Redirect to="/reset-password" />;
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
              <CardHeader title="Forgot Your Password?" />
              <CardContent>
                <Typography>
                  Enter your StellarGuard email address and we&apos;ll send you
                  instructions about how to reset your password.
                </Typography>
                <ForgotPasswordForm onForgotPassword={this.goToResetPassword} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Page>
    );
  }

  goToResetPassword = () => {
    this.props.rootStore.uiState.showSnackbar(
      `We have sent you instructions to your email about how to reset your StellarGuard password. Look for the subject line "Instructions for changing your StellarGuard password".`
    );
    this.setState({ goToResetPassword: true });
  };
}

export default ForgotPasswordPage;
