import React from 'react';
import {Button, Grid, Icon, IconButton, TextField, Typography} from 'material-ui';
import FormField from '../../templates/FormField';

const formFields = [
  {key: 'description', value: 'What are you going to use this item for?'},
];

const initialForm = {
  description: ''
};

export default class CheckoutDetailsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {...initialForm}
    }
  }

  _handleChange(key, value) {
    this.setState({
      form: {...this.state.form, [key]: value}
    });
  }

  render() {
    const now = new Date();

    return <Grid container direction={'column'} alignItems={'center'}>
      <Grid item xs={11}>

        <Typography variant={'headline'} style={{marginTop: '20px', textAlign: 'center'}}>
          <Grid container justify={'center'} style={{marginBottom: '10px'}}>
              <Icon className={'fas fa-check-circle'} style={{fontSize: '2.5em', color: '#66BB6A'}}/>
          </Grid>

          <span style={{fontSize: '1em'}}>Successfully checked out item! <br/> The return date is:</span>
          <div style={{margin: '15px 0 25px 0'}}>
            <strong>{(new Date(now.setDate(now.getDate()+7))).toDateString()}</strong>
          </div>
        </Typography>

        {/*<Typography variant={'subheading'}>*/}
          {/*Transaction number - {this.props.transactionId}*/}
        {/*</Typography>*/}

        <Typography variant={'body1'}>
          Provide some information on how you're going to use the asset:
        </Typography>

        {formFields.map((item, i) => {
          return <FormField key={i} label={item.label} fullWidth={true}>
            <TextField value={this.state.form[item.key]} fullWidth={true} multiline={true} onChange={(e) => this._handleChange(item.key, e.target.value)}/>
          </FormField>
        })}

        <Grid container justify={'flex-end'}>
          <Button variant={'raised'} color={'primary'} onClick={() => this.props.submitSurvey(this.state.form)}>
            Finish
          </Button>
        </Grid>
      </Grid>
    </Grid>
  }
}

CheckoutDetailsForm.propTypes = {};