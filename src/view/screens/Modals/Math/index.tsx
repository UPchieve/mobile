import { connect } from 'react-redux';
import Component from './Component';
import { getSession } from '../../../../../shared/redux/actions';

const actionCreators = {
	getSession,
};

const mathModalContainer = connect(
	null,
	actionCreators
)(Component);

export default mathModalContainer;
