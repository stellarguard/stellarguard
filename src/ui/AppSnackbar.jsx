import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { Snackbar } from './components';

import { inject, observer } from 'mobx-react';

const styles = () => ({});

@withStyles(styles)
@inject('rootStore')
@observer
class AppSnackbar extends Component {
  closeSnackbar = () => {
    this.props.rootStore.uiState.closeSnackbar();
  };

  render() {
    const snackbar = this.props.rootStore.uiState.snackbar;
    const anchorOrigin = {
      vertical: snackbar.position || 'top',
      horizontal: 'center'
    };

    return (
      <Snackbar
        position={anchorOrigin}
        duration={snackbar.duration || 5000}
        open={snackbar.open}
        onClose={this.closeSnackbar}
        variant={snackbar.variant}
      >
        {snackbar.message}
      </Snackbar>
    );
  }
}

export default AppSnackbar;
