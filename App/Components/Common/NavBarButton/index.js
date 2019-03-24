import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import Text from '../Text';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Button = styled(TouchableOpacity)`
  flex: ${props => (props.main ? 10 : 9)};
  height: ${props => (props.main ? 56 : 48)};
  border-top-width: ${props => (props.main ? 0 : StyleSheet.hairlineWidth)};
  border-top-color: ${props => (props.main ? Colors.transparent : Colors.silver)};
  background-color: ${props => (props.main ? Colors.primaryGreen : Colors.white)};
  border-top-left-radius: ${props => (props.main ? 8 : 0)};
  border-top-right-radius: ${props => (props.main ? 8 : 0)};
`;
//------------------------------------------------------------------------------
const Center = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const NavBarButton = ({
  btnLabel,
  main,
  icon,
  active,
  onPress,
  ...otherProps
}) => {
  const Icon = icon.set;
  const baseColor = active ? 'primaryGreen' : 'black54';
  const color = main ? 'white' : baseColor;

  return (
    <Button
      main={main}
      onPress={onPress}
      {...otherProps}
    >
      <Center>
        <Icon
          name={icon.name}
          size={main ? 32 : 24}
          color={Colors[color]}
        />
        <Text
          size="S"
          color={color}
        >
          {btnLabel}
        </Text>
      </Center>
    </Button>
  );
};

NavBarButton.propTypes = {
  btnLabel: PropTypes.string,
  icon: PropTypes.shape({
    set: PropTypes.any,
    name: PropTypes.string,
  }).isRequired,
  active: PropTypes.bool,
  main: PropTypes.bool,
  onPress: PropTypes.func,
};

NavBarButton.defaultProps = {
  btnLabel: '',
  active: false,
  main: false,
  onPress: () => {},
};

export default NavBarButton;
