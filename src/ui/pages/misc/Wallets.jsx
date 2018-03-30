import React, { Component } from 'react';
import cx from 'classnames';
import { withStyles, Typography, Card, CardContent } from 'material-ui';

import stargazerLogo from './stargazer_logo.png';
import stellarLabsLogo from './stellar_rocket.png';
import stellarSignerLogo from './stellarsigner_logo.png';

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
  logo: {
    height: 30,
    width: 30,
    marginRight: theme.spacing.unit
  },
  name: {
    display: 'flex',
    alignItems: 'center',
    transform: 'translateY(0)',
    transition: theme.transitions.create('transform'),
    fontSize: '20px',
    fontWeight: '500',
    lineHeight: 1,
    letterSpacing: '0.02em',
    marginBottom: theme.spacing.unit * 4
  },
  hovered: {
    '& $name': {
      transform: 'translateY(-10px)'
    }
  },
  stellar: {
    color: '#2196f3'
  }
});

@withStyles(styles)
class WalletCard extends Component {
  state = { hovered: false };
  render() {
    const { classes, name, logo, description, className, to } = this.props;
    const { hovered } = this.state;
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener"
        className={classes.link}
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
      >
        <Card className={cx({ [classes.hovered]: hovered }, classes.card)}>
          <CardContent className={classes.content}>
            <div className={cx(classes.innerContent, className)}>
              <Typography className={classes.name} gutterBottom>
                {logo && <img className={classes.logo} src={logo} />}
                {name}
              </Typography>
              <Typography variant="body1">{description}</Typography>
            </div>
          </CardContent>
        </Card>
      </a>
    );
  }
}

@withStyles(styles)
class MyStellarToolsCard extends Component {
  get to() {
    return 'https://mystellar.tools';
  }

  get name() {
    return (
      <span>
        My<span className={this.props.classes.stellar}>Stellar</span>.Tools
      </span>
    );
  }

  get description() {
    return (
      <span>
        MyStellar.Tools is a universal tool and wallet that gives users a
        one-stop web-based application to take advantage of all the features the
        Stellar network has to offer.
      </span>
    );
  }

  render() {
    return (
      <WalletCard
        title="MyStellar.Tools"
        to={this.to}
        name={this.name}
        description={this.description}
      />
    );
  }
}

@withStyles(styles)
class StargazerCard extends Component {
  get title() {
    return 'Stargazer';
  }
  get to() {
    return 'https://getstargazer.com/';
  }

  get name() {
    return <span>Stargazer</span>;
  }

  get logo() {
    return stargazerLogo;
  }

  get description() {
    return (
      <span>
        Stargazer is a mobile/desktop wallet for the Stellar payments network.
      </span>
    );
  }

  render() {
    return (
      <WalletCard
        title={this.title}
        to={this.to}
        name={this.name}
        logo={this.logo}
        description={this.description}
      />
    );
  }
}

@withStyles(styles)
class StellarLaboratoryCard extends Component {
  get title() {
    return 'Stellar.org Laboratory';
  }

  get to() {
    const network = config.isTestNetwork ? 'test' : 'public';
    return `https://www.stellar.org/laboratory/#txbuilder?network=${network}`;
  }

  get logo() {
    return stellarLabsLogo;
  }

  get name() {
    return <span>Stellar.org Laboratory</span>;
  }

  get description() {
    return (
      <span>
        The Stellar Laboratory is a set of tools that enables people to try out
        and learn about the Stellar network. The laboratory can build
        transactions, sign them, and submit them to the network.
      </span>
    );
  }

  render() {
    return (
      <WalletCard
        title={this.title}
        to={this.to}
        logo={this.logo}
        name={this.name}
        description={this.description}
      />
    );
  }
}

@withStyles(styles)
class StellarSignerCard extends Component {
  get title() {
    return 'StellarSigner';
  }

  get to() {
    return 'https://galactictalk.org/d/1143-announcing-stellarsigner-the-stellar-transaction-signer-for-ios-and-android';
  }

  get name() {
    return <span>StellarSigner</span>;
  }

  get logo() {
    return stellarSignerLogo;
  }

  get description() {
    return (
      <span>
        StellarSigner is a new and free secure key store app to sign Stellar
        transactions for mobile phones. With StellarSigner you never share your
        secret keys with third-party services. StellarSigner is designed to be
        among the most secure apps to sign Stellar transactions.
      </span>
    );
  }

  render() {
    return (
      <WalletCard
        title={this.title}
        to={this.to}
        logo={this.logo}
        name={this.name}
        description={this.description}
      />
    );
  }
}

export {
  MyStellarToolsCard,
  StellarLaboratoryCard,
  StargazerCard,
  StellarSignerCard
};
