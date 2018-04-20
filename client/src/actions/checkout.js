import {config} from '../config';
import history from '../history';

export const CHECKOUT_ASSET_PENDING = 'CHECKOUT_ASSET_PENDING';
export const CHECKOUT_ASSET_SUCCESS = 'CHECKOUT_ASSET_SUCCESS';
export const CHECKOUT_ASSET_ERROR = 'CHECKOUT_ASSET_ERROR';
export const CHECKOUT_ASSET_RETURN = 'CHECKOUT_ASSET_RETURN';

export function checkoutAsset(barcode) {
  return async dispatch => {
    dispatch({
      type: CHECKOUT_ASSET_PENDING
    });

    const url = config.url + config.apis.asset + '/checkout';
    const options = {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({'barcodeNumber': barcode})
    };

    let res = await fetch(url, options);
    let data = await res.json();

    switch(res.status) {
      case 201:
        return dispatch({
          type: CHECKOUT_ASSET_SUCCESS,
          transactionId: data.transactionId
        });
      case 202:
        return dispatch({
          type: CHECKOUT_ASSET_RETURN
        });
      case 404:
        return dispatch({
          type: CHECKOUT_ASSET_ERROR,
          message: 'Unable to find ' + barcode + '. Scan again or type it in manually'
        });
      case 500:
        return dispatch({
          type: CHECKOUT_ASSET_ERROR,
          message: data.message
        });
      default:
        throw new Error('Failed')
    }
  }
}

export const SUBMIT_SURVEY_PENDING = 'SUBMIT_SURVEY_PENDING';
export const SUBMIT_SURVEY_SUCCESS = 'SUBMIT_SURVEY_SUCCESS';

export function submitSurvey(form) {
  return async (dispatch, getState) => {
    dispatch({
      type: SUBMIT_SURVEY_PENDING
    });

    const url = config.url + config.apis.asset + '/checkout/' + getState().checkout.transactionId;
    const options = {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(form)
    };

    let res = await fetch(url, options);

    switch(res.status) {
      case 201:
        history.push('/');
        return dispatch({
          type: SUBMIT_SURVEY_SUCCESS
        });
      default:
        throw new Error('Failed')
    }
  }
}

export const CHECKIN_ASSET_PENDING = 'CHECKIN_ASSET_PENDING';
export const CHECKIN_ASSET_SUCCESS = 'CHECKIN_ASSET_SUCCESS';
export const CHECKIN_ASSET_ERROR = 'CHECKIN_ASSET_ERROR';

export function checkinAsset(barcode) {
  return async dispatch => {
    dispatch({
      type: CHECKIN_ASSET_PENDING
    });

    const url = config.url + config.apis.asset + '/checkin';
    const options = {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({barcodeNumber: barcode})
    };

    let res = await fetch(url, options);

    switch(res.status) {
      case 200:
        history.push('/');
        return dispatch({
          type: CHECKIN_ASSET_SUCCESS
        });
      default:
        return dispatch({
          type: CHECKIN_ASSET_ERROR
        })
    }
  }
}