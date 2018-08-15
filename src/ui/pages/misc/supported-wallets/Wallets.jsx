import React, { Component } from 'react';
import cx from 'classnames';
import {
  withStyles,
  Typography,
  Card,
  CardContent,
  Paper
} from '@material-ui/core';
import green from '@material-ui/core/colors/green';

import { ExternalLink, ButtonLink } from '../../../components';
import config from '../../../config';

const ribbonStyles = theme => ({
  ribbon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: 150,
    height: 30,
    boxShadow: '0 0 3px rgba(0,0,0,.3)',
    color: '#FFF'
  },
  wallet: {
    top: 20,
    left: -40,
    transform: 'rotate(-45deg)',
    backgroundColor: theme.palette.primary.light
  },
  exchange: {
    top: 20,
    right: -40,
    transform: 'rotate(45deg)',
    backgroundColor: green[500]
  },
  myStellar: {
    color: '#2196f3'
  }
});

@withStyles(ribbonStyles)
class Ribbon extends Component {
  render() {
    const { classes, children, wallet, exchange } = this.props;
    const className = cx(classes.ribbon, {
      [classes.wallet]: wallet,
      [classes.exchange]: exchange
    });
    return (
      <Paper elevation={5}>
        <Typography variant="body1" className={className}>
          {children}
        </Typography>
      </Paper>
    );
  }
}

@withStyles(ribbonStyles)
class WalletRibbon extends Component {
  render() {
    return <Ribbon wallet>Wallet</Ribbon>;
  }
}

@withStyles(ribbonStyles)
class ExchangeRibbon extends Component {
  render() {
    return <Ribbon exchange>Exchange</Ribbon>;
  }
}

const styles = theme => ({
  link: {
    textDecoration: 'none'
  },
  card: { position: 'relative', overflow: 'hidden' },
  content: {
    height: theme.spacing.unit * 35,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  innerContent: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%'
  },
  logo: {
    height: 30,
    width: 30,
    marginRight: theme.spacing.unit
  },
  name: {
    flex: 1,
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
  description: {
    flex: 1
  },
  tutorial: {
    justifySelf: 'flex-end'
  },
  stellar: {
    color: '#2196f3'
  }
});

@withStyles(styles)
class WalletCard extends Component {
  state = { hovered: false };
  render() {
    const {
      classes,
      name,
      logo,
      description,
      className,
      to,
      tutorial,
      exchange
    } = this.props;
    const { hovered } = this.state;
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.link}
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
      >
        <Card className={cx({ [classes.hovered]: hovered }, classes.card)}>
          {exchange && <ExchangeRibbon />}

          <CardContent className={classes.content}>
            <div className={cx(classes.innerContent, className)}>
              <Typography className={classes.name} gutterBottom>
                {logo && <img className={classes.logo} src={logo} />}
                {name}
              </Typography>
              <Typography className={classes.description} variant="body1">
                {description}
              </Typography>
              {tutorial && (
                <ButtonLink
                  color="primary"
                  className={classes.tutorial}
                  to={tutorial}
                >
                  View Tutorials
                </ButtonLink>
              )}
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

import interstellarExchangeLogo from './interstellar_exchange_logo.png';

@withStyles(styles)
class InterstellarExchangeCard extends Component {
  get title() {
    return 'Interstellar.Exchange';
  }

  get to() {
    if (config.isTestNetwork) {
      return 'https://testnet.interstellar.exchange';
    } else {
      return 'https://interstellar.exchange';
    }
  }

  get logo() {
    return interstellarExchangeLogo;
  }

  get name() {
    return <span>Interstellar.Exchange</span>;
  }

  get description() {
    return <div>A Multi-Awesome Wallet and Decentralized Exchange</div>;
  }

  get tutorial() {
    return '/help/trade-on-interstellar-exchange';
  }

  render() {
    return (
      <WalletCard
        wallet
        exchange
        title={this.title}
        to={this.to}
        logo={this.logo}
        name={this.name}
        description={this.description}
        tutorial={this.tutorial}
      />
    );
  }
}

import stargazerLogo from './stargazer_logo.png';

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
        wallet
        title={this.title}
        to={this.to}
        name={this.name}
        logo={this.logo}
        description={this.description}
      />
    );
  }
}

import pegasusLogo from './pegasus_logo.png';

@withStyles(styles)
class PegasusWalletCard extends Component {
  get title() {
    return 'Pegasus';
  }
  get to() {
    return 'https://pegasuswallet.com/';
  }

