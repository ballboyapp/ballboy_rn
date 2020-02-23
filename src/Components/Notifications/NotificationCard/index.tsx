import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';
import I18n from '../../../I18n';
import notificationFragment from '../../../GraphQL/NotificationsList/Fragments/notification';
import Row from '../../Common/Row';
import Spacer from '../../Common/Spacer';
import DotSpacer from '../../Common/DotSpacer';
import Text from '../../Common/Text';
import Icon from '../../Common/Icon';
import { getNotificationIcon, getNotificationTypeText } from './utils';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const CARD_HEIGHT = 80;
const IMG_WIDTH = 75;
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const RowContainer = styled(Row)`
  height: ${CARD_HEIGHT}px;
  background-color: ${({ theme }) => theme.colors.white};
`;
//------------------------------------------------------------------------------
const Left = styled.View`
  flex: 1;
  padding: 8px 8px 8px 0;
  overflow: hidden;
`;
//------------------------------------------------------------------------------
const Right = styled.View`
  height: ${CARD_HEIGHT}px;
  width: ${IMG_WIDTH}px;
`;
//------------------------------------------------------------------------------
// const Title = styled(Text.S)`
//   color: ${Colors.dusk}
// `;
// //------------------------------------------------------------------------------
// const Bold = styled(Text.SSM)`
//   font-weight: 500;
//   line-height: 18px;
// `;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const NotificationCard = ({ notification, onCardPress }) => {
  const {
    createdAt, notificationType, sender, payload,
  } = notification;

  const { activityTitle } = JSON.parse(payload);

  const iconName = getNotificationIcon(notificationType);
  const [eventType, eventDescription] = getNotificationTypeText(notificationType);

  return (
    <TouchableOpacity
      onPress={onCardPress}
      activeOpacity={1}
    >
      <RowContainer>
        <Left>
          <Row alignItems="center">
            <Icon
              iconSet="MaterialCommunityIcons"
              iconName={iconName}
              size={18}
              color="link"
            />
            <Spacer row size="ML" />
            <Text size="S" color="dusk">
              {I18n.t(eventType)}
            </Text>
            <DotSpacer row size="M" />
            <Text size="S" color="dusk">
              {moment(createdAt).fromNow()}
            </Text>
          </Row>
          <Spacer size="S" />
          <Row alignItems="center">
            <Text size="SSM" semibold>
              {sender.name}
            </Text>
            <Spacer row size="S" />
            <Text size="SSM">
              {I18n.t(eventDescription)}
            </Text>
            <Spacer row size="S" />
            <Text size="SSM" semibold>
              {activityTitle || ''}
            </Text>
          </Row>
        </Left>
        <Right>
          <Image
            source={{ uri: sender.avatarURL }}
            style={{
              height: CARD_HEIGHT,
              width: IMG_WIDTH,
            }}
          />
        </Right>
      </RowContainer>
    </TouchableOpacity>
  );
};

NotificationCard.propTypes = {
  notification: propType(notificationFragment).isRequired,
  onCardPress: PropTypes.func,
};

NotificationCard.defaultProps = {
  onCardPress: () => {},
};

export default NotificationCard;
