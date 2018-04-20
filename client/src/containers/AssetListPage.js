import {connect} from 'react-redux';
import AssetList from '../components/assetList/AssetList';
import {
  deleteAsset, getAssetList, onChangeAsset, selectAsset, toggleAssetDrawer, toggleRegisterDrawer,
  updateAsset
} from '../actions/assets';

const mapStateToProps = (state, ownProps) => {
  return {
    isAssetDrawerOpen: state.assets.isAssetDrawerOpen,
    isRegisterDrawerOpen: state.assets.isRegisterDrawerOpen,
    asset: state.assets.asset,
    assetList: state.assets.assetList,
    isUpdatingAsset: state.assets.isUpdatingAsset,
    isDeletingAsset: state.assets.isDeletingAsset
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleAssetDrawer: (open) => dispatch(toggleAssetDrawer(open)),
    toggleRegisterDrawer: (open) => dispatch(toggleRegisterDrawer(open)),
    getAssetList: () => dispatch(getAssetList()),
    selectAsset: (asset) => dispatch(selectAsset(asset)),
    onChangeAsset: (key, value) => dispatch(onChangeAsset(key, value)),
    deleteAsset: () => dispatch(deleteAsset()),
    updateAsset: () => dispatch(updateAsset())
  }
};

const AssetListPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AssetList);

export default AssetListPage;
