import React from 'react';
import PropTypes from 'prop-types';
import {Button, Paper, Step, StepContent, StepLabel, Stepper, Typography} from 'material-ui';

function getSteps() {
  return ['Create a new stocktake entry', 'Connect your phone', 'Scan an asset'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Placeholder text`;
    case 1:
      return 'Go to URL/stocktake and enter the code STK0115';
    case 2:
      return `Type in the barcode of an item to start the stocktake or alternatively turn on the camera feature and scan the barcode`;
    default:
      return 'Unknown step';
  }
}

export default class StocktakeTutorial extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 1
    }
  }

  render() {
    const steps = getSteps();

    return <Paper>
      <Stepper activeStep={this.state.activeStep} orientation="vertical">
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{getStepContent(index)}</Typography>
              </StepContent>
            </Step>
          );
        })}
      </Stepper>
    </Paper>
  }
}

StocktakeTutorial.propTypes = {};