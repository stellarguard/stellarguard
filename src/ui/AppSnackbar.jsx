import React, { Component } from 'react';
import { withStyles, Snackbar, Button } from '@material-ui/core';

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
    if (!snackbar) {
      return null;
    }

    const anchorOrigin = {
      vertical: snackbar.position || 'top',
      horizontal: 'center'
    };

    return (
      <Snackbar
        anchorOrigin={anchorOrigin}
        autoHideDuration={snackbar.duration || 5000}
        open={!!snackbar}
        onClose={this.closeSnackbar}
        message={snackbar.message}
        action={
          <Button color="secondary" size="small" onClick={this.closeSnackbar}>
            OK
          </Button>
        }
      />
    );
  }
}

export default AppSnackbar;
