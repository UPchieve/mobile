import { connect } from 'react-redux';
import Component from './Component';

const mapStateToProps = state => {
	return { menuOpen: state.ui.menuOpen };
};

const Menu = connect(
	mapStateToProps,
	null
)(Component);

export default Menu;
