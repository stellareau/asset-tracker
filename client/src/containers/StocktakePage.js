import { connect } from 'react-redux';
import Stocktake from '../components/stocktake/Stocktake';
import {
  createStocktakeItem, getStocktakeItem, getStocktakeItems, scanItemToStocktake, selectStocktakeItem,
  updateStocktakeItem
} from '../actions/stocktake';

const mapStateToProps = (state, ownProps) => {
  return {
    stocktakeItems: state.stocktake.stocktakeItems,
    stocktakeItem: state.stocktake.stocktakeItem
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getStocktakeItems: () => dispatch(getStocktakeItems()),
    createStocktakeItem: () => dispatch(createStocktakeItem()),
    updateStocktakeItem: (item) => dispatch(updateStocktakeItem(item)),
    getStocktakeItem: () => dispatch(getStocktakeItem()),
    scanItemToStocktake: () => dispatch(scanItemToStocktake()),
    selectStocktakeItem: (item) => dispatch(selectStocktakeItem(item))
  }
};

const StocktakePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Stocktake);

export default StocktakePage;
