import styled from 'styled-components/native';
import { Button } from 'native-base';

export const StyledButton = styled(Button)`
	margin-bottom: 15px;
	height: 44px;
	width: ${props => (props.width ? props.width : '160px')};
	background-color: ${props => (props.backgroundColor ? props.backgroundColor : '#16d2aa')};
	border: ${props => (props.border ? '1px solid #D6E0EF' : 'none')};
	border-radius: 22px;
	box-shadow: none;
	align-self: center;
	text-align: center;
`;
