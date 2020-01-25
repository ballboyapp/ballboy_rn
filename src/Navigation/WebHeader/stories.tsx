import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View, Text } from 'react-native';
import WebHeader from '.';

storiesOf('Navigation.WebHeader', module)
  .add('WebHeader', () => (
    <View style={{ backgroundColor: 'gray', flex: 1 }}>
      <WebHeader
        centerComponent={() => <Text>I&apos;m the title</Text>}
        leftComponent={() => <Text>I&apos;m the left comp</Text>}
        rightComponent={() => <Text>I&apos;m the right comp</Text>}
      />
    </View>
  ));
