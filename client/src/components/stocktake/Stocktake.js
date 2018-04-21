import React from 'react';
import _ from 'lodash';
import {Button, Grid, Hidden, Icon, IconButton, Input, InputAdornment, Typography} from 'material-ui';
import StocktakeScan from './StocktakeScan';
import StocktakeSummaryDetails from './StocktakeSummaryDetails';
import StocktakeTable from './StocktakeTable';
import MainPageLayout from '../../templates/MainPageLayout';

export default class Stocktake extends React.Component {
  constructor(props) {
    super(props);

    this.props.getStocktakeItems();

    this.state = {
      stocktakePage: -1,
      err: ''
    };
  }

  _handleChange(value) {
    this.setState({
      mobileStocktakeNumber: value
    })
  }

  _startStocktake() {
    let item = this.props.stocktakeItems.find(x => {
      return this.state.mobileStocktakeNumber === x.number
    });

    if (_.isUndefined(item)) {
      this.setState({
        err: 'Unable to find the stocktake number ' + this.state.mobileStocktakeNumber
      })
    }

    if(item.status === 'New') {
      item.status = 'In Progress';
    }

    this.props.updateStocktakeItem(item);
  }

  render() {
    return <Grid container>
      <Hidden smDown>
        { !_.isEmpty(this.props.stocktakeItem) ?
          <MainPageLayout title={'Summary - ' + this.props.stocktakeItem.number}
                          disableSearchbar={true}
                          table={<StocktakeSummaryDetails stocktakeItem={this.props.stocktakeItem}
                                                          getStocktakeItem={this.props.getStocktakeItem}
                          />}/>
        :
          <MainPageLayout title={'Stocktake'}
                          table={<StocktakeTable selectStocktakeItem={this.props.selectStocktakeItem}
                                                 stocktakeItems={this.props.stocktakeItems}
                          />}>
          <Button variant="fab" style={{position: 'absolute', bottom: 40, right: 40}} color="primary" onClick={() => this.props.createStocktakeItem()}>
            <Icon className={'fas fa-plus'}/>
          </Button>
          </MainPageLayout>
        }
      </Hidden>

      {/* Mobile view*/}
      <Hidden mdUp>
        {this.props.validStocktake ?
          <StocktakeScan/>
          :
          <Grid container justify={'center'} style={{padding: '10px 20px'}}>
            <Typography variant={'display1'} style={{marginBottom: '30px'}}>
              Stocktake Scanner
            </Typography>

            <Input style={{width: '280px'}} placeholder={'Enter the stocktake number'}
                   value={this.state.mobileStocktakeNumber} onChange={(e) => this._handleChange(e.target.value)}
                   endAdornment={
                     <InputAdornment position="end">
                       <IconButton onClick={() => this._startStocktake()}>
                         <Icon className={'fas fa-search'}/>
                       </IconButton>
                     </InputAdornment>
                   }/>
          </Grid>
        }
      </Hidden>
      </Grid>

  }
}

Stocktake.propTypes = {};