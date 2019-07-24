import * as React from 'react';
import { View } from 'react-native';
import { } from 'native-base';
import { H1, Text } from '../../components/Text';

export interface Props {
	menuOpen: boolean;
}

interface State {
	overlayShown: boolean;
}

export default class Session extends React.Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {};
  }
  
	render() {
		return (
			<View>
        <Text>Hello</Text>
      </View>
		);
	}
}

const styles = {
};
