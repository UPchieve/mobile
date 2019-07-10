import { Navigation } from 'react-native-navigation';

import { SCREENS } from '../constants/screen';
import { TYPOGRAPHY } from '../view/styles/typography';

export const showSplash = () => {
  Navigation.setRoot({
    root: {
      component: { name: SCREENS.Splash },
    },
  });
};

export const tabbedNavigation = () =>
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'BottomTabsId',
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: SCREENS.Home,
                    passProps: {
                      text: 'This is Home',
                    },
                  },
                },
              ],
              options: {
                topBar: {
                  visible: false,
                  drawBehind: true,
                  animate: true,
                },
                bottomTab: {
                  fontSize: 12,
                  text: 'Home',
                  textColor: TYPOGRAPHY.COLOR.Primary,
                  selectedTextColor: TYPOGRAPHY.COLOR.Secondary,
                  icon: require('../view/assets/images/tabbar/home.png'),
                  selectedIcon: require('../view/assets/images/tabbar/home.png'),
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: SCREENS.Settings,
                  },
                },
              ],
              options: {
                topBar: {
                  visible: false,
                  drawBehind: true,
                  animate: true,
                },
                bottomTab: {
                  text: 'Settings',
                  fontSize: 12,
                  textColor: TYPOGRAPHY.COLOR.Primary,
                  selectedTextColor: TYPOGRAPHY.COLOR.Secondary,
                  icon: require('../view/assets/images/tabbar/settings.png'),
                  selectedIcon: require('../view/assets/images/tabbar/settings.png'),
                },
              },
            },
          },
        ],
      },
    },
  });

export default tabbedNavigation;
