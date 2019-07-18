import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import store from '../../shared/redux/store';
import { registerScreens } from '../view/screens';
import { initialize } from './navigation';
import { MenuButton } from '../view/components/MenuButton'

/**
 * Register screens and components for react native navigation
 */
registerScreens({ store, Provider });

Navigation.registerComponent('MenuButton', () => require('../view/components/MenuButton').default);

const app = () => {
  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
      topBar: { visible: true },
    });

    initialize();
  });
};

export default app;
