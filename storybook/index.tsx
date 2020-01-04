// import '../src/polyfills';
import '../src/prototypes';
import './setup-faker';
// import { AppLoading } from 'expo';
// import * as Font from 'expo-font';
// import { Asset } from 'expo-asset';
import React from 'react';
import { Platform, View } from 'react-native';
import { getStorybookUI, configure, addDecorator } from '@storybook/react-native';
import MomentUtils from '@date-io/moment';
import { MenuProvider } from 'react-native-popup-menu';
import { ThemeProvider } from 'styled-components/native';
import { SpotFiltersProvider } from '../src/Context/SpotFilters';
import { ApolloMockProvider } from '../src/GraphQL/ApolloMockClient';
import { loadStories } from './storyLoader';
import scTheme from '../src/Themes/scTheme'; // styled-components theme
import LoadAssets from '../src/Components/Common/LoadAssets';

// Necessary for TimePicker from '@material-ui/pickers';
const MuiPickersUtilsProvider = Platform.select({
  web: require('@material-ui/pickers').MuiPickersUtilsProvider,
  default: ({ children }) => <View>{children}</View>,
});

addDecorator((story) => (
  <LoadAssets>
    <ApolloMockProvider>
      <ThemeProvider theme={scTheme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <SpotFiltersProvider>
            <MenuProvider>
              {story()}
            </MenuProvider>
          </SpotFiltersProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </ApolloMockProvider>
  </LoadAssets>
));

// Import stories
configure(loadStories, module);

// This assumes that storybook is running on the same host as your RN packager,
// to set manually use, e.g. host: 'localhost' option
const StorybookUI = getStorybookUI({ port: 7007, onDeviceUI: true });

// If you are using React Native vanilla write your app name here.
// If you use Expo you can safely remove this line.
// AppRegistry.registerComponent(name, () => StorybookUI);
export default StorybookUI;
