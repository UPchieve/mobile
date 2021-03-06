import { Navigation } from 'react-native-navigation';

import { SCREENS } from '../../constants/screen';

import * as Home from './Home';
import * as SignIn from './SignIn';
import * as Initializing from './Initializing';
import * as MathModal from './Modals/Math';
import * as RegisterModal from './Modals/Register';
import * as CollegeModal from './Modals/College';
import * as ConfirmationModal from './Modals/Confirmation';
import * as LegalModal from './Modals/Legal';
import * as Session from './Session';

const registerComponentWithRedux = (redux: any) => (name: string, component: any) => {
	Navigation.registerComponentWithRedux(name, () => component, redux.Provider, redux.store);
};

export function registerScreens(redux: any) {
	registerComponentWithRedux(redux)(SCREENS.Initializing, Initializing.default);
	registerComponentWithRedux(redux)(SCREENS.Home, Home.default);
	registerComponentWithRedux(redux)(SCREENS.SignIn, SignIn.default);
	registerComponentWithRedux(redux)(SCREENS.RegisterModal, RegisterModal.default);
	registerComponentWithRedux(redux)(SCREENS.MathModal, MathModal.default);
	registerComponentWithRedux(redux)(SCREENS.CollegeModal, CollegeModal.default);
	registerComponentWithRedux(redux)(SCREENS.ConfirmationModal, ConfirmationModal.default);
	registerComponentWithRedux(redux)(SCREENS.LegalModal, LegalModal.default);
	registerComponentWithRedux(redux)(SCREENS.Session, Session.default);
}
