import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import TopBar from '../../TopBar';
import { H1, Text } from '../../../components/Text';

export interface Props {
	menuOpen: boolean;
}

interface State {
	overlayShown: boolean;
}

export default class Menu extends React.Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {};
	}
	// TODO: Add completed TOS
	render() {
		return (
			<View>
				<TopBar backButton />
				<ScrollView style={styles.content}>
					<H1>Legal Policy</H1>
					<Text fontSize={18} light style={styles.subheader}>
						Disclaimer
					</Text>
					<Text fontSize={14} light style={styles.paragraph}>
						You are solely responsible for your communications and interactions with other users and with
						other persons whom you communicate or interact with as a result of the Website or Services. You
						understand that UPchieve makes no representations or warranties as to the conduct of other users
						of the website. UPchieve encourages you to take reasonable precautions when using the app and to
						refrain from sharing personally identifiable information (such as your phone number, email
						address, full name, etc.).
					</Text>
					<Text fontSize={18} light style={styles.subheader}>
						Terms of Service
					</Text>
					<Text fontSize={14} light style={styles.paragraph}>
						These Terms of Service (“Terms” or “Terms of Service”) explain your rights and obligations in
						using app.upchieve.org (“Website”), owned and operated by UPchieve (“UPchieve” or “we” or “us”).
						We refer to our Website visitors as users ("Users"), whether as a guest, registered user,
						volunteer, or person seeking academic services for a student or him or herself, of UPchieve’s
						Services ("Services"). These Terms, together with our Privacy Policy and Disclaimer, form the
						agreement with you regarding the use of the Website (the "Agreement"). Please read the Agreement
						carefully. By continuing to use the Services, you agree that you have read and are bound by
						these Terms. If you do not agree to these Terms, you must not use the Website or engage in
						UPchieve’s Services. IF YOU ARE A PARENT OR GUARDIAN AND YOU PROVIDE CONSENT FOR YOUR CHILD TO
						REGISTER WITH THE WEBSITE, YOU AGREE TO BE BOUND BY THESE TERMS OF SERVICE IN RESPECT OF SUCH
						CHILD’S USE OF THE WEBSITE. These Terms include important agreements about your rights and the
						rights of UPchieve, including a binding agreement about how to resolve any disputes between us
						connected to the Services. See HOW WE WILL RESOLVE CONFLICTS BETWEEN US CONCERNING THE SERVICES.
						These Terms will also govern any dispute between us in connection with the Privacy Policy.
					</Text>
				</ScrollView>
			</View>
		);
	}
}

const styles = {
	content: {
		backgroundColor: '#fff',
		marginTop: 80,
		padding: 20,
	},
	subheader: {
		marginBottom: 16,
	},
	paragraph: {
		lineHeight: 24,
		marginBottom: 24,
	},
};
