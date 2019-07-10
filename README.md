UPchieve mobile
===================

![Travis](https://api.travis-ci.com/AmitM30/react-native-typescript-boilerplate.svg?branch=master) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

> A scalable typescript [React Native](https://facebook.github.io/react-native/docs/getting-started) app with [React Native Navigation](https://github.com/wix/react-native-navigation) + [Redux](https://github.com/reactjs/redux) + [TSLint](https://github.com/airbnb/javascript)

**Table of Contents**

- [Local Development](#local-development)
    - [Setup](#setup)
    - [Lint](#lint)
    - [Testing](#Testing)
- [Structure](#structure)
    - [screens](#screens)
    - [redux](#redux)
    - [navigation](#navigation)
    - [services](#services)

Local Development
-----------------

### Setup

rn cli/ dependencies todo

###### iOS

Launch application from XCode

###### Android

For android, run the Metro Bundler from the terminal

```
npm run start
```

and then launch from IDE.

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



Structure
-----------------
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
│   │	    ├── elements			Custom elements
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

`web`
Going forward, plan is to add a web folder to the project, that can leverage the business logic from shared folder.

#### Screens

Make sure node version installed is `>=8.11.x <=9`

```
yarn install
```

#### Redux

todo

#### Navigation

todo

###### Services

For android, run the Metro Bundler from the terminal

```
npm run start
```

and then launch from IDE.

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

The application launches with a blank splash screen, and then moves to a tabbed based home view. Developers can feel free to add application launch logic to this, like fetch user token, load persist state etc., or skip the splash if not required, or change this setup altogether.

##### Styles

The `styles` folder contains `global` style and `typography` for the application. Styles for each screen has been placed with the screen, as they are going to be used together with the screen, unlike web.

##### Widgets / Elements

The custom components have been broken into 2 major categories, namely - **widgets**, **elements**

A Good use case would be:

- widgets: carousels component, banner component, any component providing a complete functionality
- elements: A custom, may be `<CText>` or `<ButtonDefault>`, element that has default font properties like font, size and overrides the native elements.

#### Contributing

Please check out [Contributing](https://github.com/AmitM30/react-native-typescript-boilerplate/blob/master/CONTRIBUTING.md).

#### Authors

- [**Anurag Chutani**](https://github.com/a7urag) - _Android Setup_
- [**Brian Varley**](https://github.com/BrianJVarley) - _Windows Setup_

See also the list of [contributors](https://github.com/AmitM30/react-native-typescript-boilerplate/contributors) who participated in this project.

#### TODO

- [ ] Build React web app using `shared` business logic
