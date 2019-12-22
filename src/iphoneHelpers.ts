// from https://github.com/ptelad/react-native-iphone-x-helper/blob/master/index.js

import { Dimensions, Platform, StatusBar } from 'react-native';

const { height, width } = Dimensions.get('window');

export function isIphoneX() {
  return (
    Platform.OS === 'ios'
    && !Platform.isPad
    && !Platform.isTVOS
    && (
      (height === 812 || width === 812) || (height === 896 || width === 896)
    )
  );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

export function getStatusBarHeight(safe) {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: StatusBar.currentHeight,
  });
}

export function getBottomSpace() {
  return isIphoneX() ? 34 : 0;
}
