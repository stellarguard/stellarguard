import React, { Component } from 'react';
import { withStyles, Snackbar, Button } from 'material-ui';

import { inject, observer } from 'mobx-react';

const styles = () => ({});

@withStyles(styles)
@inject('rootStore')
@observer
class AppSnackbar extends Component {
  get uiState() {
    return this.props.rootStore.uiState;
  }

  closeSnackbar = () => {
    this.uiState.closeSnackbar();
  };

  render() {
    const snackbar = this.uiState.snackbar;
    if (!snackbar) {
      return null;
    }

    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={8000}
        open={true}
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
