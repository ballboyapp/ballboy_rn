import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import Colors from '../../../Themes/Colors';
import Block from '../Block';
import CapacityPickerField from '.';

class Container extends React.PureComponent {
  state = { value: null }

  handleChange = (value) => {
    this.setState({ value });
  }

  render() {
    const {
      theme,
      error,
      label,
      boxed,
      size,
    } = this.props;
    const { value } = this.state;

    return (
      <CapacityPickerField
        theme={theme}
        error={error}
        label={label}
        boxed={boxed}
        value={value}
        onChange={this.handleChange}
        size={size}
      />
    );
  }
}

Container.propTypes = {
  theme: PropTypes.oneOf(['black', 'white']),
  error: PropTypes.string,
  size: PropTypes.string,
  label: PropTypes.string,
  boxed: PropTypes.bool,
};

Container.defaultProps = {
  theme: 'black',
  error: '',
  size: 'M',
  label: '',
  boxed: false,
};

storiesOf('Common.CapacityPickerField', module)
  .add('CapacityPickerField', () => (
    <Container />
  ))
  .add('CapacityPickerField with ERROR', () => (
    <Container error="I'm the error" />
  ))
  .add('CapacityPickerField white theme', () => (
    <Block bgColor={Colors.primaryGreen}>
      <Container theme="white" />
    </Block>
  ))
  .add('CapacityPickerField boxed size ML', () => (
    <Container label="I'm the label" boxed size="ML" />
  ));
