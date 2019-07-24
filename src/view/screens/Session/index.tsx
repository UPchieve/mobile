import { connect } from 'react-redux';
import Component from './Component';


// const mapStateToProps = state => {
// 	return { menuOpen: state.ui.menuOpen };
// };

const menuContainer = connect(
  null,
  null
)(Component);

export default menuContainer;
