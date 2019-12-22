import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Block from '../Block';
import CityPickerField from '.';

class Container extends React.PureComponent {
  state = { city: null }

  handleChange = (city) => {
    this.setState(
      { city },
      // () => { console.log(this.state); },
    );
  }

  render() {
    const {
      theme,
      label,
      fullWidth,
      size,
    } = this.props;
    const { city } = this.state;

    return (
      <View>
        <CityPickerField
          theme={theme}
          label={label}
          fullWidth={fullWidth}
          city={city}
          onChange={this.handleChange}
          size={size}
        />
      </View>
    );
  }
}

Container.propTypes = {
  theme: PropTypes.oneOf(['black', 'white']),
  size: PropTypes.string,
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
};

Container.defaultProps = {
  theme: 'black',
  size: 'M',
  label: '',
  fullWidth: false,
};

storiesOf('Common.CityPickerField', module)
  .add('CityPickerField', () => <Container />)
  .add('CityPickerField white theme', () => (
    <Block bgColor="primaryGreen">
      <Container theme="white" />
    </Block>
  ))
  .add('CityPickerField fullWidth size ML', () => (
    <Container label="I'm the label" fullWidth size="ML" />
  ));
