import React from 'react';
import PropTypes from 'prop-types';
import { Platform, View } from 'react-native';
import Fonts from '../../../Themes/Fonts';
import Colors from '../../../Themes/Colors';
import getInputPalette from '../../../Themes/Palettes';

const DropdownMUI = Platform.select({
  web: require('@material-ui/core').Select,
  default: require('react-native-material-dropdown').Dropdown,
});

const MenuItem = Platform.select({
  web: require('@material-ui/core').MenuItem,
  default: null,
});

const InputLabel = Platform.select({
  web: require('@material-ui/core').InputLabel,
  default: null,
});

const InputBase = Platform.select({
  web: require('@material-ui/core').InputBase,
  default: null,
});

const withStyles = Platform.select({
  web: require('@material-ui/core/styles').withStyles,
  default: () => {},
});

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// We extend Dropdown component so that is can receive an array of
// { label, value } pairs instead of only { value }
const Dropdown = React.forwardRef(({
  theme,
  size,
  data,
  onChangeText,
  label,
  style,
  disabled,
  ...rest
}, ref) => {
  const {
    fontColor,
    baseColor,
    tintColor,
    disabledColor,
    errorColor,
    lineWidth,
  } = getInputPalette(theme); // string to be used Colors[string]

  if (Platform.OS === 'web') {
    const CustomLabel = withStyles(() => ({
      root: {
        fontFamily: Fonts.M.fontFamily,
        fontSize: Fonts.M.fontSize,
        color: disabled ? Colors[disabledColor] : Colors[fontColor],
        // height: 1.5 * Fonts.M.fontSize,
      },
      focused: {
        borderColor: Colors[tintColor],
      },
    }))(InputLabel);

    const CustomInput = withStyles(() => ({
      input: {
        fontSize: Fonts[size].fontSize,
        fontWeight: 'normal',
        fontFamily: Fonts[size].fontFamily,
        marginTop: 8,
        color: disabled ? Colors[disabledColor] : Colors[fontColor],
        borderBottom: `${disabled ? 0 : lineWidth}px solid ${disabled ? Colors[disabledColor] : Colors[baseColor]}`,
        ...style,
        '&:focus': {
          borderColor: Colors[tintColor],
        },
      },
    }))(InputBase);

    // TODO: use MUI TextField instead
    return (
      <View style={{ height: 73, justifyContent: 'center' }}>
        <CustomLabel>{label}</CustomLabel>
        <DropdownMUI
          inputRef={ref}
          // ref={ref}
          value={rest.value}
          onChange={(evt) => {
            onChangeText(data.find((d) => (d.label === evt.target.value)));
          }}
          input={<CustomInput />}
          IconComponent={() => null}
          disabled={disabled}
          // {...rest}
        >
          {data.map((item) => (
            <MenuItem
              key={item.label}
              value={item.label}
            >
              {item.label}
            </MenuItem>
          ))}
        </DropdownMUI>
      </View>
    );
  }

  return (
    <DropdownMUI
      ref={ref}
      data={data.map((item) => ({ value: item.label }))}
      onChangeText={(value) => {
        onChangeText(data.find((d) => (d.label === value)));
      }}
      label={label}
      labelFontSize={Fonts.M.fontSize}
      labelTextStyle={{ fontFamily: Fonts.M.fontFamily }}
      labelHeight={1.5 * Fonts.M.fontSize}
      errorColor={Colors[errorColor]}
      animationDuration={150}
      lineWidth={lineWidth}
      disabledLineWidth={0}
      baseColor={Colors[baseColor]}
      tintColor={Colors[tintColor]}
      rippleOpacity={0}
      dropdownPosition={-8}
      dropdownOffset={{ top: 0, left: 16 }}
      itemCount={8}
      // Hide default carret
      renderAccessory={() => (null)}
      inputContainerPadding={14}
      disabled={disabled}
      style={{
        fontSize: Fonts[size].fontSize,
        fontWeight: 'normal',
        fontFamily: Fonts[size].fontFamily,
        marginTop: 8,
        color: disabled ? Colors[disabledColor] : Colors[fontColor],
        ...style,
      }}
      {...rest}
    />
  );
});

Dropdown.propTypes = {
  theme: PropTypes.oneOf(['white', 'black', 'transparent', 'mix']),
  size: PropTypes.oneOf(Object.keys(Fonts)),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any,
    }).isRequired,
  ).isRequired,
  onChangeText: PropTypes.func,
  label: PropTypes.string,
  style: PropTypes.object, // eslint-disable-line
  disabled: PropTypes.bool,
  // Plus all props from react-native-material-textfield
};

Dropdown.defaultProps = {
  theme: 'black',
  size: 'M',
  label: '',
  onChangeText: () => {},
  style: {},
  disabled: false,
};

export default Dropdown;
