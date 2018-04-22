import React from 'react';
import {Button, Fade, Grid, Icon, IconButton, Input, InputAdornment, LinearProgress, Typography} from 'material-ui';
import Scanner from '../../templates/Scanner';
import CheckoutDetailsForm from './CheckoutDetailsForm';

const styles = {
  icon: {
    fontSize: 16
  }
};

export default class RegisterAsset extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scanning: false,
      results: [],
      barcode: ''
    }
  }

  _scan() {
    this.setState({scanning: !this.state.scanning});
  }

  _onDetected(result) {
    console.log(result.codeResult.code);

    this.setState({
      barcode: result.codeResult.code
    });

    // Only send request if not already checking out
    if (!this.props.isCheckingOut)
      this.props.checkoutAsset(result.codeResult.code);
  }

  _handleChange(value) {
    this.setState({
      barcode: value
    })
  }

  render() {
    return <div>
      { this.props.checkoutPage === 0 &&
        <div style={{overflow: 'hidden', height: 'calc(100vh - 70px)'}}>
          <Grid container direction={'column'} alignItems={'center'}>
            <Grid item xs={12} style={{margin: '20px 0'}}>
              <Input fullWidth={true} placeholder={'Enter a barcode'} value={this.state.barcode} onChange={(e) => this._handleChange(e.target.value)} endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => this.props.checkoutAsset(this.state.barcode)}>
                    <Icon className={'fas fa-search'} style={styles.icon}/>
                  </IconButton>
                </InputAdornment>
              }/>
            </Grid>
            <Grid container justify={'center'}>
              <Grid item xs={9}>
                <Typography variant="body1" color={'textSecondary'} style={{textAlign: 'center'}}>
                  or scan the barcode of the item you would like to check out
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={() => this._scan()}>
                  <Icon className={'fas fa-video'} style={styles.icon}/>
                </IconButton>
              </Grid>
            </Grid>

            {/*{this.props.isCheckingOut && <LinearProgress/> }*/}
            {this.props.error && <Typography variant={'caption'} color={'error'}>{this.props.error}</Typography>}
            {this.state.scanning ? <Scanner onDetected={(res) => this._onDetected(res)}/> : null}
          </Grid>
        </div>
      }

      { this.props.checkoutPage === 1 &&
        <CheckoutDetailsForm transactionId={this.props.transactionId} submitSurvey={this.props.submitSurvey}/>
      }

      { this.props.checkoutPage === 2 &&
        <Grid container direction={'column'} alignItems={'center'}>
          <Grid item xs={11}>

            <Typography variant={'headline'} style={{margin: '20px 0', textAlign: 'center'}}>
              <Grid container justify={'center'} style={{marginBottom: '10px'}}>
                <Icon className={'fas fa-info-circle'} style={{fontSize: '2.5em', color: '#42A5F5'}}/>
              </Grid>

              <span style={{fontSize: '1em'}}>You are about to return this item ({this.state.barcode}). Please place to back in it's original position, then click Return.</span>
            </Typography>

            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Button variant={'raised'} color={'primary'} onClick={() => this.props.checkinAsset(this.state.barcode)}>
                Return
              </Button>
            </div>
          </Grid>
        </Grid>
      }
    </div>
  }
}

RegisterAsset.propTypes = {};