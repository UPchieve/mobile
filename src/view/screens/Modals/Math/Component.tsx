import * as React from 'react';
import { View } from 'react-native';
import { Content, ListItem, Toast } from 'native-base';
import { H1 } from '../../../components/Text'
import { Button }  from '../../../components';
import TopBar from '../../TopBar'


export interface Props {
	menuOpen: boolean;
}

interface State {
	overlayShown: boolean;
}

export default class MathModal extends React.Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	render() {
		return (
			<View style={styles.container}>
				<TopBar backButton color={'#1855D1'} />
				<View style={styles.content}>
					<H1 style={styles.header}>Choose a math subject</H1>
          <Button>Algebra</Button>
				</View>
			</View>
		);
	}
}

const styles = {
	container: {
    backgroundColor: '#1855D1',
    width: '100%',
    height: '100%',
  },
  content: {
    marginTop: 80,
    borderTopLeftRadius: 40,
    borderTopEndRadius: 40,
    paddingTop: 30,
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    width: '100%',
    textAlign: 'center'
  }
};
