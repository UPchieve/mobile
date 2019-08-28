import { connect } from 'react-redux';
import Component from './Component';
import { toggleMenu, modalLaunched } from '../../../../shared/redux/actions';

const mapStateToProps = state => {
	return { menuOpen: state.ui.menuOpen };
};

const menuContainer = connect(
	mapStateToProps,
	{ toggleMenu, modalLaunched }
)(Component);

export default menuContainer;
