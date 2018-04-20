import { connect } from 'react-redux';
import CheckoutAsset from '../components/checkout/CheckoutAsset';
import {checkinAsset, checkoutAsset, submitSurvey} from '../actions/checkout';

const mapStateToProps = (state, ownProps) => {
  return {
    error: state.checkout.error,
    isCheckingOut: state.checkout.isCheckingOut,
    checkoutPage: state.checkout.checkoutPage,
    transactionId: state.checkout.transactionId,
    isSubmittingSurvey: state.checkout.isSubmittingSurvey,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    checkoutAsset: (barcode) => dispatch(checkoutAsset(barcode)),
    submitSurvey: (form) => dispatch(submitSurvey(form)),
    checkinAsset: (barcode) => dispatch(checkinAsset(barcode)),
  }
};

const CheckoutAssetPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutAsset);

export default CheckoutAssetPage;
