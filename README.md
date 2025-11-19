# UPchieve React Native App

- [Getting Started](#getting-started)
- [Updating Dependencies](#updating-dependencies)
- [Development Process](#development-process)
- [Release Process](#release-process)
- [Folders and Structure](#folders-and-structure)

## Getting Started

Prerequisites: For the iOS portion of this project, you will need [Xcode](https://developer.apple.com/xcode/) and [CocoaPods](https://cocoapods.org) installed on your device.

- You can install CocoaPods with Homebrew: `brew install cocoapods`.

1. Clone the project.
   ```
   git clone https://gitlab.com/upchieve/midtown.git
   ```
2. Navigate to root directory of the repository and run:
   ```
   npm install
   npm install -g expo-cli eas-cli
   ```
3. On latest beta, run:
   ```
   npx expo install
   npx expo prebuild
   ```
4. Run project for either ios or android.
   ```
   npm run ios:development
   npm run android:development
   ```
   NOTE: An Android emulator resolves `localhost` (a.k.a `127.0.0.1`) to the device's own loopback interface.
   You can use the special alias `10.0.2.2` to reach your local web development server.
   Local environment variables (env.development) are defaulted to local android, so make sure to comment them out and uncomment iOS variables for local development in iOS.

## Updating Dependencies

Unfortunately, given that our dependencies are fairly out of date, the process of updating any package is quite tedious.

The process can look something like this:

1. Bump the React Native version and any other dependencies that need to be updated from that bump. [This Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) is a useful tool created by the React Native community.
2. Run `expo doctor`, and fix any issues with dependencies that it points out.
3. Look through the changelogs of updated packages to see if there are any breaking changes that affect the codebase.
4. Build and/or run both the iOS and Android app.
5. If either of the apps fail to build or have runtime errors, fix the issue\*\*, then try again. See next section for some common quirks you'll likely run into.

Every so often, you'll also want to verify the release configuration (iOS) and release variant (Android) still build and run okay.

```
expo run:ios --configuration Release
expo run:android --variant release
```

With iOS specifically, I find it useful to start with building in Xcode first ("Product" > "Build"). You will also need to be signed in to your App Store Connect account.

For Android, you'll need to add the release keystore locally. You can download the credentials from Expo, then follow the instructions when you added the `debug.keystore`. TODO(alex.lindsay): Move to 1Password?

\*\*"fix the issue" sounds so quaint. There will be many issues, many of them probably red herring errors. To keep your sanity, timebox efforts here, take good notes of what you have tried, and **commit often** when you _do_ get the apps building so you can easily rollback to the versions that work if (ahem.. when) everything goes haywire.

### Some iOS Quirks

- Whenever I have updated `react-native`, I have also had to also manually update `RCT-Folly`. Run `pod update RCT-Folly` within the ios directory.
- Updating Pods overrides the signing team in Xcode for the dependencies. When the build fails, click on each of the build errors to take you to the configuration, then select the UPchieve team.
- In `Yoga.cpp`, you'll need to change the bitwise operator to `||`. Clicking on the build error in Xcode will take you to the code.

## Development Process

All development branches should be branched off of and merge into `beta`.

# Release Process

> Notes for the future:
>
> - [ ] We need to create an Android app with ID `org.upchieve.beta`. I don't know how this worked previously without it.
> - [ ] Revert the app ID changes accidentally done in [this MR](https://gitlab.com/upchieve/midtown/-/commit/578e8cb2391953e269870b0b0b954a03c835715a)
> - [ ] For over-the-air updates, we should: 1. update Expo, 2. no longer use legacy channels.
> - [ ] Ideally, set up workstream so Linux users can also build/develop and deploy.

1. Once a set of changes is accepted for release, create and merge a change on `beta` bumping to the next version.
   - It's easiest to simply do a global search for the current version (i.e. `2.9.18`). **Don't forget to also update `android.versionCode` in app.json!**
2. Tag the commit merged in the previous step with `X.X.X-beta`. For example:

   ```
   $ git pull origin beta
   $ git tag 2.1.0-beta
   $ git push origin 2.1.0-beta
   ```

3. Merge `beta` into `production` and tag the merged commit as well.
   - **Important**: You do the merge on the production branch.
   ```
   $ git checkout production
   $ git pull origin production
   $ git merge beta
   $ git push
   ```

Once that's done, you have the choice of going through the full release process or the over-the-air update process. These are described below.

## Full release process

The full release process requires:

- Building app bundles for iOS and Android
- Uploading them to their respective app stores
- Submitting them for review

### Creating the bundle

1. Check out the branch with the changes you want to release
2. `expo login` if you haven't already
3. `npx expo install`
4. `npx expo prebuild`
5. `npx eas build --profile production`
   - When prompted, allow it to sign into the app store.
   - When prompted to choose which platforms to build for, select All.

The build process will take several minutes. You can log into Expo to view your progress. You will also download the android .aab and iOS .ipa files from here when the build is finished. These are the files we'll upload to [Google Play Console](https://play.google.com/console/developers) and [App Store Connect](https://appstoreconnect.apple.com/apps).

### Uploading to the app stores

For Android, you need to upload the new app version to Google Play Console:

- Go to Google Play Console and select the UPchieve app.
- Under Testing, select "Internal testing" -> "Create new release"
- Upload the .aab file from the previous step. Update the release version if it doesn't do so automatically. Finish the release form.

For iOS, you have 3 options to upload your test build:

- The simplest is to just use [Transporter](https://apps.apple.com/us/app/transporter/id1450874784?mt=12) (Just drag your .ipa file into Transporter)
- Alternatively, you can use the eas-cli: `eas submit --platform ios` (TODO: Test for Android)
- A third option is to use xcode. This will involve also building the iOS bundle, so if you choose this option, you can skip building for iOS in the above Expo step.
  1. Update the version (if not already done):
     - Select "upchieveapp" from the left sidebar, select "upchieveapp" under "TARGETS", then select the "General" tab.
     - Under "Identity" section, update the Version (i.e. the semantic version) and Build (will probably always be `1`).
  2. At the top of Xcode in the status bar area, make sure you have selected `Any iOS Device` as the build target. You can also update this by selecting "Product" > "Destination" > "Any iOS Device" in the top bar menu.
  3. Create the Archive by selecting "Product" > "Archive" in the top bar menu.
  4. Once that completes, the Archive menu will appear. Make sure the Archive you just created is selected, then validate the app.
  - Click "Validate App", select the "Validate" method, then click "Validate".
  5. Once validation is complete, select "Distribute App" button.
  6. Select "Upload for TestFlight (Internal Testing Only)".

### Testing

In Android's Internal Testing and Apple's TestFlight, make sure you have added yourself as a tester. Then, download and test the app on a physical device OR use [LambdaTest](https://www.lambdatest.com/)'s Real Device Testing.

### Publishing the release

Once testing is done, create a new release on production in Google Play Console / App Store Connect. Use the same build as before. Then, submit the releases for review.

## Over-the-air updates :construction:

TODO

## Folders and Structure

- **components**: Here we can find the elements which make it possible to isolate their behavior to potentially reuse them in another place of the application.
  In the components we use the [Atomic Design Pattern](#atomic-development) that will be explained after.
- **hooks**: Basically, a Hook is a javascript function that allows to create/access React state and lifecycles and that, in order to ensure the stability of the application, and, in the _hooks_ folder, we use this concept to build our custom ones to handle specific situations like notification handling (`useNotificationHandler`) by example.
- **interfaces/models**: The content of this folder is as simple as it looks like, it contains all the contracts.
- **providers**: Providers are an ideal way to share information of the react context through the component tree without having to pass props down manually at every level, and also let us isolate some logic on them, by example, `AuthProvider` handles all the user states on the app.
- **reducers**: [Reducers](https://reactjs.org/docs/hooks-reference.html#usereducer) are basically an [useState](https://reactjs.org/docs/hooks-reference.html#usestate) alternative that lets us handle big and complex states, in the app, this approach is used to handle all the Chat states on `chatReducer`.
- **routes**: Here we can find all the routes of the application divided in different route components based on [React Navigation](https://reactnavigation.org/docs/getting-started/) library.
- **screens**: As simple as it looks like, this folder contains all the screens.
- **services**: This folder contains the different typescript files that have the responsibility to isolate the backend calls.
- **types** Inside this folder we can find all the typescript types that are used on the application.
- **utils** it has a couple of utilities that dont't fit in another folder.

### Atomic Development

The five distinct levels of atomic design — atoms > molecules > organisms > templates > pages — map incredibly well to React component-based architecture.

- **Atoms:** Basic building blocks of matter, such as a button, input or a form label. They’re not useful on their own.
- **Molecules:** Grouping atoms together, such as combining a button, input and form label to build functionality.
- **Organisms:** Combining molecules together to form organisms that make up a distinct section of an interface (i.e. navigation bar)
- **Templates:** Consisting mostly of groups of organisms to form a page — where clients can see a final design in place.
- **Pages:** An ecosystem that views different template renders. We can create multiple ecosystems into a single environment — the application.
