import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image } from 'react-native';
import { SPORTS } from '../../../constants';
import I18n from '../../../I18n';
import themeIcons from '../../../Themes/Icons';
import Fonts from '../../../Themes/Fonts';
import Block from '../Block';
import Row from '../Row';
import Spacer from '../Spacer';
import Text from '../Text';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// 16 = padding from Block
export const SPORT_CARD_HEIGHT = (16 * 2) + (1.4 * Fonts.M.fontSize);
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SportCard = ({
  sport,
  isSelected,
  onPress,
  testID,
}) => (
  <TouchableOpacity
    onPress={() => { onPress(sport); }}
    testID={testID}
  >
    <Block bgColor={isSelected ? 'grass10' : 'transparent'}>
      <Row>
        <Image source={sport ? themeIcons[sport.toLowerCase()] : themeIcons.soccer} />
        <Spacer row size="XXL" />
        <Text size="M">{I18n.t(sport)}</Text>
      </Row>
    </Block>
  </TouchableOpacity>
);

SportCard.propTypes = {
  sport: PropTypes.oneOf(Object.values(SPORTS)).isRequired,
  isSelected: PropTypes.bool,
  onPress: PropTypes.func,
  testID: PropTypes.string,
};

SportCard.defaultProps = {
  isSelected: false,
  onPress: () => {},
  testID: '',
};

export default SportCard;
