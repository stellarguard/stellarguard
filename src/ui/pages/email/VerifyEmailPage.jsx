import React, { Component } from 'react';
import { withStyles, Grid } from 'material-ui';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';

import Page from '../../components/Page';

const styles = theme => ({});

@withRouter
@inject('rootStore')
@observer
class VerifyEmailPage extends Component {
  async componentDidMount() {
    const search = new URLSearchParams(this.props.location.search);
    const code = search.get('code');
    if (code) {
      await this.props.rootStore.sessionStore.verifyEmailAddress({ code });
    }
  }

  render() {
    const { classes, children } = this.props;
    return (
      <Page>
        <Grid container spacing={24} justify="center" alignItems="center">
          <Grid item>HELLO THERE</Grid>
        </Grid>
      </Page>
    );
  }
}

export default withStyles(styles)(VerifyEmailPage);
