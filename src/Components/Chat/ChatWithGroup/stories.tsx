import { storiesOf } from '@storybook/react-native';
import React from 'react';
import styled from 'styled-components/native';
import ChatWithGroup from '.';

const Box = styled.View`
  border: 1px solid black;
`;

storiesOf('Chat.ChatWithGroup', module)
  .add('ChatWithGroup', () => (
    <Box>
      <ChatWithGroup />
    </Box>
  ));
