import React from 'react';
import PropTypes from 'prop-types';
import {Button, Grid, Icon, IconButton, Input, InputAdornment, TextField} from 'material-ui';
import FormField from '../../templates/FormField';
import Scanner from '../../templates/Scanner';

const styles = {
  iconButton: {
    width: '50px',
    height: '50px',
  },
};

export default class StocktakeScan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scanning: false
    }
  }

  _scan() {
    this.setState({scanning: !this.state.scanning});
  }

  _onDetected(result) {

  }

  _addToStocktakeCount() {

  }

  _handleInputChange(value) {
    this.setState({
      barcode: value
    })
  }

  render() {
    return <Grid container justify={'center'} style={{height: 'calc(100vh - 64px)', overflow: 'hidden'}}>
      <Grid item xs={11}>
        <Grid container direction={'row'}>
          <FormField label={'Stocktake ID'}>
            <div style={{display: 'flex', justifyContent: 'space-between', margin: '8px 0 0 20px'}}>
              <div style={{marginTop: '8px'}}>STK0001</div>
            </div>
          </FormField>
        </Grid>
        <FormField label={'Count'}>
          <div style={{margin: '10px 0 0 20px'}}>2</div>
        </FormField>
        <FormField label={'Barcode'}>
          <Input style={{marginLeft: '10px'}} placeholder={'Enter or scan barcode'}
                 value={this.state.barcode}
                 onChange={(e) => this._handleInputChange(e.target.value)}
                 endAdornment={
                   <InputAdornment position="end">
                     <IconButton style={styles.iconButton} onClick={() => this._addToStocktakeCount()}>
                       <Icon className={'fas fa-search'}/>
                     </IconButton>
                     <IconButton style={styles.iconButton} onClick={() => this._scan()}>
                       <Icon className={'fas fa-video'}/>
                     </IconButton>
                   </InputAdornment>
                 }
          />
        </FormField>
      </Grid>
      {this.state.scanning ? <Scanner onDetected={(res) => this._onDetected(res)}/> : null}
    </Grid>
  }
}

StocktakeScan.propTypes = {};