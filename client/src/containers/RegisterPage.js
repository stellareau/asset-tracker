import {connect} from 'react-redux';
import Register from '../components/admin/Register';
import {registerAsset} from '../actions/admin';

const mapStateToProps = (state, ownProps) => {
  return {
    isRegisteringAsset: state.admin.isRegisteringAsset
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    registerAsset: (asset) => dispatch(registerAsset(asset))
  }
};

const RegisterPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

export default RegisterPage;
