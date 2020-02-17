import { Platform } from 'react-native';
import { createBrowserApp } from '@react-navigation/web';
import { createAppContainer } from 'react-navigation';
import WebAppNavigation from './WebAppNavigation';
import NativeAppNavigation from './NativeAppNavigation';

export default Platform.OS === 'web' ? createBrowserApp(WebAppNavigation) : createAppContainer(NativeAppNavigation);

export const getActiveRouteName = (navigationState) => {
  if (!navigationState) {
    return null;
  }

  const route = navigationState.routes[navigationState.index];
  // Dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }

  return route.routeName;
};
