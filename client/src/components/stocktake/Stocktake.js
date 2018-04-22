import React from 'react';
import _ from 'lodash';
import {Button, Grid, Hidden, Icon, IconButton, Input, InputAdornment, Typography} from 'material-ui';
import StocktakeScan from './StocktakeScan';
import StocktakeSummaryDetails from './StocktakeSummaryDetails';
import StocktakeTable from './StocktakeTable';
import MainPageLayout from '../../templates/MainPageLayout';
import {Route, Switch} from 'react-router';
import history from '../../history';

export default class Stocktake extends React.Component {
  constructor(props) {
    super(props);

    this.props.getStocktakeItems();

    this.state = {
      stocktakePage: -1,
      err: '',
      mobileStocktakeNumber: ''
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

    console.log(item);

    if (_.isUndefined(item)) {
      return this.setState({
        err: 'Unable to find the stocktake number ' + this.state.mobileStocktakeNumber
      })
    }

    if(item.status === 'New') {
      item.status = 'In Progress';
    }

    console.log('updated', item);

    this.props.updateStocktakeItem(item);
  }

  _completeStocktake() {
    let item = _.cloneDeep(this.props.stocktakeItem);

    item.status = 'Complete';
    delete item.items;
    delete item._id;

    this.props.updateStocktakeItem(item);
  }

  stocktakeSummary = (match) => {
      if(_.isEmpty(this.props.stocktakeItem)) {
        this.props.getStocktakeItem(match.match.params.stocktakeNumber);
        return null;
      }

      // Stocktake cancelled
      switch(this.props.stocktakeItem.status) {
        case 'Cancelled': {
          return null;
        }
        case 'Complete': {
          this.props.getStocktakeItems();
          history.push('/stocktake');
          return null;
        }
        default: {
          return <MainPageLayout title={'Stocktake - ' + this.props.stocktakeItem.number}
                          disableSearchbar={true}
                          button={<Button variant={'raised'} color={'primary'} onClick={() => this._completeStocktake()}>Complete Stocktake</Button>}
                          table={<StocktakeSummaryDetails stocktakeItem={this.props.stocktakeItem}
                                                          getStocktakeItem={this.props.getStocktakeItem}
                                                          validStocktake={this.props.validStocktake}
                          />}/>
        }
      }
  };

  render() {
    console.log(this.props.stocktakeItem);
    return <Grid container>
      <Hidden smDown>
        <Switch>
          <Route path={'/stocktake/:stocktakeNumber'} render={this.stocktakeSummary}/>
          <Route path={'/stocktake'} render={() => {
            return <MainPageLayout title={'Stocktake'}
                            table={<StocktakeTable selectStocktakeItem={this.props.selectStocktakeItem}
                                                   stocktakeItems={this.props.stocktakeItems}
                            />}>
              <Button variant="fab" style={{position: 'absolute', bottom: 40, right: 40}} color="primary" onClick={() => this.props.createStocktakeItem()}>
                <Icon className={'fas fa-plus'}/>
              </Button>
            </MainPageLayout>
          }
          }/>
        </Switch>
      </Hidden>

      {/* Mobile view*/}
      <Hidden mdUp>
        {this.props.validStocktake ?
          <StocktakeScan stocktakeItem={this.props.stocktakeItem}
                         message={this.props.message}
                         scanItemToStocktake={this.props.scanItemToStocktake}
                         isScanningItemToStocktake={this.props.isScanningItemToStocktake}/>
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

            <Typography color={'error'} variant={'caption'}>
              {this.state.err}
            </Typography>
          </Grid>
        }
      </Hidden>
      </Grid>

  }
}

Stocktake.propTypes = {};