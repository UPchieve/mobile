import { connect } from 'react-redux';
import Component from './Component';
import { toggleMenu, modalLaunched } from '../../../../shared/redux/actions';

// Listen in on the name of the user
const mapStateToProps = state => {
	return { user: state.user.user };
};

// Dispatch the state of the menu and subject select modals
const actionCreators = {
	toggleMenu,
	modalLaunched,
};

const homeContainer = connect(
	mapStateToProps,
	actionCreators
)(Component);

export default homeContainer;
