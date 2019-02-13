import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Block from '../Block';
import LinkOpenURL from '.';

storiesOf('Common.LinkOpenURL', module)
  .add('LinkOpenURL', () => (
    <Block>
      <LinkOpenURL text="I'm the text" href="I'm the href" />
    </Block>
  ))
  .add('LinkOpenURL with icon', () => (
    <Block>
      <LinkOpenURL
        text="I'm the text"
        href="I'm the href"
        iconName="account-circle"
      />
    </Block>
  ));