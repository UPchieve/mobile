import { connect } from 'react-redux';
import Component from './Component';
import { toggleMenu } from '../../../../shared/redux/constants/actions';

const mapStateToProps = state => {
	return {
		name: state.user.name,
		modal: state.ui.modal,
	};
};

const actionCreators = {
	toggleMenu,
};
const topBarContainer = connect(
	mapStateToProps,
	actionCreators
)(Component);

export default topBarContainer;
