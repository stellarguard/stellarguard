import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';

const styles = () => ({});

class AppLoader extends Component {
  state = {
    shouldShowLoader: false
  };

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({ shouldShowLoader: true });
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    if (!this.state.shouldShowLoader) {
      return null;
    }

    return <LinearProgress color="secondary" />;
  }
}

export default withStyles(styles)(AppLoader);
