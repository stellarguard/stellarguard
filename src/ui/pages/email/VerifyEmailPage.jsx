import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Page from '../../components/Page';

import Grid from 'material-ui/Grid';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import withAuth from '../../withAuth';

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