  get name() {
    return <span>Pegasus</span>;
  }

  get logo() {
    return pegasusLogo;
  }

  get description() {
    return (
      <span>
        Pegasus is a light and easy to use multi-wallet / multi-currency mobile
        app to manage your Lumens!
      </span>
    );
  }

  render() {
    return (
      <WalletCard
        wallet
        title={this.title}
        to={this.to}
        name={this.name}
        logo={this.logo}
        description={this.description}
      />
    );
  }
}

import stellarportLogo from './stellarport_logo.png';

@withStyles(styles)
class StellarportCard extends Component {
  get title() {
    return 'Stellarport';
  }

  get to() {
    return `https://stellarport.io/`;
  }

  get logo() {
    return stellarportLogo;
  }

  get name() {
    return <span>Stellarport</span>;
  }

  get tutorial() {
    return `/help/trade-on-stellarport`;
  }

  get description() {
    return (
      <span>
        Manage your Stellar wallet and trade on the Stellar decentralized
        exchange.
      </span>
    );
  }

  render() {
    return (
      <WalletCard
        wallet
        exchange
        title={this.title}
        to={this.to}
        logo={this.logo}
        name={this.name}
        description={this.description}
        tutorial={this.tutorial}
      />
    );
  }
}

import stellarAccountViewerLogo from './stellar_rocket.png';

@withStyles(styles)
class StellarAccountViewerCard extends Component {
  get title() {
    return 'Stellar.org Account Viewer';
  }

  get to() {
    return `https://www.stellar.org/account-viewer`;
  }

  get logo() {
    return stellarAccountViewerLogo;
  }

  get name() {
    return <span>Stellar.org Account Viewer</span>;
  }

  get description() {
    return (
      <span>
        Official wallet of Stellar.org. Use this lightweight client to send and
        receive lumens over the Stellar network.
      </span>
    );
  }

  get tutorial() {
    return `/help/new-transaction-account-viewer`;
  }

  render() {
    return (
      <WalletCard
        wallet
        title={this.title}
        to={this.to}
        logo={this.logo}
        name={this.name}
        description={this.description}
        tutorial={this.tutorial}
      />
    );
  }
}

import stellarLabsLogo from './stellar_rocket.png';

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
        and learn about the Stellar network. The laboratory can build all types
        of transactions, sign them, and submit them to the network.
      </span>
    );
  }

  get tutorial() {
    return `/help/new-transaction-stellar-labs`;
  }

  render() {
    return (
      <WalletCard
        wallet
        title={this.title}
        to={this.to}
        logo={this.logo}
        name={this.name}
        description={this.description}
        tutorial={this.tutorial}
      />
    );
  }
}

import stellarSignerLogo from './stellarsigner_logo.png';

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

import rocketWalletLogo from './rocketwallet_logo.png';

@withStyles(styles)
class RocketWalletCard extends Component {
  get title() {
    return 'Rocket Wallet';
  }

  get to() {
    return 'http://rocketwallet.xyz';
  }

  get name() {
    return <span>Rocket Wallet</span>;
  }

  get logo() {
    return rocketWalletLogo;
  }

  get description() {
    return (
      <span>
        A native iOS app focusing on a great user experience, allowing user to
        effortlessly interact with the Stellar Network.
      </span>
    );
  }

  render() {
    return (
      <WalletCard
        wallet
        title={this.title}
        to={this.to}
        logo={this.logo}
        name={this.name}
        description={this.description}
      />
    );
  }
}

import stellarAuthenticatorLogo from './stellar_authenticator_logo.png';

@withStyles(styles)
class StellarAuthenticatorCard extends Component {
  get title() {
    return 'Stellar Authenticator';
  }

  get to() {
    return 'https://stellar-authenticator.org/';
  }

  get name() {
    return <span>Stellar Authenticator</span>;
  }

  get logo() {
    return stellarAuthenticatorLogo;
  }

  get description() {
    return (
      <span>
        Stellar Authenticator is a tool for creating accounts and validating
        transactions on the Stellar blockchain.
      </span>
    );
  }

  render() {
    return (
      <WalletCard
        wallet
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
  StellarAccountViewerCard,
  StellarLaboratoryCard,
  StellarportCard,
  StargazerCard,
  StellarSignerCard,
  PegasusWalletCard,
  InterstellarExchangeCard,
  RocketWalletCard,
  StellarAuthenticatorCard
};
