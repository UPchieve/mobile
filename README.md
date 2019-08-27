# UPchieve mobile

![Travis](https://api.travis-ci.com/AmitM30/react-native-typescript-boilerplate.svg?branch=master) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

> A scalable typescript [React Native](https://facebook.github.io/react-native/docs/getting-started) app with [React Native Navigation](https://github.com/wix/react-native-navigation) + [Redux](https://github.com/reactjs/redux) + [TSLint](https://github.com/airbnb/javascript)

**Table of Contents**

-   [Local Development](#local-development)
    -   [Setup](#setup)
    -   [Launch](#launch)
    -   [Lint](#lint)
    -   [Testing](#Testing)
-   [Structure](#structure)
    -   [screens](#screens)
    -   [redux](#redux)
    -   [navigation](#navigation)
    -   [services](#services)
-   [Contribution](#contribution)
    -   [Add a screen](#add-screen)
    -   [Redux management](#redux-management)

## Local Development

### Setup

1. Make sure your [dev server](https://github.com/upchieve/server) is running at `localhost:3000`.
2. This app uses yarn. Run `yarn install` to install dependencies.
3. In `src/config/index.ts`, add the root of your dev server to `ROOT`. For simulators (ios), `localhost:3000` is fine. If using a simulator or connecting a device, use your host's IPv4 address instead of 'localhost'.

### Launch

1. Set up your [development environment](https://facebook.github.io/react-native/docs/getting-started.html) with React Native CLI.
2. Connect your device or run your emulator/simulator.
3. Run the Metro Bundler from the terminal with `npm start`, and launch with either `react-native run-android` or `react-native run-ios` (Alternatively use VScode's `React Native Tools` commands).

#### Lint

To run tslint on the application:

```
yarn lint
```

To fix most tslint issues automatically

```
yarn lint:fix
```

#### Testing

Unit tests are under `__test__` directory at root.

To run unit test on the application:

```
npm run test
```

To find unit test coverage for the application:

```
npm run test:coverage
```

## Structure

```
/
├── android					Android Native code
├── ios						iOS Native Code
├── shared
│   ├── redux					Business Logic
│   │	    ├── constants
│   │	    ├── actions
│   │	    ├── api
│   │	    ├── reducers
│   │	    ├── store
│   │	    └── thunk
│   └── utilities
├── src
│   ├── config					App Configuration
│   ├── constants				Screens, Localization
│   ├── navigators				Router, Navigation
│   ├── view					UI compoments - Screens, Widgets
│   │	    ├── elements
|   |       ├── components
│   │	    ├── assets
│   │	    ├── screens
│   │	    ├── styles				Typography
│   │	    └── widgets				Custom components
│   └── utilities
├── __tests__					Unit Tests
│   ├── presentation
│   └── redux
├── .babelrc
├── .gitignore
├── .travis.yml					Travis CI
├── tsconfig.json				TypeScript Configuration
├── tslint.js					TSLint configuration - extending AirBnb
├── tsconfig.json
├── app.json
├── index.js					Application Entry point
├── package.json
└── README.md
```

`shared`
Everything related to application business logic (store) resides under this directory.

`src`
Only presentation layer for the app, styles, images, icons are meant to be under this.

#### Screens

Make sure node version installed is `>=8.11.x <=9`

```
yarn install
```

#### Redux

This app uses Redux Thunk middleware and Redux Persist for a persistent store.

#### Navigation

Navigation is handled with React Native Navigation v2. Check out `src/navigators/index.js` for the root of the application.

#### Lint

To run tslint on the application:

```
yarn lint
```

To fix most tslint issues automatically

```
yarn lint:fix
```

#### Unit Test

Unit tests are under `__test__` directory at root.

To run unit test on the application:

```
npm run test
```

To find unit test coverage for the application:

```
npm run test:coverage
```

## Contribution

### Add a screen <a name="add-screen"></a>

1.  Add folder with screen name, ex. `MyScreen/` in `src/view/screens`

    - Follow the convention structure:

        MyScreen/
        Component.tsx // React Native component
        Index.tsx // Redux - Link action creators, map state to props
        Styles.tsx // Styles

2.  Add component to constants list (centralized for good practice) in `src/constants/screen.tsx`
3.  Register screen in `src/view/screens/index.tsx`

        import * as MyScreen from './MyScreen';
        ...
        export function registerScreens(redux: any) {
        	registerComponentWithRedux(redux)(SCREENS.MyScreen, MyScreen.default);
        }

4.  Create and export navigation function in `src/navigators/navigation.tsx`

        export const goToMyScreen = () => {
        	Navigation.setRoot({
        		root: {
        			component: { name: SCREENS.MyScreen },
        		},
        	});
        };

5.  Now you can travel to your screen from any component by importing and calling `goToMyScreen()`!

Note: Place modal screens in `src/view/screens/Modals`

### Redux management <a name="redux-management"></a>

1. Create your new reducer in `shared/redux/reducers`
2. Add action types to `ACTION_TYPES`, make and export action creators in `shared/redux/constants/actions.tsx`
3. Link up redux to your screen

    - In `MyScreen/index.tsx`, define the state you want to use in `mapStateToProps`, and actions to dispatch in `actionCreators`

        import { connect } from 'react-redux';
        import Component from './Component';
        import { myAction } from '../../../../shared/redux/constants/actions';

        const mapStateToProps = state => {
        return { myState: ... };
        };

        const actionCreators = {
        myAction
        };

        const screenContainer = connect(
        mapStateToProps,
        actionCreators
        )(Component);

        export default screenContainer;
