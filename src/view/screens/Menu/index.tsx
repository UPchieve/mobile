import { connect } from 'react-redux';
import Component from './Component';
import { toggleMenu } from '../../../../shared/redux/constants/actionTypes';


const mapStateToProps = state => {
	return { menuOpen: state.ui.menuOpen };
};

const menuContainer = connect(
	mapStateToProps,
	{ toggleMenu }
)(Component);

export default menuContainer;
