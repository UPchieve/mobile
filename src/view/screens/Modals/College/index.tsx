import { connect } from 'react-redux';
import Component from './Component';
import { getSession } from '../../../../../shared/redux/constants/actions';

const actionCreators = {
	getSession,
};

const collegeContainer = connect(
	null,
	actionCreators
)(Component);

export default collegeContainer;
