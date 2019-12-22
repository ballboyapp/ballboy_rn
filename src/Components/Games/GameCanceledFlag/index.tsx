import React from 'react';
import styled from 'styled-components/native';
import I18n from '../../../I18n';
import Text from '../../Common/Text';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.negative};
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
  padding: 8px 16px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const GameCanceledFlag = (props) => (
  <Container {...props}>
    <Text size="M" color="white">
      {I18n.t('gameCanceledFlag.text')}
    </Text>
  </Container>
);

export default GameCanceledFlag;
