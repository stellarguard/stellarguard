import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import { inject, observer } from 'mobx-react';

const styles = theme => ({
  drawer: {
    position: 'relative',
    height: '100%',
    width: theme.drawer.width,
    backgroundColor: theme.palette.background.default
  }
});

@inject('rootStore')
@observer
class AppDrawer extends Component {
  render() {
    const { classes, rootStore } = this.props;
    return (
      <Drawer
        variant="persistent"
        classes={{
          paper: classes.drawer
        }}
        anchor="left"
        open={rootStore.uiState.isAppDrawerOpen}
      >
        <div className={classes.drawerInner}>HI I AM A DRAWER</div>
      </Drawer>
    );
  }
}

export default withStyles(styles)(AppDrawer);
