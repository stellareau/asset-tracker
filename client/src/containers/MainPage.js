import { connect } from 'react-redux';
import Main from '../components/Main';

const mapStateToProps = (state, ownProps) => {
  return {
    isLoading: state.checkout.isSubmittingSurvey,
    isCheckingOut: state.checkout.isCheckingOut,
    isSubmittingSurvey: state.checkout.isSubmittingSurvey,
    isScanningItemToStocktake: state.stocktake.isScanningItemToStocktake,
    isUpdatingStocktakeItem: state.stocktake.isUpdatingStocktakeItem,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
};

const MainPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default MainPage;
