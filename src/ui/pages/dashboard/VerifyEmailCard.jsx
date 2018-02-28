import React from 'react';
import {
  withStyles,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography
} from 'material-ui';

import { Check as CheckIcon, Email as EmailIcon } from 'material-ui-icons';
import LoadingButton from '../../components/LoadingButton';
import { inject, observer } from 'mobx-react';

import green from 'material-ui/colors/green';

const styles = theme => ({
  actions: {
    display: 'flex'
  },
  avatar: {
    backgroundColor: theme.palette.error.main
  },
  content: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  line2: {
    marginTop: theme.spacing.unit
  },
  successIcon: {
    color: green[500],
    marginRight: 4
  }
});

@inject('rootStore')
@observer
class VerifyEmailCard extends React.Component {
  state = {};

  resendEmail = async () => {
    try {
      this.setState({ status: 'loading' });
      await this.props.rootStore.sessionStore.resendVerifyEmailAddressEmail();
      this.setState({ status: 'sent' });
    } catch (e) {
      this.setState({ status: 'error' });
    }
  };

  render() {
    const { classes } = this.props;
    const { status } = this.state;

    const success = status === 'sent';
    const loading = status === 'loading';
    const error = status === 'error';

    return (
      <Card>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              <EmailIcon />
            </Avatar>
          }
          title="Verify your email address"
          subheader={this.props.rootStore.sessionStore.currentUser.email}
        />
        <CardContent className={classes.content}>
          <Typography className={classes.line} component="p">
            You must verify your email address by clicking the link in your
            welcome email.
          </Typography>
          <Typography className={classes.line2} component="p">
            You will not be able to receive transaction authorization emails if
            you have not verified your email address.
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <LoadingButton
            color="primary"
            onClick={this.resendEmail}
            loading={loading}
            success={success}
          >
            {success
              ? [
                  <CheckIcon
                    key="check"
                    className={classes.successIcon}
                    color="inherit"
                  />,
                  'Sent'
                ]
              : 'Resend Email'}
          </LoadingButton>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(VerifyEmailCard);
