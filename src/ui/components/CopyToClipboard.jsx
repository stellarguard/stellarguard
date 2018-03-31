import React, { Component, Fragment } from 'react';
import { withStyles, Snackbar } from 'material-ui';
import { observer } from 'mobx-react';
import { CopyToClipboard as ReactCopyToClipboard } from 'react-copy-to-clipboard';

const styles = theme => ({});

@withStyles(styles)
@observer
class CopyToClipboard extends Component {
  state = { snackbarOpen: false };

  render() {
    const { children, text } = this.props;
    const { snackbarOpen } = this.state;
    return (
      <Fragment>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={snackbarOpen}
          onClose={this.closeSnackbar}
          autoHideDuration={2000}
          message="Copied to Clipboard"
        />
        <ReactCopyToClipboard text={text} onCopy={this.onCopy}>
          {children}
        </ReactCopyToClipboard>
      </Fragment>
    );
  }

  onCopy = () => {
    this.setState({ snackbarOpen: true });
  };

  closeSnackbar = () => {
    this.setState({ snackbarOpen: false });
  };
}

export default CopyToClipboard;
