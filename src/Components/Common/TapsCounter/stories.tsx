import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import Text from '../Text';
import TapsCounter from '.';

class Container extends React.PureComponent {
  state = {
    limitReached: false,
  }

  render() {
    const { limitReached } = this.state;

    return (
      <View>
        <TapsCounter onTapsReached={() => { this.setState({ limitReached: true }); }}>
          <Text>Tap me!</Text>
        </TapsCounter>
        {limitReached && <Text>Limit reached!</Text>}
      </View>

    );
  }
}

storiesOf('Common.TapsCounter', module)
  .add('TapsCounter', () => <Container />);
