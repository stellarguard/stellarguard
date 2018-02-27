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
  Paper
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
  }
});

@withStyles(styles)
@inject('rootStore')
@observer
class AddFirstStellarAccountCard extends React.Component {
  state = {
    isMultiSigFormValid: false
  };

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

  handleMultiSigSubmit = async values => {
    await this.uiState.buildMultiSigTransaction(values);
    this.goNext();
  };

  render() {
    const { classes } = this.props;

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
        <CardContent>
          <Stepper activeStep={this.activeStep} alternativeLabel>
            <Step>
              <StepLabel>Build Multi-Sig Transaction</StepLabel>
            </Step>
            <Step>
              <StepLabel>Sign &amp; Submit it to the Stellar Network</StepLabel>
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
            {this.activeStep === 3 && (
              <Fragment>
                <DoneActivatingAccountStep />
              </Fragment>
            )}
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

export default AddFirstStellarAccountCard;
