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
  Button
} from 'material-ui';
import LockIcon from 'material-ui-icons/Lock';
import { inject, observer } from 'mobx-react';

import BuildMultiSigForm from './TestWrappedForm';
//import BuildMultiSigForm from './BuildMultiSigForm';
import SubmitMultiSigToStellar from './SubmitToStellar';

const styles = theme => ({
  actions: {
    display: 'flex'
  },
  avatar: {
    backgroundColor: theme.palette.primary.main
  },
  stepContainer: {
    padding: theme.spacing.unit * 2,
    border: '1px dashed #CCC'
  }
});

@inject('rootStore')
@observer
class AddFirstStellarAccountCard extends React.Component {
  resendEmail = () => {};

  render() {
    const { classes, rootStore } = this.props;
    const uiState = rootStore.uiState.addStellarUiState;

    return (
      <Card>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
          }
          title="Link Stellar Account"
          subheader="Add Multi-Sig to your account to activate StellarGuard"
        />
        <CardContent>
          <Stepper activeStep={uiState.step} alternativeLabel>
            <Step>
              <StepLabel>Build Multi-Sig Transaction</StepLabel>
            </Step>
            <Step>
              <StepLabel>Sign &amp; Submit it to the Stellar Network</StepLabel>
            </Step>
            <Step>
              <StepLabel>Activate your Account</StepLabel>
            </Step>
          </Stepper>
          <div className={classes.stepContainer}>
            {uiState.step === 0 && (
              <Fragment>
                <BuildMultiSigForm />
                <Button onClick={() => uiState.gotoStep(1)}>Next</Button>
              </Fragment>
            )}
            {uiState.step === 1 && (
              <Fragment>
                <SubmitMultiSigToStellar />
                <Button onClick={() => uiState.gotoStep(2)}>Back</Button>
                <Button onClick={() => uiState.gotoStep(2)}>Next</Button>
              </Fragment>
            )}
            {uiState.step === 2 && (
              <Fragment>
                <BuildMultiSigForm />
                <Button onClick={() => uiState.gotoStep(1)}>Next</Button>
              </Fragment>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(AddFirstStellarAccountCard);
