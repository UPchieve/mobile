import { connect } from 'react-redux';
import Component from './Component';
import { toggleMenu } from '../../../../shared/redux/constants/actionTypes'


const mapStateToProps = state => {
	return { name: state.user.name };
};

const actionCreators = {
	toggleMenu,
};
const homeContainer = connect(
  mapStateToProps,
  actionCreators
)(Component);

export default homeContainer;
