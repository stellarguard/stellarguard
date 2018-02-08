import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import MenuIcon from 'material-ui-icons/Menu';
import IconButton from 'material-ui/IconButton';
import { inject, observer } from 'mobx-react';

import ToolbarActions from './ToolbarActions';

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
  handleToggleMenuClick = () => {
    this.props.rootStore.uiState.toggleAppDrawer();
  };

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
              onClick={this.handleToggleMenuClick}
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
            <ToolbarActions />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(AppHeader);
