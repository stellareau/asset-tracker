import {
  CHECKIN_ASSET_PENDING, CHECKIN_ASSET_SUCCESS,
  CHECKOUT_ASSET_ERROR,
  CHECKOUT_ASSET_PENDING, CHECKOUT_ASSET_RETURN, CHECKOUT_ASSET_SUCCESS, SUBMIT_SURVEY_PENDING,
  SUBMIT_SURVEY_SUCCESS
} from '../actions/checkout';

const defaultState = {
  isCheckingOut: false,
  checkoutPage: 0,
  transactionId: 0,
  isSubmittingSurvey: false,
  error: '',
};

export function checkout(state = defaultState, action) {
  switch(action.type) {
    case CHECKOUT_ASSET_PENDING: {
      return {
        ...state,
        isCheckingOut: true,
        error: '',
      }
    }
    case CHECKOUT_ASSET_SUCCESS: {
      return {
        ...state,
        isCheckingOut: false,
        checkoutPage: 1,
        transactionId: action.transactionId,
      }
    }
    case CHECKOUT_ASSET_ERROR: {
      return {
        ...state,
        isCheckingOut: false,
        error: action.message
      }
    }
    case CHECKOUT_ASSET_RETURN: {
      return {
        ...state,
        checkoutPage: 2,
        isCheckingOut: false
      }
    }
    case CHECKIN_ASSET_PENDING:
    case SUBMIT_SURVEY_PENDING: {
      return {
        ...state,
        isSubmittingSurvey: true
      }
    }
    case CHECKIN_ASSET_SUCCESS:
    case SUBMIT_SURVEY_SUCCESS: {
      return {...defaultState}
    }
    default:
      return state;
  }
}