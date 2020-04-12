import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';
import styled from 'styled-components/native';
import { Badge } from 'react-native-elements';
import { WINDOW_WIDTH } from '../../constants';
import Colors from '../../Themes/Colors';
import Text from '../../Components/Common/Text';
import Icon from '../../Components/Common/Icon';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const NUM_BUTTONS = 5;
const BUTTON_WIDTH = WINDOW_WIDTH / NUM_BUTTONS;

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Button = styled(TouchableHighlight)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;
//------------------------------------------------------------------------------
const Center = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const NavBarButton = ({
  btnLabel,
  icon,
  withBadge,
  badgeCounter,
  active,
  onPress,
  ...otherProps
}) => {
  const baseColor = active ? 'primaryGreen' : 'black34';

  return (
    <Button
      onPress={onPress}
      activeOpacity={1}
      underlayColor={Colors.grass10}
      {...otherProps}
    >
      <Center>
        {withBadge && (
          <Badge
            status="error"
            value={badgeCounter}
            containerStyle={{
              position: 'absolute',
              top: 0,
              left: BUTTON_WIDTH / 2,
            }}
          />
        )}
        <Icon
          iconSet={icon.set}
          iconName={icon.name}
          size={24}
          color={baseColor}
        />
        <Text
          size="S"
          color={baseColor}
          semibold
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
    set: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  withBadge: PropTypes.bool,
  badgeCounter: PropTypes.number,
  active: PropTypes.bool,
  onPress: PropTypes.func,
};

NavBarButton.defaultProps = {
  btnLabel: '',
  withBadge: false,
  badgeCounter: 0,
  active: false,
  onPress: () => {},
};

export default NavBarButton;
