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

## Local Development

### Setup

1. Make sure your [dev server](https://github.com/upchieve/server) is running at `localhost:3000`.
2. This app uses yarn. Run `yarn install` to install dependencies.
3. In `src/config/index.ts`, add the root of your dev server to `ROOT`. For stimulators (ios), `localhost:3000` is fine. If using a stimulator or connecting a device, use your host's IPv4 address instead of 'localhost'.

### Launch

1. Set up your [development environment](https://facebook.github.io/react-native/docs/getting-started.html) with React Native CLI.
2. Connect your device or run your emulator/stimulator.
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

#### Cheat Sheet

##### React Native Navigation

TODO

##### Styles

The `styles` folder contains `global` style and `typography` for the application. Styles for each screen has been placed with the screen, as they are going to be used together with the screen, unlike web.
