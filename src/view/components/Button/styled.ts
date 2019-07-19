import styled from 'styled-components/native';
import { Button } from 'native-base';

export const StyledButton = styled(Button)`
	margin-bottom: 15px;
      height: 40px;
      width: ${props => (props.width ? props.width : '160px')};
	background-color: #16d2aa;
	border-radius: 20px;
`;
