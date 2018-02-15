import React, { Component } from 'react';
import {
  withStyles,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  CardActions,
  Button
} from 'material-ui';
import { PhonelinkLock } from 'material-ui-icons';
import teal from 'material-ui/colors/teal';
import { inject, observer } from 'mobx-react';

import AddAuthenticatorDialog from './AddAuthenticatorDialog';

const styles = theme => ({
  actions: {
    display: 'flex'
  },
  avatar: {
    backgroundColor: teal['500']
  },
  content: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  line2: {
    marginTop: theme.spacing.unit
  }
});

@inject('rootStore')
@observer
@withStyles(styles)
class AddTwoFactorAuthCard extends Component {
  state = {
    dialogOpen: true
  };

  render() {
    const { classes, rootStore } = this.props;
    const secret = rootStore.tfaStore.secret;
    const { dialogOpen } = this.state;

    return (
      <Card>
        <AddAuthenticatorDialog
          open={dialogOpen && !!secret}
          secret={secret}
          onClose={this.handleDialogClose}
        />
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              <PhonelinkLock />
            </Avatar>
          }
          title="Enable 2-factor Authentication"
          subheader="Add an extra layer of security to your account"
        />
        <CardContent className={classes.content}>
          <Typography className={classes.line} component="p">
            Require a rotating one time passcode to be entered when signing in
            or authorizing transactions.
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <Button color="primary" onClick={this.handleSetUpTwoFactorAuthClick}>
            Enable
          </Button>
        </CardActions>
      </Card>
    );
  }

  handleSetUpTwoFactorAuthClick = async () => {
    await this.props.rootStore.tfaStore.generateAuthenticatorSecret();
    this.setState({ dialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };
}

export default AddTwoFactorAuthCard;
