import { connect } from 'react-redux';
import Component from './Component';
import { endSession } from '../../../../../shared/redux/actions';

const actionCreators = {
	endSession,
};

const confirmationModalContainer = connect(
	null,
	actionCreators
)(Component);

export default confirmationModalContainer;
