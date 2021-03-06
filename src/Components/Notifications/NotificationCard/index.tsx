import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';
import I18n from '../../../I18n';
import notificationFragment from '../../../GraphQL/NotificationsList/Fragments/notification';
import Row from '../../Common/Row';
import Spacer from '../../Common/Spacer';
import Text from '../../Common/Text';
import Avatar from '../../Common/Avatar';
import getNotificationTypeText from './utils';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const CARD_HEIGHT = 80;
const IMG_WIDTH = Avatar.size('M');
const IMG_PADDING = 16;

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const RowContainer = styled(Row)`
  height: ${CARD_HEIGHT}px;
  background-color: ${({ theme, highlight }) => theme.colors[highlight ? 'notifBg' : 'white']};
`;
//------------------------------------------------------------------------------
const Left = styled.View`
  height: ${CARD_HEIGHT}px;
  width: ${IMG_WIDTH + 2 * IMG_PADDING}px;
  padding: ${IMG_PADDING}px;
`;
//------------------------------------------------------------------------------
const Right = styled.View`
  flex: 1;
  padding: 8px 8px 8px 0;
  overflow: hidden;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const NotificationCard = ({ notification, onCardPress }) => {
  const {
    createdAt, notificationType, sender, payload, didRead,
  } = notification;

  const { activityTitle } = JSON.parse(payload);

  const eventDescription = getNotificationTypeText(notificationType);

  return (
    <TouchableOpacity
      onPress={onCardPress}
      activeOpacity={1}
    >
      <RowContainer alignItems="flex-end" highlight={!didRead}>
        <Left>
          <Avatar
            user={{
              _id: sender.id,
              profile: {
                avatar: sender.avatarURL,
                username: sender.name,
              },
            }}
            size="M"
          />
        </Left>
        <Right>
          <Text size="SM" numberOfLines={1}>
            <Text size="SM" semibold>
              {`${sender.name} `}
            </Text>
            <Text size="SM">
              {`${I18n.t(eventDescription)} `}
            </Text>
            <Text size="SM" semibold>
              {activityTitle || ''}
            </Text>
          </Text>
          <Row alignItems="center">
            <Text size="SSM" color="dusk">
              {moment(createdAt).fromNow()}
            </Text>
          </Row>
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
