import React from 'react';
import {Button, Grid, Icon, IconButton, TextField, Typography} from 'material-ui';
import _ from 'lodash';
import AssetTable from './AssetTable';
import AssetDetails from './AssetDetails';
import history from '../../history';
import RegisterPage from '../../containers/RegisterPage';

export default class AssetList extends React.Component {
  constructor(props) {
    super(props);

    this.props.getAssetList();
  }

  _toggleDrawer(open, drawer, row) {
    switch(drawer) {
      case 'asset': {
        this.props.selectAsset(_.isUndefined(row) ? {} : this.props.assetList[row]);
        this.props.toggleAssetDrawer(open);
        this.props.toggleRegisterDrawer(false);
        break;
      }
      case 'register': {
        this.props.toggleAssetDrawer(false);
        this.props.toggleRegisterDrawer(open);
        break;
      }
    }
  };

  render() {
    return <Grid container justify={'center'}>
      <Grid item xs={10}>
        <Grid container alignItems={'center'}>
          <Grid item xs={4}>
            <Typography variant="display2" style={{margin: '0.7em 0.5em'}}>Inventory</Typography>
          </Grid>
          <Grid item xs={5} >
            <TextField placeholder={'Search for Asset'} style={{width: '90%'}}/>
            <IconButton>
              <Icon className={'fas fa-sort-amount-down'} style={{fontSize: 16}}/>
            </IconButton>
          </Grid>
        </Grid>
        <AssetTable assetList={this.props.assetList} toggleDrawer={(o, row) => this._toggleDrawer(o, 'asset', row)}/>
       </Grid>

      <AssetDetails
        assetDetails={this.props.asset}
        isDrawerOpen={this.props.isAssetDrawerOpen}
        toggleDrawer={(o) => this._toggleDrawer(o, 'asset')}
        isUpdatingAsset={this.props.isUpdatingAsset}
        isDeletingAsset={this.props.isDeletingAsset}
        deleteAsset={this.props.deleteAsset}
        updateAsset={this.props.updateAsset}
        onChangeAsset={this.props.onChangeAsset}
      />

      <RegisterPage isDrawerOpen={this.props.isRegisterDrawerOpen} toggleDrawer={(o) => this._toggleDrawer(o, 'register')}/>

      <Button variant="fab" style={{position: 'absolute', bottom: 40, right: 40}} color="primary" onClick={() => this._toggleDrawer(true, 'register')}>
        <Icon className={'fas fa-plus'}/>
      </Button>
      </Grid>
  }
}

AssetList.propTypes = {};