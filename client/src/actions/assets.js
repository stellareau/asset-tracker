import {config} from '../config';

export const SELECT_ASSET = 'SELECT_ASSET';

export function selectAsset(asset) {
  return {
    type: SELECT_ASSET,
    asset: asset
  }
}

export const TOGGLE_ASSET_DRAWER = 'TOGGLE_ASSET_DRAWER';

export function toggleAssetDrawer(open) {
  return {
    type: TOGGLE_ASSET_DRAWER,
    open: open
  }
}

export const TOGGLE_REGISTER_DRAWER = 'TOGGLE_REGISTER_DRAWER';

export function toggleRegisterDrawer(open) {
  return {
    type: TOGGLE_REGISTER_DRAWER,
    open: open
  }
}

export const ON_CHANGE_ASSET = 'ON_CHANGE_ASSET';

export function onChangeAsset(key, value) {
  return {
    type: ON_CHANGE_ASSET,
    key,
    value
  }
}

export const GET_ASSET_LIST_PENDING = 'GET_ASSET_LIST_PENDING';
export const GET_ASSET_LIST_SUCCESS = 'GET_ASSET_LIST_SUCCESS';
export const GET_ASSET_LIST_ERROR = 'GET_SSET_LIST_ERROR';

export function getAssetList() {
  return async dispatch => {
    dispatch({
      type: GET_ASSET_LIST_PENDING
    });


    const url = config.url + config.apis.asset;
    const options = {
      method: 'GET',
      headers: config.headers
    };

    let res = await fetch(url, options);

    switch(res.status) {
      case 200:
        let data = await res.json();
        return dispatch({
          type: GET_ASSET_LIST_SUCCESS,
          assetList: data
        });
      default:
        return dispatch({
          type: GET_ASSET_LIST_ERROR
        })
    }
  }
}

export const UPDATE_ASSET_PENDING = 'UPDATE_ASSET_PENDING';
export const UPDATE_ASSET_SUCCESS = 'UPDATE_ASSET_SUCCESS';

export function updateAsset() {
  return async (dispatch, getState) => {
    dispatch({
      type: UPDATE_ASSET_PENDING
    });

    const updatedAsset = getState().assets.asset;
    const barcodeNumber = getState().assets.asset.barcode;

    const url = config.url + config.apis.asset + '/' + barcodeNumber;
    const options = {
      method: 'PUT',
      headers: config.headers,
      body: JSON.stringify(updatedAsset)
    };

    const res = await fetch(url, options);

    switch(res.status) {
      case 200:
        dispatch(toggleAssetDrawer(false));
        dispatch(getAssetList());
        return dispatch({
          type: UPDATE_ASSET_SUCCESS
        })
    }

  }
}

export const DELETE_ASSET_PENDING = 'DELETE_ASSET_PENDING';
export const DELETE_ASSET_SUCCESS = 'DELETE_ASSET_SUCCESS';

export function deleteAsset() {
  return async (dispatch, getState) => {
    dispatch({
      type: DELETE_ASSET_PENDING
    });

    const barcodeNumber = getState().assets.asset.barcode;

    const url = config.url + config.apis.asset + '/' + barcodeNumber;
    const options = {
      method: 'DELETE',
      headers: config.headers,
    };

    const res = await fetch(url, options);

    switch(res.status) {
      case 200:
        dispatch(toggleAssetDrawer(false));
        dispatch(getAssetList());
        return dispatch({
          type: DELETE_ASSET_SUCCESS
        })
    }
  }
}