import React, { Component, Fragment } from 'react';
import { withStyles, Popover } from '@material-ui/core';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit
  },
  popover: {
    pointerEvents: 'none'
  }
});

@withStyles(styles)
class OnClickPopover extends Component {
  state = {
    anchorEl: null,
    open: false
  };

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.target, open: true });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null, open: false });
  };

  render() {
    const { classes, children, popover } = this.props;
    const { anchorEl, open } = this.state;
    return (
      <Fragment>
        <div onClick={this.handlePopoverOpen}>{children}</div>
        <Popover
          className={classes.popover}
          classes={{
            paper: classes.paper
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'left'
          }}
          onClose={this.handlePopoverClose}
        >
          {popover}
        </Popover>
      </Fragment>
    );
  }
}

export default OnClickPopover;
