import { connect } from 'react-redux';
import Stocktake from '../components/stocktake/Stocktake';

const mapStateToProps = (state, ownProps) => {
  return {
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
};

const StocktakePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Stocktake);

export default StocktakePage;
