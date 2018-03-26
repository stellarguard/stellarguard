import React, { Component } from 'react';
import cx from 'classnames';
import { withStyles, Typography, Card, CardContent } from 'material-ui';

import config from '../../config';

const styles = theme => ({
  link: {
    textDecoration: 'none'
  },
  card: {},
  content: {
    height: theme.spacing.unit * 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  innerContent: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  myStellarToolsLogo: {
    fontSize: '20px',
    fontWeight: '500',
    lineHeight: 1,
    letterSpacing: '0.02em',
    marginBottom: theme.spacing.unit * 4
  },
  stellar: {
    color: '#2196f3'
  }
});

@withStyles(styles)
class WalletCard extends Component {
  state = { hovered: false };
  render() {
    const { classes, children, className, to } = this.props;
    const { hovered } = this.state;
    return (
      <a
        href={to}
        className={classes.link}
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
      >
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <div
              className={cx(
                { [classes.hovered]: hovered },
                classes.innerContent,
                className
              )}
            >
              {children}
            </div>
          </CardContent>
        </Card>
      </a>
    );
  }
}

@withStyles(styles)
class MyStellarToolsCard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <WalletCard title="MyStellar.Tools" to="https://mystellar.tools">
        <Typography className={classes.myStellarToolsLogo} gutterBottom>
          My<span className={classes.stellar}>Stellar</span>.Tools
        </Typography>
        <Typography variant="body1">
          MyStellar.Tools is a universal tool and wallet that gives users a
          one-stop web-based application to take advantage of all the features
          the Stellar network has to offer.
        </Typography>
      </WalletCard>
    );
  }
}

@withStyles(styles)
class StellarLaboratoryCard extends Component {
  get href() {
    const network = config.isTestNetwork ? 'test' : 'public';
    return `https://www.stellar.org/laboratory/#txbuilder?network=${network}`;
  }

  render() {
    const { classes } = this.props;
    return (
      <WalletCard title="Stellar.org Laboratory" to={this.href}>
        <Typography className={classes.myStellarToolsLogo} gutterBottom>
          Stellar.org Laboratory
        </Typography>
        <Typography variant="body1">
          The Stellar Laboratory is a set of tools that enables people to try
          out and learn about the Stellar network. The laboratory can build
          transactions, sign them, and submit them to the network.
        </Typography>
      </WalletCard>
    );
  }
}

export { MyStellarToolsCard, StellarLaboratoryCard };
