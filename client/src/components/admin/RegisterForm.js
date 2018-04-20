import React from 'react';
import {Button, Grid, Icon, LinearProgress, Paper, TextField, Typography} from 'material-ui';
import FormField from '../../templates/FormField';

const formFields = [
  {key: 'name', label: 'Name'},
  {key: 'details', label: 'Details'},
  {key: 'barcode', label: 'Barcode'},
  {key: 'count', label: 'Count'},
];

const initialForm = {
  name: '',
  details: '',
  barcode: '',
  count: '',
};

export default class RegisterForm extends React.Component {
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

  _submitForm() {
    this.props.registerAsset(this.state.form);
  }

  render() {
    return <Grid container direction={'column'} style={{width: '550px'}}>
      <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
        <div style={{flex: 1}}>
          <Typography variant="headline" style={{margin: '20px 30px 0 30px'}}>
            Register Asset
          </Typography>

          <div style={{padding: '30px'}}>
           {formFields.map((item, i) => {
             return <FormField key={i} label={item.label}>
               <TextField name={item.key} value={this.state.form[item.key]} fullWidth={true} onChange={e => this._handleChange(item.key, e.target.value)}/>
             </FormField>
           })}
          </div>
        </div>

        <Paper>
          {this.props.isRegisteringAsset && <LinearProgress />}
          <Grid container justify={'flex-end'} style={{padding: '20px'}}>
            <Button variant="raised" color="primary" onClick={() => this._submitForm()}><span><Icon className={'fas fa-save'} style={{fontSize: '14px'}}/>&nbsp;&nbsp;Save</span></Button>
          </Grid>
        </Paper>
      </div>
    </Grid>
  }
}