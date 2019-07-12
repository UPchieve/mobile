import React, { useEffect } from 'react';
import { Container, Spinner } from '../../components';
import { goToSignIn, goToHome } from '../../../navigators/navigation';

export interface Props {}

interface State {}

class Initializing extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		this.getStatus();
	}

	getStatus = () => {
		const user = null;
		if (user) {
            // await goToHome();
            setTimeout(() => {
                goToHome()
            }, 3000)
		} else {
            // await goToSignIn();
            setTimeout(() => {
				goToSignIn();
			}, 3000);
		}
	};

	render() {
		return (
			<Container isCenter>
				<Spinner />
			</Container>
		);
	}
}

export default Initializing;
