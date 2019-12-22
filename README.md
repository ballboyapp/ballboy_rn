### Getting started

Clone the repo:

```
>> mkdir bb (you can call your project's folder whatever you want; bb stands for ballboy)
>> cd bb
>> git clone git@github.com:fede-rodes/ballboy_client.git client (this will create a 'client' folder inside 'bb')
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

- Visit [https://developers.google.com/maps/documentation/javascript/get-api-key](https://developers.google.com/maps/documentation/javascript/get-api-key) and create a new project.
- Set `ios.config.googleMapsApiKey` by enabling 'Maps Static API' for ios.
- Set `android.config.googleMaps.apiKey` by enabling 'Maps Static API' for android.
- Set `extra.webGoogleMapsApiKey` by enabling 'Maps Static API' for web.

#### Sentry (error tracking service API)

- Visit [https://sentry.io](https://sentry.io), create an account and a new 'Organization'.
- Set `extra.webSentryDsn` by creating a new 'React' project and getting the DSN key
- Set `extra.rnSentryDsn` by creating a new 'React Native' project and getting the DSN key. In addition, enable the `hooks.postPublish[0].config.authToken` by following the expo-sentry docs:  [https://docs.expo.io/versions/latest/guides/using-sentry/](https://docs.expo.io/versions/latest/guides/using-sentry/)

#### Chatkit (chat service API)

- Visit [https://pusher.com/chatkit](https://pusher.com/chatkit), create a new account and a new Chatkit project.
- Set `extra.chatkitInstanceLocator` from the credentials tab
- Go to `ROLES` inside the `Console` tab and create a `readonly` role by enabling the following permissions: `room:join`, `room:leave`, `room:get`, `room:messages:get`, `room:typing_indicator:create`, `presence:subscribe`, `user:get`, `user:rooms:get`, `file:get` and `cursors:read:get`.

#### Cloudinary (image host and manipulation service API)

- Visit [https://cloudinary.com/](https://cloudinary.com/) and create a new account.
- From the `Dashboard` tab, grab the `Cloud name`, `API key` and `API secret` keys and set `extra.cloudinaryCloudname`, `extra.cloudinaryApiKey` and `extra.cloudinaryApiSecret` respectively.
- Finally, go to `settings` section ([https://cloudinary.com/console/settings](https://cloudinary.com/console/settings)), move to the `Upload` tab and scroll down to `Upload presets`. Set `Upload preset name` to `default` and `Signing Mode` to `unsigned`. Hit save.

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

### Deploy

[https://github.com/expo/web-examples/blob/master/docs/DEPLOYMENT.md](https://github.com/expo/web-examples/blob/master/docs/DEPLOYMENT.md)
[https://www.freecodecamp.org/news/how-to-deploy-a-react-application-to-netlify-363b8a98a985/](https://www.freecodecamp.org/news/how-to-deploy-a-react-application-to-netlify-363b8a98a985/)

#### Netlify

Install the Netlify CLI with `npm install netlify-cli -g`.

Then run `yarn run deploy:web`.


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
