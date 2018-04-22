import React from 'react';
import PropTypes from 'prop-types';
import {Button, Paper, Step, StepContent, StepLabel, Stepper, Typography} from 'material-ui';
import {config} from '../../config';

function getSteps() {
  return ['Create a new stocktake entry', 'Connect your phone', 'Scan an asset'];
}

function getStepContent(step, item) {
  switch (step) {
    case 0:
      return `Placeholder text`;
    case 1:
      return <span>Go to <strong>{config.url}/stocktake</strong> on your mobile, login when prompted and enter the code
        <strong> {item.number}</strong></span>;
    case 2:
      return `Type in the barcode of an item to start the stocktake or alternatively turn on the camera feature and scan a barcode`;
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

  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.stocktakeItem !== this.props.stocktakeItem) {
      console.log(nextProps.stocktakeItem, this.props.stocktakeItem);
      // Check if the state has changed from new to in progress
      if(this.props.stocktakeItem.status === 'New' && nextProps.stocktakeItem.status === 'In Progress') {
        console.log('setting activeSTep');
        this.setState({
          activeStep: 2
        })
      }
    }
  }

  componentDidMount() {
    if (this.props.stocktakeItem.status === 'In Progress' && this.props.stocktakeItem.startedBy.length === 0) {
      this.setState({
        activeStep: 2
      })
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
                <Typography>{getStepContent(index, this.props.stocktakeItem)}</Typography>
              </StepContent>
            </Step>
          );
        })}
      </Stepper>
    </Paper>
  }
}

StocktakeTutorial.propTypes = {};