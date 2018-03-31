import React, { Component } from 'react';
import { withStyles, Snackbar, Button } from 'material-ui';

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

    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={5000}
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
