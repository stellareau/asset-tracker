import {
  GET_STOCKTAKE_ITEM_SUCCESS,
  GET_STOCKTAKE_ITEMS_ERROR, GET_STOCKTAKE_ITEMS_PENDING,
  GET_STOCKTAKE_ITEMS_SUCCESS, SCAN_ITEM_TO_STOCKTAKE_ERROR, SCAN_ITEM_TO_STOCKTAKE_PENDING,
  SCAN_ITEM_TO_STOCKTAKE_SUCCESS, SELECT_STOCKTAKE_ITEM, UPDATE_STOCKTAKE_ITEM_ERROR, UPDATE_STOCKTAKE_ITEM_PENDING,
  UPDATE_STOCKTAKE_ITEM_SUCCESS
} from '../actions/stocktake';

const initialState = {
  message: {type: '', text: ''},
  isFetchingStocktakeItems: false,
  stocktakeItems: [],
  stocktakeItem: {},
  validStocktake: false,
  isScanningItemToStocktake: false,
  isUpdatingStocktakeItem: false
};

export function stocktake(state = initialState, action) {
  switch(action.type) {
    case SELECT_STOCKTAKE_ITEM: {
      console.log('a',action.stocktakeItem);
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
    case UPDATE_STOCKTAKE_ITEM_PENDING: {
      return {
        ...state,
        isUpdatingStocktakeItem: true
      }
    }
    case UPDATE_STOCKTAKE_ITEM_SUCCESS: {
      return {
        ...state,
        validStocktake: true,
        stocktakeItem: action.stocktakeItem,
        isUpdatingStocktakeItem: false
      }
    }
    case UPDATE_STOCKTAKE_ITEM_ERROR: {
      return {
        ...state,
        isUpdatingStocktakeItem: false
      }
    }
    case SCAN_ITEM_TO_STOCKTAKE_PENDING: {
      return {
        ...state,
        isScanningItemToStocktake: true,
        message: {type: '', text: ''}
      }
    }
    case SCAN_ITEM_TO_STOCKTAKE_SUCCESS: {
      return {
        ...state,
        isScanningItemToStocktake: false,
        message: {type: 'SUCCESS', text: `Successfully added ${action.barcode}`}
      }
    }
    case SCAN_ITEM_TO_STOCKTAKE_ERROR: {
      return {
        ...state,
        isScanningItemToStocktake: false,
        message: {type: 'ERROR', text: `Unable to find barcode number ${action.barcode}, scan again`}
      }
    }
    default:
      return state;
  }
}