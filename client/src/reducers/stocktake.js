import {
  GET_STOCKTAKE_ITEM_SUCCESS,
  GET_STOCKTAKE_ITEMS_ERROR, GET_STOCKTAKE_ITEMS_PENDING,
  GET_STOCKTAKE_ITEMS_SUCCESS, SELECT_STOCKTAKE_ITEM, UPDATE_STOCKTAKE_ITEM_SUCCESS
} from '../actions/stocktake';

const initialState = {
  isFetchingStocktakeItems: false,
  stocktakeItems: [],
  stocktakeItem: {},
  validStocktake: false,
};

export function stocktake(state = initialState, action) {
  switch(action.type) {
    case SELECT_STOCKTAKE_ITEM: {
      return {
        ...state,
        stocktakeItem: action.stocktakeItem
      }
    }
    case GET_STOCKTAKE_ITEMS_PENDING: {
      return {
        ...state,
        isFetchingStocktakeItems: true
      }
    }
    case GET_STOCKTAKE_ITEMS_SUCCESS: {
      return {
        ...state,
        stocktakeItems: action.stocktakeItems,
        isFetchingStocktakeItems: false,
      }
    }
    case GET_STOCKTAKE_ITEMS_ERROR: {
      return {
        ...state,
        isFetchingStocktakeItems: false,
      }
    }
    case GET_STOCKTAKE_ITEM_SUCCESS: {
      return {
        ...state,
        stocktakeItem: action.stocktakeItem
      }
    }
    case UPDATE_STOCKTAKE_ITEM_SUCCESS: {
      return {
        ...state,
        validStocktake: true
      }
    }
    default:
      return state;
  }
}