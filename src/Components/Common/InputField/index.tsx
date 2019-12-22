import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import getInputPalette from '../../../Themes/Palettes';
import Fonts from '../../../Themes/Fonts';
import Row from '../Row';
import Spacer from '../Spacer';
import Text from '../Text';
import TextField from '../TextField';
import Dropdown from '../Dropdown';
import Icon from '../Icon';

//------------------------------------------------------------------------------
// CONST:
//------------------------------------------------------------------------------
const MIN_WIDTH = 80;

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FlexOne = styled.View`
  flex: 1;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class InputField extends React.PureComponent {
  constructor(props) {
    super(props);
    // Create the ref
    this.field = null;
  }

  handlePress = () => {
    const { onPress, focusable } = this.props;
    if (focusable) {
      this.field.focus();
    }
    onPress();
  }

  render() {
    const {
      comp,
      value,
      prefix,
      suffix,
      theme,
      disabled,
      error,
      onPress,
      fullWidth,
      minWidth,
      testID,
      size,
      ...rest
    } = this.props;

    const isTextField = comp === 'TextField';
    const Root = disabled ? View : TouchableOpacity;
    const Comp = isTextField ? TextField : Dropdown;
    const pointerEvents = isTextField ? 'none' : 'auto';
    const {
      baseColor, iconColor, disabledColor, errorColor,
    } = getInputPalette(theme); // string to be used Colors[string]

    let iColor = iconColor;
    if (disabled) { iColor = disabledColor; }
    if (error) { iColor = errorColor; }

    const IconArrow = () => (
      <Icon
        iconSet="MaterialIcons"
        iconName="keyboard-arrow-down"
        size={24}
        color={iColor}
      />
    );

    if (fullWidth) {
      return (
        <Root onPress={this.handlePress} testID={testID}>
          <Row>
            <FlexOne pointerEvents={pointerEvents}>
              <Comp
                ref={(field) => { this.field = field; }}
                containerStyle={{ width: '100%', pointerEvents }}
                value={value}
                disabled={disabled}
                theme={theme}
                size={size}
                error={error}
                {...rest}
              />
            </FlexOne>
            {/* Add custom carret */}
            <View>
              <Spacer size="XXL" />
              <IconArrow />
            </View>
          </Row>
        </Root>
      );
    }

    // Dynamic width based on content
    const width = Math.max(
      minWidth || MIN_WIDTH,
      (value && 12 * value.replace(' ', '').length + 32) || MIN_WIDTH,
      (error && 6 * error.replace(' ', '').length) || MIN_WIDTH,
    );

    return (
      <Root onPress={this.handlePress} testID={testID}>
        <Row>
          <View>
            <Spacer size="XXL" />
            <Text size={size} color={baseColor}>
              {prefix}
            </Text>
          </View>
          <Spacer row size="ML" />
          <View pointerEvents={pointerEvents}>
            <Comp
              ref={(field) => { this.field = field; }}
              value={value}
              disabled={disabled}
              style={{
                paddingHorizontal: 8,
                // textAlign: 'center',
                width,
              }}
              containerStyle={{ width, pointerEvents }}
              theme={theme}
              size={size}
              error={error}
              {...rest}
            />
          </View>
          {/* Add custom carret */}
          <View>
            <Spacer size="XXL" />
            <IconArrow />
          </View>
          <Spacer row size="ML" />
          <View>
            <Spacer size="XXL" />
            <Text size={size} color={baseColor}>
              {suffix}
            </Text>
          </View>
        </Row>
      </Root>
    );
  }
}

InputField.propTypes = {
  comp: PropTypes.oneOf(['TextField', 'Dropdown']).isRequired,
  value: PropTypes.string,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  disabled: PropTypes.bool,
  theme: PropTypes.oneOf(['white', 'black', 'transparent', 'mix']),
  size: PropTypes.oneOf(Object.keys(Fonts)),
  error: PropTypes.string,
  onPress: PropTypes.func,
  fullWidth: PropTypes.bool,
  minWidth: PropTypes.number,
  testID: PropTypes.string,
  focusable: PropTypes.bool,
  // Plus all props from TextField and Dropdown comps
};

InputField.defaultProps = {
  value: '',
  prefix: '',
  suffix: '',
  disabled: false,
  theme: 'black',
  size: 'M',
  error: '',
  onPress: () => {},
  fullWidth: false,
  minWidth: null,
  testID: '',
  focusable: true,
};

export default InputField;
