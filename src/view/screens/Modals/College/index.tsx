import { connect } from 'react-redux';
import Component from './Component';
import { sessionStarted } from '../../../../../shared/redux/constants/actions';

const actionCreators = {
	sessionStarted,
};

const collegeContainer = connect(
	null,
	actionCreators
)(Component);

export default collegeContainer;
