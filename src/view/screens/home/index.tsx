import { connect } from 'react-redux';
import Component from './Component';
import { toggleMenu } from '../../../../shared/redux/constants/actionTypes'

// No state map needed, just dispatch toggleMenu action
const homeContainer = connect(
  null,
  { toggleMenu }
)(Component);

export default homeContainer;
