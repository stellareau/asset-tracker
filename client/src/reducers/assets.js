import {
  DELETE_ASSET_PENDING, DELETE_ASSET_SUCCESS,
  GET_ASSET_LIST_PENDING, GET_ASSET_LIST_SUCCESS, ON_CHANGE_ASSET, SELECT_ASSET, TOGGLE_ASSET_DRAWER,
  TOGGLE_REGISTER_DRAWER, UPDATE_ASSET_PENDING, UPDATE_ASSET_SUCCESS
} from '../actions/assets';

const initialState = {
  assetList: [],
  asset: {},
  isAssetDrawerOpen: false,
  isRegisterDrawerOpen: false,
  isUpdatingAsset: false,
  isDeletingAsset: false
};

export function assets(state = initialState, action) {
  switch(action.type) {
    case SELECT_ASSET: {
      return {
        ...state,
        asset: action.asset
      }
    }
    case ON_CHANGE_ASSET: {
      return {
        ...state,
        asset: {...state.asset, [action.key]: action.value}
      }

    }
    case TOGGLE_ASSET_DRAWER: {
      return {
        ...state,
        isAssetDrawerOpen: action.open
      }
    }
    case TOGGLE_REGISTER_DRAWER: {
      return {
        ...state,
        isRegisterDrawerOpen: action.open
      }
    }
    case GET_ASSET_LIST_PENDING: {
      return state;
    }
    case GET_ASSET_LIST_SUCCESS: {
      return {
        ...state,
        assetList: action.assetList
      }
    }
    case UPDATE_ASSET_PENDING: {
      return {
        ...state,
        isUpdatingAsset: true
      }
    }
    case UPDATE_ASSET_SUCCESS: {
      return {
        ...state,
        isUpdatingAsset: false
      }
    }
    case DELETE_ASSET_PENDING: {
      return {...state,
        isDeletingAsset: true
      }
    }
    case DELETE_ASSET_SUCCESS: {
      return {...state,
        isDeletingAsset: false
      }
    }
    default:
      return state
  }
}