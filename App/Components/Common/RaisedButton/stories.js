import { storiesOf } from '@storybook/react-native';
import React from 'react';
import RaisedButton from './index';

storiesOf('Common.RaisedButton', module)
  .add('RaisedButton default', () => (
    <RaisedButton label="label" />
  ))
  .add('RaisedButton primary', () => (
    <RaisedButton variant="primary" label="label" />
  ))
  .add('RaisedButton secondary', () => (
    <RaisedButton variant="secondary" label="label" />
  ))
  .add('RaisedButton info', () => (
    <RaisedButton variant="info" label="label" />
  ))
  .add('RaisedButton warning', () => (
    <RaisedButton variant="warning" label="label" />
  ))
  .add('RaisedButton ghost', () => (
    <RaisedButton variant="ghost" label="label" />
  ))
  .add('RaisedButton ghost disabled', () => (
    <RaisedButton variant="ghost" disabled label="label" />
  ))
  .add('RaisedButton disabled', () => (
    <RaisedButton disabled label="label" />
  ))
  .add('RaisedButton primary small', () => (
    <RaisedButton
      variant="primary"
      size="S"
      label="label"
      width={120}
    />
  ));
