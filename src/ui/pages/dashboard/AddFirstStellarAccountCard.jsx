import React, { Fragment } from 'react';
import {
  withStyles,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  Collapse,
  Typography
} from 'material-ui';
import { Security as SecurityIcon } from 'material-ui-icons';
import { inject, observer } from 'mobx-react';

import BuildMultiSigForm from './BuildMultiSigForm';
import SubmitMultiSigToStellar from './SubmitToStellar';
import ActivateAccountStep from './ActivateAccountStep';

const styles = theme => ({
  actions: {
    display: 'flex'
  },
  avatar: {
    backgroundColor: theme.palette.primary.main
  },
  stepContainer: {
    padding: theme.spacing.unit * 4
  },
  stepActions: {
    display: 'flex'
  },
  nextButton: {
    marginLeft: 'auto'
  },
  addAnother: {
    cursor: 'pointer'
  }
});

@withStyles(styles)
@inject('rootStore')
@observer
class AddFirstStellarAccountCard extends React.Component {
  state = {
    isMultiSigFormValid: false,
    isExpanded: false
  };

  constructor(props) {
    super(props);

    this.state = {
      isMultiSigFormValid: false,
      isExpanded: !(props.rootStore.currentUser.accounts || []).length
    };
  }

  get uiState() {
    return this.props.rootStore.uiState.addStellarUiState;
  }

  get activeStep() {
    return this.uiState.step;
  }

  goBack() {
    this.uiState.goBack();
  }

  goNext() {
    this.uiState.goNext();
  }

  onIsMultiSigValidChange = isMultiSigFormValid => {
    this.setState({ isMultiSigFormValid });
  };

  handleMultiSigSubmit = () => {
    this.goNext();
  };

  expandForm = () => {
    this.setState({ isExpanded: true });
  };

  render() {
    const { classes } = this.props;
    const { isExpanded } = this.state;

    return (
      <Card>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              <SecurityIcon />
            </Avatar>
          }
          title="Link Stellar Account"
          subheader="Add Multi-Sig to your Stellar account to activate StellarGuard"
        />
        {!isExpanded && (
          <CardContent>
            <Typography
              className={classes.addAnother}
              color="primary"
              onClick={this.expandForm}
            >
              Add Another Account
            </Typography>
          </CardContent>
        )}
        <Collapse in={isExpanded} timeout="auto">
          <CardContent>
            <Stepper activeStep={this.activeStep} alternativeLabel>
              <Step>
                <StepLabel>Build Multi-Sig Transaction</StepLabel>
              </Step>
              <Step>
                <StepLabel>
                  Sign &amp; Submit it to the Stellar Network
                </StepLabel>
              </Step>
              <Step>
                <StepLabel>Activate StellarGuard</StepLabel>
              </Step>
            </Stepper>
            <Paper className={classes.stepContainer} elevation={3}>
              {this.activeStep === 0 && (
                <Fragment>
                  <BuildMultiSigForm
                    onIsValidChange={this.onIsMultiSigValidChange}
                    onSubmit={this.handleMultiSigSubmit}
                  />
                  <div className={classes.stepActions}>
                    <Button
                      type="submit"
                      color="primary"
                      form="build-multisig-form"
                      className={classes.nextButton}
                      disabled={!this.state.isMultiSigFormValid}
                    >
                      Next
                    </Button>
                  </div>
                </Fragment>
              )}
              {this.activeStep === 1 && (
                <Fragment>
                  <SubmitMultiSigToStellar />
                  <div className={classes.stepActions}>
                    <Button onClick={() => this.goBack()}>Back</Button>
                    <Button
                      color="primary"
                      className={classes.nextButton}
                      onClick={() => this.goNext()}
                    >
                      Activate
                    </Button>
                  </div>
                </Fragment>
              )}
              {this.activeStep === 2 && (
                <Fragment>
                  <ActivateAccountStep />
                  <div className={classes.stepActions}>
                    <Button onClick={() => this.goBack()}>Back</Button>
                  </div>
                </Fragment>
              )}
            </Paper>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

export default AddFirstStellarAccountCard;
