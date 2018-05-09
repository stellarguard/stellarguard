import React, { Component } from 'react';
import cx from 'classnames';
import { withStyles, Typography, Card, CardContent } from 'material-ui';
import green from 'material-ui/colors/green';

import { ExternalLink } from '../../../components';
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
      <Typography variant="body1" className={className}>
        {children}
      </Typography>
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
    const {
      classes,
      name,
      logo,
      description,
      className,
      to,
      wallet,
      exchange
    } = this.props;
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
          {exchange && <ExchangeRibbon />}
          {wallet && <WalletRibbon />}
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

import interstellarExchangeLogo from './interstellar_exchange_logo.png';

@withStyles(styles)
class InterstellarExchangeCard extends Component {
  get title() {
    return 'Interstellar';
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
    return <span>Interstellar</span>;
  }

  get description() {
    return <div>A Multi-Awesome Wallet and Decentralized Exchange</div>;
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
  get signerLink() {
    const network = config.isTestNetwork ? 'test' : 'public';
    return `https://www.stellar.org/laboratory/#txsigner?network=${network}`;
  }

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

  get description() {
    return (
      <div>
        <p>
          Manage your Stellar wallet and trade on the Stellar decentralized
          exchange.
        </p>
        <p>
          * You must use readonly mode (sign in with Public Key) to be able copy
          the transaction XDR and then sign it in a different tool like{' '}
          <ExternalLink href={this.signerLink}>Stellar Laboratory</ExternalLink>.
        </p>
      </div>
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

export {
  MyStellarToolsCard,
  StellarAccountViewerCard,
  StellarLaboratoryCard,
  StellarportCard,
  StargazerCard,
  StellarSignerCard,
  PegasusWalletCard,
  InterstellarExchangeCard
};
