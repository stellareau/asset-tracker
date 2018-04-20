import {config} from '../config';
import {getAssetList, toggleRegisterDrawer} from './assets';

export const REGISTER_ASSET_PENDING = 'REGISTER_ASSET_PENDING';
export const REGISTER_ASSET_SUCCESS = 'REGISTER_ASSET_SUCCESS';

export function registerAsset(asset) {
  return async dispatch => {
    dispatch({
      type: REGISTER_ASSET_PENDING
    });

    const url = config.url + config.apis.asset + '/register';
    const options = {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(asset)
    };

    let res = await fetch(url, options);

    switch(res.status) {
      case 201:
        dispatch(toggleRegisterDrawer(false));
        dispatch(getAssetList());
        return dispatch({
          type: REGISTER_ASSET_SUCCESS
        })
    }
  }
}