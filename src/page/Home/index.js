import { connect } from 'react-redux';
import { setUser } from '../../store/actions';
import Home from './home';

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => {
      dispatch(setUser(user));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
