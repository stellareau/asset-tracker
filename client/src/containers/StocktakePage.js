import { connect } from 'react-redux';
import Stocktake from '../components/stocktake/Stocktake';
import {
  createStocktakeItem, getStocktakeItem, getStocktakeItems, scanItemToStocktake, selectStocktakeItem,
  updateStocktakeItem
} from '../actions/stocktake';

const mapStateToProps = (state, ownProps) => {
  return {
    stocktakeItems: state.stocktake.stocktakeItems,
    stocktakeItem: state.stocktake.stocktakeItem,
    validStocktake: state.stocktake.validStocktake,
    message: state.stocktake.message,
    isScanningItemToStocktake: state.stocktake.isScanningItemToStocktake
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getStocktakeItems: () => dispatch(getStocktakeItems()),
    createStocktakeItem: () => dispatch(createStocktakeItem()),
    updateStocktakeItem: (item) => dispatch(updateStocktakeItem(item)),
    getStocktakeItem: (item) => dispatch(getStocktakeItem(item)),
    scanItemToStocktake: (barcode) => dispatch(scanItemToStocktake(barcode)),
    selectStocktakeItem: (item) => dispatch(selectStocktakeItem(item))
  }
};

const StocktakePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Stocktake);

export default StocktakePage;
