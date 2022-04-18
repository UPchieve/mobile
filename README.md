# UPchieve App

-   [Get started](#get-started)
-   [Folder and structure](#folder-and-structure)
-   [Updates over the fly](#updates-over-the-fly)
-   [Atomic development](#atomic-development)

## Get started

1. Clone the project
    ```
    git clone https://gitlab.com/upchieve/midtown.git
    ```
2. Install iOS pods ([CocoaPods](https://cocoapods.org/) installation is required), to do it we have to go to ios folder, and after that, execute pod install.
    ```
    cd ios && pod install
    ```
3. Run de project for either ios or android.
    ```
    yarn android
    yarn ios
    ```

## Folder and structure

-   **components**: Here we can find the elements which make it possible to isolate their behavior to potentially reuse them in another place of the application.
    In the components we use the [Atomic Design Pattern](#atomic-development) that will be explained after.
-   **hooks**: Basically, a Hook is a javascript function that allows to create/access React state and lifecycles and that, in order to ensure the stability of the application, and, in the _hooks_ folder, we use this concept to build our custom ones to handle specific situations like notification handling (`useNotificationHandler`) by example.
-   **interfaces/models**: The content of this folder is as simple as it looks like, it contains all the contracts.
-   **providers**: Providers are an ideal way to share information of the react context through the component tree without having to pass props down manually at every level, and also let us isolate some logic on them, by example, `AuthProvider` handles all the user states on the app.
-   **reducers**: [Reducers](https://reactjs.org/docs/hooks-reference.html#usereducer) are basically an [useState](https://reactjs.org/docs/hooks-reference.html#usestate) alternative that lets us handle big and complex states, in the app, this approach is used to handle all the Chat states on `chatReducer`.
-   **routes**: Here we can find all the routes of the application divided in different route components based on [React Navigation](https://reactnavigation.org/docs/getting-started/) library.
-   **screens**: As simple as it looks like, this folder contains all the screens.
-   **services**: This folder contains the different typescript files that have the responsibility to isolate the backend calls.
-   **types** Inside this folder we can find all the typescript types that are used on the application.
-   **utils** it has a couple of utilities that dont't fit in another folder.

## Updates over the fly

In order to be able to push a new update the only thing we have to do is.

1. Install the project dependencies with npm or yarn.
    ```
    npm install
    ```
2. Install iOS pods ([CocoaPods](https://cocoapods.org/) installation is required), to do it we have to go to ios folder, and after that, execute pod install.
    ```
    cd ios && pod install
    ```
3. Install [expo-cli](https://docs.expo.dev/workflow/expo-cli/) package globally with yarn or npm
    ```
    npm install -g expo-cli
    ```
4. Now, we have to execute [expo-login](https://docs.expo.dev/workflow/expo-cli/#expo-login) in order to login and then, the terminal will ask for the username and password.
5. For the last, we have to do the publish itself, to do it we have to execute a `expo publish` specifying the release channel.
    ```
    expo publish --release-channel prod-v2
    ```

## Atomic development

The five distinct levels of atomic design — atoms > molecules > organisms > templates > pages — map incredibly well to React component-based architecture.

-   **Atoms:** Basic building blocks of matter, such as a button, input or a form label. They’re not useful on their own.
-   **Molecules:** Grouping atoms together, such as combining a button, input and form label to build functionality.
-   **Organisms:** Combining molecules together to form organisms that make up a distinct section of an interface (i.e. navigation bar)
-   **Templates:** Consisting mostly of groups of organisms to form a page — where clients can see a final design in place.
-   **Pages:** An ecosystem that views different template renders. We can create multiple ecosystems into a single environment — the application.
