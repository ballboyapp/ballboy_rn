import React from 'react';
import PropTypes from 'prop-types';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
} from '@expo/vector-icons';
import Colors from '../../../Themes/Colors';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Icon = ({
  iconSet,
  iconName,
  color,
  size,
  ...rest
}) => {
  let IconNative = null;

  switch (iconSet) {
    case 'MaterialIcons':
      IconNative = MaterialIcons;
      break;
    case 'MaterialCommunityIcons':
      IconNative = MaterialCommunityIcons;
      break;
    case 'Ionicons':
      IconNative = Ionicons;
      break;
    case 'FontAwesome':
      IconNative = FontAwesome;
      break;
    default:
      throw new Error('Unknown icon set', iconSet);
  }

  return (
    <IconNative
      name={iconName}
      size={size}
      color={Colors[color]}
      {...rest}
    />
  );
};

Icon.propTypes = {
  iconSet: PropTypes.oneOf([
    'MaterialIcons',
    'MaterialCommunityIcons',
    'Ionicons',
    'FontAwesome',
  ]).isRequired,
  iconName: PropTypes.string.isRequired,
  color: PropTypes.oneOf(Object.keys(Colors)),
  size: PropTypes.number,
  // Plus all other props associated to native Text comp
};

Icon.defaultProps = {
  color: 'black',
  size: 24,
};

export default Icon;
