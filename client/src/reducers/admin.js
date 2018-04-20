import {REGISTER_ASSET_PENDING, REGISTER_ASSET_SUCCESS} from '../actions/admin';

const initialState = {
  isRegisteringAsset: false
};

export function admin(state = initialState, action) {
  switch(action.type) {
    case REGISTER_ASSET_PENDING: {
      return {
        ...state,
        isRegisteringAsset: true
      }
    }
    case REGISTER_ASSET_SUCCESS: {
      return {
        ...state,
        isRegisteringAsset: false
      }
    }
    default:
      return state
  }
}