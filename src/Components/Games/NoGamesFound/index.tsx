import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import I18n from '../../../I18n';
import Text from '../../Common/Text';
import Block from '../../Common/Block';
import Spacer from '../../Common/Spacer';
import NothingFound from '../../Common/NothingFound';
import RaisedButton from '../../Common/RaisedButton';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const IMG_HEIGHT = 100;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const NoGamesFound = ({ onPress }) => (
  <View>
    <NothingFound
      imgSrc="noActivitiesIllustration"
      style={{ height: IMG_HEIGHT, width: parseInt(0.8 * IMG_HEIGHT, 10) }}
      text={I18n.t('noGamesFound.noResults')}
    />
    <Spacer size="XXXL" />
    <Spacer size="L" />
    <Text size="ML" color="link" center>
      {I18n.t('noGamesFound.organize')}
    </Text>
    <Block>
      <RaisedButton
        variant="primary"
        label={I18n.t('noGamesFound.btnLabel')}
        onPress={onPress}
      />
    </Block>
  </View>
);

NoGamesFound.propTypes = {
  onPress: PropTypes.func,
};

NoGamesFound.defaultProps = {
  onPress: () => {},
};

export default NoGamesFound;
