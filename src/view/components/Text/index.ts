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
  font-size: ${props => (props.fontSize ? props.fontSize : `20px`)};
  color: ${props => (props.color ? props.color : '#343440')};
`;

const H1 = styled(Text)`
	font-size: 28px
`;

export { Text, H1 };
