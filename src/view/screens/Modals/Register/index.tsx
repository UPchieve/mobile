import { connect } from 'react-redux';
import Component from './Component';
import { saveUser } from '../../../../../shared/redux/constants/actions';

const actionCreators = {
	saveUser,
};

const registerModalContainer = connect(
	null,
	actionCreators
)(Component);

export default registerModalContainer;
