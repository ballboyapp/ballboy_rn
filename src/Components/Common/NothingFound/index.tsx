import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import styled from 'styled-components/native';
import themeImages from '../../../Themes/Images';
import Text from '../Text';
import Spacer from '../Spacer';
import Icon from '../Icon';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Outer = styled.View`
  /* height: 100%; */
  justify-content: center;
  align-items: center;
`;
//------------------------------------------------------------------------------
const MaxWidth = styled.View`
  width: 100%;
  max-width: 270px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const NothingFound = ({
  iconSet,
  iconName,
  size,
  imgSrc,
  text,
  ...rest
}) => (
  <Outer>
    {!!iconSet && !!iconName && (
      <Icon
        iconSet={iconSet}
        iconName={iconName}
        size={size}
        color="link"
        {...rest}
      />
    )}
    {!!imgSrc && (
      <View>
        <Image
          source={themeImages[imgSrc]}
          // Image height and width set via style props
          {...rest}
        />
        <Spacer size="L" />
      </View>
    )}
    <MaxWidth>
      <Text size="ML" color="link" center>
        {text}
      </Text>
    </MaxWidth>
  </Outer>
);

NothingFound.propTypes = {
  iconSet: PropTypes.string,
  iconName: PropTypes.string,
  size: PropTypes.number, // icon/img size
  imgSrc: PropTypes.any, // eslint-disable-line
  text: PropTypes.string.isRequired,
  // Plus all other icon props
};

NothingFound.defaultProps = {
  iconSet: null,
  iconName: null,
  imgSrc: null,
  size: 96,
};

export default NothingFound;
