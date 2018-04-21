import {config} from '../config';

export const SELECT_STOCKTAKE_ITEM = 'SELECT_STOCKTAKE_ITEM';

export function selectStocktakeItem(item) {
  return {
    type: SELECT_STOCKTAKE_ITEM,
    stocktakeItem: item
  }
}

export const GET_STOCKTAKE_ITEMS_PENDING = 'GET_STOCKTAKE_ITEMS_PENDING';
export const GET_STOCKTAKE_ITEMS_SUCCESS = 'GET_STOCKTAKE_ITEMS_SUCCESS';
export const GET_STOCKTAKE_ITEMS_ERROR = 'GET_STOCKTAKE_ITEMS_ERROR';

export function getStocktakeItems() {
  return async dispatch => {
    dispatch({
      type: GET_STOCKTAKE_ITEMS_PENDING
    });

    const url = config.url + config.apis.stocktake;
    const options = {
      method: 'GET',
      headers: config.headers
    };

    const res = await fetch(url, options);

    switch(res.status) {
      case 200:
        const data = await res.json();
        return dispatch({
          type: GET_STOCKTAKE_ITEMS_SUCCESS,
          stocktakeItems: data.sort((a, b) =>{
            if (a.dateStarted > b.dateStarted) return -1;
            else return 1
          })
        });
      default:
        return dispatch({
          type: GET_STOCKTAKE_ITEMS_ERROR
        })
    }
  }
}

export const CREATE_STOCKTAKE_ITEM_PENDING = 'CREATE_STOCKTAKE_ITEM_PENDING';
export const CREATE_STOCKTAKE_ITEM_SUCCESS = 'CREATE_STOCKTAKE_ITEM_SUCCESS';
export const CREATE_STOCKTAKE_ITEM_ERROR = 'CREATE_STOCKTAKE_ITEM_ERROR';

export function createStocktakeItem() {
  return async dispatch => {
    dispatch({
      type: CREATE_STOCKTAKE_ITEM_PENDING
    });

    const url = config.url + config.apis.stocktake;
    const options = {
      method: 'POST',
      headers: config.headers
    };

    const res = await fetch(url, options);

    switch(res.status) {
      case 201:
        dispatch(getStocktakeItems());
        return dispatch({
          type: CREATE_STOCKTAKE_ITEM_SUCCESS
        });
      default:
        return dispatch({
          type: CREATE_STOCKTAKE_ITEM_ERROR
        })
    }
  }
}

export const UPDATE_STOCKTAKE_ITEM_PENDING = 'UPDATE_STOCKTAKE_ITEM_PENDING';
export const UPDATE_STOCKTAKE_ITEM_SUCCESS = 'UPDATE_STOCKTAKE_ITEM_SUCCESS';
export const UPDATE_STOCKTAKE_ITEM_ERROR = 'UPDATE_STOCKTAKE_ITEM_ERROR';

export function updateStocktakeItem(item) {
  return async dispatch => {
    dispatch({
      type: UPDATE_STOCKTAKE_ITEM_PENDING
    });

    const url = config.url + config.apis.stocktake;
    const options = {
      method: 'PUT',
      headers: config.headers,
      body: JSON.stringify(item)
    };

    const res = await fetch(url, options);

    switch(res.status) {
      case 200:
        return dispatch({
          type: UPDATE_STOCKTAKE_ITEM_SUCCESS
        });
      default:
        return dispatch({
          type: UPDATE_STOCKTAKE_ITEM_ERROR
        })
    }
  }
}

export const GET_STOCKTAKE_ITEM_PENDING = 'GET_STOCKTAKE_ITEM_PENDING';
export const GET_STOCKTAKE_ITEM_SUCCESS = 'GET_STOCKTAKE_ITEM_SUCCESS';
export const GET_STOCKTAKE_ITEM_ERROR = 'GET_STOCKTAKE_ITEM_ERROR';

export function getStocktakeItem() {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_STOCKTAKE_ITEM_PENDING
    });

    const url = config.url + config.apis.stocktake + '/' + getState().stocktake.stocktakeItem.number;
    const options = {
      method: 'GET',
      headers: config.headers,
    };

    const res = await fetch(url, options);

    switch(res.status) {
      case 200:
        const data = await res.json();
        return dispatch({
          type: GET_STOCKTAKE_ITEM_SUCCESS,
          stocktakeItem: data[0]
        });
      default:
        return dispatch({
          type: GET_STOCKTAKE_ITEM_ERROR
        })
    }
  }
}

export const SCAN_ITEM_TO_STOCKTAKE_PENDING = 'SCAN_ITEM_TO_STOCKTAKE_PENDING';
export const SCAN_ITEM_TO_STOCKTAKE_SUCCESS = 'SCAN_ITEM_TO_STOCKTAKE_SUCCESS';
export const SCAN_ITEM_TO_STOCKTAKE_ERROR = 'SCAN_ITEM_TO_STOCKTAKE_ERROR';

export function scanItemToStocktake(barcode) {
  return async (dispatch, getState) => {
    dispatch({
      type: SCAN_ITEM_TO_STOCKTAKE_PENDING
    });

    const url = config.url + config.apis.stocktake + '/' + getState().stocktake.stocktakeItem.number;
    const options = {
      method: 'POST',
      headers: config.headers,
    };

    const res = await fetch(url, options);

    switch(res.status) {
      case 200:
        return dispatch({
          type: SCAN_ITEM_TO_STOCKTAKE_SUCCESS
        });
      default:
        return dispatch({
          type: SCAN_ITEM_TO_STOCKTAKE_ERROR
        })
    }
  }
}