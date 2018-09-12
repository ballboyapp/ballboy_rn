import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import Fonts from '../../../Themes/Fonts';
import Colors from '../../../Themes/Colors';
import Text from '../Text';
import { getPalette, getPixelsFromSize } from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ disabled, bgColor }) => (disabled ? Colors.lightGray : bgColor)};
  height: ${({ size }) => (getPixelsFromSize(size).height)};
  width: ${({ width }) => (width || '100%')};
  min-width: 80px;
  border-radius: ${({ size }) => (getPixelsFromSize(size).borderRadius)};
  border: 1px solid ${({ disabled, bgColor }) => (disabled ? Colors.lightGray : bgColor)};
  shadow-color: #000;
  shadow-offset: {width: 2, height: 2};
  shadow-opacity: 0.2;
`;
//------------------------------------------------------------------------------
const Label = styled(Text)`
  font-size: ${Fonts.style.M.fontSize};
  color: ${({ disabled, fontColor }) => (disabled ? Colors.white : fontColor)};
  font-weight: 500;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const RaisedButton = ({
  label,
  status,
  size,
  disabled,
  width,
  ...rest
}) => {
  const palette = getPalette(status);
  const { fontColor, bgColor } = palette;

  const Root = disabled ? View : TouchableOpacity;

  return (
    <Root {...rest}>
      <Container
        size={size}
        bgColor={bgColor}
        width={width}
        disabled={disabled}
      >
        <Label
          size={size}
          fontColor={fontColor}
          disabled={disabled}
        >
          {label}
        </Label>
      </Container>
    </Root>
  );
};

RaisedButton.propTypes = {
  label: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['default', 'primary', 'secondary', 'info', 'warning', 'ghost']),
  size: PropTypes.oneOf(['M', 'S']),
  disabled: PropTypes.bool,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

RaisedButton.defaultProps = {
  status: 'default',
  size: 'M',
  disabled: false,
  width: '100%',
};

export default RaisedButton;