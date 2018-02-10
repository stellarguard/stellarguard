import React from 'react';
import { withStyles } from 'material-ui';
import { Helmet } from 'react-helmet';
import Hero from './Hero';

const styles = theme => {
  return {
    root: {
      flex: '1 0 100%'
    }
  };
};

function HomePage(props) {
  const classes = props.classes;

  return (
    <div className={classes.root}>
      <Helmet>
        <title>StellarGuard</title>
      </Helmet>
      <Hero />
    </div>
  );
}
export default withStyles(styles)(HomePage);
