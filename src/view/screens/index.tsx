import { Navigation } from 'react-native-navigation';

import { SCREENS } from '../../constants/screen';

import * as Home from './Home';
import * as Settings from './settings';
import * as SignIn from './SignIn'
import * as Initializing from './Initializing';
import * as MathModal from './Modals/Math';

const registerComponentWithRedux = (redux: any) => (
  name: string,
  component: any,
) => {
  Navigation.registerComponentWithRedux(
    name,
    () => component,
    redux.Provider,
    redux.store,
  );
};

export function registerScreens(redux: any) {
  registerComponentWithRedux(redux)(SCREENS.Initializing, Initializing.default);
  registerComponentWithRedux(redux)(SCREENS.Home, Home.default);
  registerComponentWithRedux(redux)(SCREENS.Settings, Settings.default);
  registerComponentWithRedux(redux)(SCREENS.SignIn, SignIn.default);
  registerComponentWithRedux(redux)(SCREENS.MathModal, MathModal.default);

}
