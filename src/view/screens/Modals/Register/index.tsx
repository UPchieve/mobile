import { connect } from 'react-redux';
import Component from './Component';

const actionCreators = {
	// getSession,
};

const registerModalContainer = connect(
	null,
	actionCreators
)(Component);

export default registerModalContainer;
