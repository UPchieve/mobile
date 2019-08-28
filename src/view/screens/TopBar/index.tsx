import { connect } from 'react-redux';
import Component from './Component';
import { toggleMenu, modalLaunched } from '../../../../shared/redux/actions';

const mapStateToProps = state => {
	return {
		user: state.user.user,
		modal: state.ui.modal,
	};
};

const actionCreators = {
	toggleMenu,
	modalLaunched,
};
const topBarContainer = connect(
	mapStateToProps,
	actionCreators
)(Component);

export default topBarContainer;
