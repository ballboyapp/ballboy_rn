import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { useQuery } from 'react-apollo';
import get from 'lodash/get';
import moment from 'moment';
import { NOTIFICATION_TYPES } from '../../../constants';
import notificationsListQuery from '../../../GraphQL/NotificationsList/Queries/notificationsList';
import Row from '../../../Components/Common/Row';
import Spacer from '../../../Components/Common/Spacer';
import NotificationsList from '../../../Components/Notifications/NotificationsList';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const RowContainer = styled(Row)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const NotificationsListScreen = ({ navigation }) => {
  const queryRes = useQuery(notificationsListQuery);
  console.log({ queryRes });

  const handleNotificationPress = ({ notificationType, payload }) => {
    const { activityId, chatkitRoomId } = JSON.parse(payload);

    if (notificationType === NOTIFICATION_TYPES.NEW_MESSAGE) {
      // TODO: probably on native we need to move to root, then activity and finally chat screen
      navigation.navigate('GameChatScreen', { _id: activityId, roomId: chatkitRoomId });
    }

    if ([NOTIFICATION_TYPES.ATTENDEE_ADDED, NOTIFICATION_TYPES.ATTENDEE_REMOVED].includes(notificationType)) {
      // TODO: probably on native we need to move to root, then activity and finally chat screen
      navigation.navigate('PlayersListScreen', { _id: activityId });
    }

    if (notificationType === NOTIFICATION_TYPES.ACTIVITY_RECREATED) {
      // TODO: probably on native we need to move to root, then activity and finally chat screen
      navigation.navigate('GameDetailsScreen', { _id: activityId });
    }
  };

  const {
    loading, error, data, refetch,
  } = queryRes;

  return (
    <RowContainer>
      <Spacer row size="L" />
      <NotificationsList
        notifications={get(data, 'notificationsList.items', [])
          .sort((a, b) => moment(b.createdAt).diff(moment(a.createdAt)))}
        onCardPress={handleNotificationPress}
        // FlatList props
        onRefresh={refetch}
        refreshing={loading}
      />
    </RowContainer>
  );
};

NotificationsListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default NotificationsListScreen;
