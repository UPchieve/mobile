import { connect } from 'react-redux';

import Component from './Component';
import { modalLaunched } from '../../../../../shared/redux/actions';

const mapStateToProps = state => ({});

const actionCreators = {
	modalLaunched,
};

const legalContainer = connect(
	mapStateToProps,
	actionCreators
)(Component);

export default legalContainer;
