import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import CheckIcon from 'material-ui-icons/Check';
import ErrorIcon from 'material-ui-icons/Error';
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
  resendEmail = () => {
    this.props.rootStore.sessionStore.resendVerifyEmailAddressEmail();
  };

  render() {
    const { classes, rootStore } = this.props;

    const status = rootStore.uiState.resendVerifyEmailStatus;
    const success = status === 'sent';
    const loading = status === 'loading';
    const error = status === 'error';

    return (
      <Card>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              <ErrorIcon />
            </Avatar>
          }
          title="Verify your email address"
          subheader={this.props.rootStore.sessionStore.currentUser.email}
        />
        <CardContent className={classes.content}>
          <Typography className={classes.line} component="p">
            You must verify your email address by clicking the link in your
            verification email.
          </Typography>
          <Typography className={classes.line2} component="p">
            You will not be able to receive transaction authorization emails if
            your email is not verified.
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
