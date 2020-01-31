### Intro

This project has been forked from [https://github.com/SportySpots/cruijff](https://github.com/SportySpots/cruijff). Some of the changes introduced in comparison to the original project are listed below:

- This project uses expo to build in 3 platforms: web, android and ios
- It utilizes a graphql node backend
- We rely on Cloudinary for image hosting and manipulation

### Getting started

Clone the repo:

```
>> mkdir bb (you can call your project's folder whatever you want; bb stands for ballboy)
>> cd bb
>> git clone git@github.com:fede-rodes/ballboy_rn.git rn (this will create a 'rn' folder inside 'bb')
>> cd client
>> yarn run install (install dependencies, please use yarn not npm!)
```

### Install Expo CLI

```
>> npm install -g expo-cli
```

[https://docs.expo.io/versions/latest/introduction/installation/](https://docs.expo.io/versions/latest/introduction/installation/)

### Set expo environment variables

At the root of the project you'll find a `app.json.sample` file. Duplicate said file and re-name it to `app.json`. That's where expo keeps all the environment variables. Set your env vars under `extra` making sure `expo.extra.isStorybook` is set to `false` (more on this later).

#### Google Maps API Keys (static map service API)

- Visit [https://developers.google.com/maps/documentation/javascript/get-api-key](https://developers.google.com/maps/documentation/javascript/get-api-key) and follow the steps to create a new project and an API key.
- Go to `APIs & Services > Dashboard` and click on `ENABLE APIS & SERVICES` button at the top. Look for `Maps Static API`. Enable it.
- Copy the API key and set `ios.config.googleMapsApiKey`, `android.config.googleMaps.apiKey` and `extra.webGoogleMapsApiKey` in `app.json`.
- Follow these steps to enable google maps in production: [https://docs.expo.io/versions/latest/sdk/map-view/?redirected](https://docs.expo.io/versions/latest/sdk/map-view/?redirected)

#### Sentry (error tracking service API)

- Visit [https://sentry.io](https://sentry.io) and create an account and a new 'Organization'.
- Set `extra.webSentryDsn` by creating a new 'React' project and getting the DSN key.
- Set `extra.rnSentryDsn` by creating a new 'React Native' project and getting the DSN key. In addition, enable the `hooks.postPublish[0].config.authToken` by following the expo-sentry docs:  [https://docs.expo.io/versions/latest/guides/using-sentry/](https://docs.expo.io/versions/latest/guides/using-sentry/)

#### Chatkit (chat service API)

- Visit [https://pusher.com/chatkit](https://pusher.com/chatkit) and create a new account and a new Chatkit instance.
- Set `extra.chatkitInstanceLocator` from the credentials tab.
- Go to `Console` tab and you'll be prompted to create a new user. Set user name and ID to `admin`.
- Click on `ROLES` inside the `Console` tab and select the `admin` role. Then, click on `assign role to user` and select the `admin` user. Assign the role.
- Go to `ROLES` inside the `Console` tab and create a `readonly` role by enabling the following permissions (make sure the `readonly` role is selected before setting up the permissions): `room:join`, `room:leave`, `room:get`, `room:messages:get`, `room:typing_indicator:create`, `presence:subscribe`, `user:get`, `user:rooms:get`, `file:get` and `cursors:read:get`.
- From the `ROLES`, click onassign role to user and select the `readonly` user.

#### Cloudinary (image host and manipulation service API)

- Visit [https://cloudinary.com/](https://cloudinary.com/) and create a new account.
- From the `Dashboard` tab, grab the `Cloud name`, `API key` and `API secret` keys and set `extra.cloudinaryCloudname`, `extra.cloudinaryApiKey` and `extra.cloudinaryApiSecret` respectively.
- Finally, go to `settings` ([https://cloudinary.com/console/settings](https://cloudinary.com/console/settings)), move to the `Upload` tab and scroll down to `Upload presets` section. Click on `Enable unsigned uploading` and then on `edit`. Set `Upload preset name` to `default` and `Signing Mode` to `unsigned`. Save.

Find out more about expo env vars:
- [https://expo.canny.io/feature-requests/p/dotenv-support](https://expo.canny.io/feature-requests/p/dotenv-support)
- [https://stackoverflow.com/questions/52546254/react-native-with-expo-how-to-use-a-env-local-config-file](https://stackoverflow.com/questions/52546254/react-native-with-expo-how-to-use-a-env-local-config-file)
- [https://docs.expo.io/versions/latest/workflow/configuration/](https://docs.expo.io/versions/latest/workflow/configuration/)
- [https://docs.expo.io/versions/latest/sdk/constants/](https://docs.expo.io/versions/latest/sdk/constants/)

### Run expo (React Native)

- First, visit [https://vast-beach-90080.herokuapp.com/graphql](https://vast-beach-90080.herokuapp.com/graphql) in order to 'wake up' the server. I don't want to pay a single pennie for now, so the server is hosted on a Heroku-free-tire, which goes to sleep when inactive. Booting the server up takes a few minutes.
- Start the emulator (genymotion is the emulator I use on Linux)
- Open a new terminal and start expo:

```
>> cd /bb/client
>> expo start
```
- Once expo is open, set `Local` as the type of `CONNECTION` on the expo dashboard and finally hit the `Run on Android (iOS) emulator` button. After a little while (could take several minutes) the app should start on the emulator.

### Run expo (Web)

- First, visit [https://vast-beach-90080.herokuapp.com/graphql](https://vast-beach-90080.herokuapp.com/graphql) in order to 'wake up' the server. I don't want to pay a single pennie for now, so the server is hosted on a Heroku-free-tire, which goes to sleep when inactive. Booting the server up takes a few minutes.

- Open a new terminal and start expo with the --web flag:

```
>> cd /bb/client
>> expo start --web
```
- This should open a new window in your default browser with the web version of the app.

### Troubleshooting

In case you launch the app running any of the expo commands above and you either get the app to load really slowly or get an `[Network error]: TypeError: NetworkError when attempting to fetch resource.` error in your console, then the problem is most probably caused by the server url not being reachable/configured correctly. In order to fix this, make sure that the base url of the `extra.serverUrl` variable at `app.json` matches the ip address of the expo app. You can find the expo ip address by looking at the expo console just above the QR code.

### Deploy (web)

[https://github.com/expo/web-examples/blob/master/docs/DEPLOYMENT.md](https://github.com/expo/web-examples/blob/master/docs/DEPLOYMENT.md)
[https://www.freecodecamp.org/news/how-to-deploy-a-react-application-to-netlify-363b8a98a985/](https://www.freecodecamp.org/news/how-to-deploy-a-react-application-to-netlify-363b8a98a985/)

#### Netlify

Install the Netlify CLI with `npm install netlify-cli -g`.

Then run `yarn run deploy:web`.

### Build (android)

Before building for release remember to bump the app version at app.json

`expo build:android -t app-bundle`

[https://docs.expo.io/versions/latest/distribution/building-standalone-apps/](https://docs.expo.io/versions/latest/distribution/building-standalone-apps/)

At some point if you need to clear you keystore credentials, use:
`expo build:android --clear-credentials`

Notice: with every new release, you need to bump the `version` number, `ios.buildNumber` and `android.versionCode` (integer) at app.json before building.

#### Wait for it to finish building

When one of our building machines will be free, it'll start building your app. You can check how long you'll wait on Turtle status site. We'll print a url you can visit (such as `expo.io/builds/some-unique-id`) to watch your build logs. Alternatively, you can check up on it by running `expo build:status`. When it's done, you'll see the url of a .apk (Android) or .ipa (iOS) file -- this is your app. Copy and paste the link into your browser to download the file.

### Storybook

[https://storybook.js.org/](https://storybook.js.org/)

To run storybook:
- Stop `expo` in case it's running, open the emulator in case it's closed and close the app from the emulator in case it's running;
- Go to `app.json` and set `expo.extra.isStorybook` to `true`. This tells expo to run storybook instead of the real app.
- Load/update stories: `yarn run storybook`. Wait until `/storybook/storyloader.ts` gets created/updated. Then stop storybook `ctrl + C` on Linux.
- Run expo as usual: `expo start`. Storybook should open automatically on the emulator.


https://pusher.com/tutorials/storybook-react-native


### Icons

Thanks to [https://thenounproject.com](https://thenounproject.com)


### TS tests config

https://medium.com/@ch1ll0ut1/how-to-setup-react-native-with-typescript-the-new-way-6c1f1cce6ed3


### RN web navigation

- https://github.com/expo/web-examples/blob/29d2eeed96d936d7feb1f29e35bee684b6519dfb/docs/FEATURES.md
- https://blog.bitsrc.io/how-to-react-native-web-app-a-happy-struggle-aea7906f4903
- https://github.com/expo/expo/tree/master/apps
- https://reactnavigation.org/docs/en/auth-flow.html (see also v5)
- https://github.com/react-native-elements/react-native-elements-app/blob/master/src/views/profile/screen1.js
- https://react-native-elements.github.io/react-native-elements-app/
- https://blog.bitsrc.io/how-to-react-native-web-app-a-happy-struggle-aea7906f4903
- https://github.com/inspmoore/rnw_boilerplate?source=post_page-----aea7906f4903----------------------
- https://pickering.org/using-react-native-react-native-web-and-react-navigation-in-a-single-project-cfd4bcca16d0
