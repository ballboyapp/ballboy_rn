import { storiesOf } from '@storybook/react-native';
import React from 'react';
import CitySlide from '.';

class Container extends React.PureComponent {
  state = {
    city: null,
  }

  handleChange = ({ fieldName, value }) => {
    if (!fieldName) { return; }
    this.setState({ [fieldName]: value });
  }

  render() {
    const { city } = this.state;

    return (
      <CitySlide
        city={city}
        onChange={this.handleChange}
      />
    );
  }
}

storiesOf('Onboarding.CitySlide', module)
  .add('CitySlide', () => <Container />);
