import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Content, ListItem, Icon, Container, Left, Right, Badge } from 'native-base';
import { Text, H1 } from '../../components/Text';
import styles from './style';


const links = [
	{
		key: 'Anatomy',
		route: 'Anatomy',
		icon: 'phone-portrait',
		bg: '#C5F442',
	},
	{
		key: 'Header',
		route: 'Header',
		icon: 'arrow-up',
		bg: '#477EEA',
	},
	{
		key: 'Footer',
		route: 'Footer',
		icon: 'arrow-down',
		bg: '#DA4437',
	},
	{
		key: 'Accordion',
		route: 'NHAccordion',
		icon: 'repeat',
		bg: '#C5F442',
	},
	{
		key: 'Actionsheet',
		route: 'Actionsheet',
		icon: 'easel',
		bg: '#C5F442',
	}
];

class Menu extends Component {
    travel() {
        return true;
    }

	render() {
		return (
			<Container>
				<Content bounces={false} style={{ flex: 1, backgroundColor: '#fff', top: -1 }}>
					<FlatList
                        data={links}
						renderItem={({ item }) => (
							<ListItem button noBorder onPress={() => this.travel()}>
								<Left>
									<Icon
										active
										name={item.icon}
										style={{
											color: '#777',
											fontSize: 26,
											width: 30,
										}}
									/>
									<H1 style={styles.text}>{item.key}</H1>
								</Left>
							</ListItem>
						)}
					/>
				</Content>
			</Container>
		);
	}
}

 export default Menu;