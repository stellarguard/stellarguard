import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import MenuIcon from 'material-ui-icons/Menu';
import Button from 'material-ui/Button';

import { inject, observer } from 'mobx-react';

const styles = theme => ({
  root: {
    width: '100%'
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

@inject('rootStore')
@observer
class AppHeader extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              StellarGuard
            </Typography>
            <Button
              color="inherit"
              onClick={() => this.props.rootStore.uiState.openRegisterDialog()}
            >
              Register
            </Button>
            <Button
              color="inherit"
              onClick={() => this.props.rootStore.uiState.openSignInDialog()}
            >
              Sign in
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(AppHeader);
