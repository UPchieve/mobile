import { Text as BaseText, H1 as BaseH1 } from 'native-base'
import styled from 'styled-components/native'

/*
Custom Text Props:
  color
  fontSize
  light (Uses lighter font weight)

 */
const Text = styled.Text`
  font-family: ${props => (props.light ? 'WorkSans' : 'WorkSans-Medium')}
  font-size: ${props => (props.fontSize ? props.fontSize : `16px`)};
  color: ${props => (props.color ? props.color : '#343440')};
`;

const H1 = styled(Text)`
  font-size: 24px;
  margin-bottom: 20px;
  margin-top: 20px;
`;
const H2 = styled(Text)`
	font-size: 18px;
	font-family: WorkSans;
`;

export { Text, H1, H2 };
