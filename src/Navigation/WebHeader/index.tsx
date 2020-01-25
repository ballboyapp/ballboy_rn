import React from 'react';
import { Header } from 'react-native-elements';
import Colors from '../../Themes/Colors';

const WebHeader = (props) => (
  <Header backgroundColor={Colors.white} {...props} />
);

// Accept all props from the navite Header comp

export default WebHeader;
