import { connect } from 'react-redux';

import Component from './Component';
import { saveUser } from '../../../../shared/redux/constants/actions';

const mapStateToProps = () => ({});

const actionCreators = {
	saveUser,
};

const signinContainer = connect(
	mapStateToProps,
	actionCreators
)(Component);

export default signinContainer;
