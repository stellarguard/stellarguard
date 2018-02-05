import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Card, {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions
} from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import SignInForm from './SignInForm';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  card: {
    margin: '0 auto',
    padding: '20px'
  },
  spacer: {
    flexGrow: 1
  }
});

class SignInPage extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.spacer} />
        <Card className={classes.card}>
          <CardHeader
            title="Sign in"
            subheader="with your StellarGuard account"
          />
          <CardContent>
            <SignInForm />
          </CardContent>
        </Card>
        <div className={classes.spacer} />
      </div>
    );
    return (
      <Paper className={classes.root}>
        <SignInForm />
      </Paper>
    );
  }
}

export default withStyles(styles)(SignInPage);
