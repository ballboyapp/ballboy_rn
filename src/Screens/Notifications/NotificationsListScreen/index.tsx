import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { useQuery, useMutation } from 'react-apollo';
import get from 'lodash/get';
import moment from 'moment';
import { NOTIFICATION_TYPES } from '../../../constants';
import notificationsListQuery from '../../../GraphQL/NotificationsList/Queries/notificationsList';
import markAsReadMutation from '../../../GraphQL/NotificationsList/Mutations/markAsRead';
import NotificationsList from '../../../Components/Notifications/NotificationsList';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const NotificationsListScreen = ({ navigation }) => {
  const queryRes = useQuery(notificationsListQuery, {
    pollInterval: 1000 * 10, // milliseconds
  });
  const [markAsRead] = useMutation(markAsReadMutation);

  // Fire markAsRead mutation when component gets mounted or focused (native)
  const mutate = () => markAsRead({
    refetchQueries: [{
      query: notificationsListQuery,
    }],
  });

  // Fire on first render
  useEffect(() => {
    mutate();
  }, []);

  // Fire on focus (native)
  useEffect(() => {
    const unsubscribe = navigation.addListener('didFocus', () => {
      mutate();
    });

    return unsubscribe.remove;
  }, [navigation]);

  const handleNotificationPress = ({ notificationType, payload }) => {
    const { activityId, chatRoomId } = JSON.parse(payload);

    if (notificationType === NOTIFICATION_TYPES.NEW_MESSAGE) {
      if (Platform.OS === 'web') {
        navigation.navigate('GameChatScreen', { _id: activityId, roomId: chatRoomId });
      } else {
        navigation.navigate('GameSearchTab');
        navigation.navigate('GameDetailsScreen', { _id: activityId });
        navigation.navigate('GameChatScreen', { _id: activityId });
      }
    }

    if ([NOTIFICATION_TYPES.ATTENDEE_ADDED, NOTIFICATION_TYPES.ATTENDEE_REMOVED].includes(notificationType)) {
      if (Platform.OS === 'web') {
        navigation.navigate('PlayersListScreen', { _id: activityId });
      } else {
        navigation.navigate('GameSearchTab');
        navigation.navigate('GameDetailsScreen', { _id: activityId });
        navigation.navigate('PlayersListScreen', { _id: activityId });
      }
    }

    if (notificationType === NOTIFICATION_TYPES.ACTIVITY_RECREATED) {
      if (Platform.OS === 'web') {
        navigation.navigate('GameDetailsScreen', { _id: activityId });
      } else {
        navigation.navigate('GameSearchTab');
        navigation.navigate('GameDetailsScreen', { _id: activityId });
      }
    }
  };

  const {
    loading, error, data, refetch,
  } = queryRes;

  return (
    <NotificationsList
      notifications={get(data, 'notificationsList.items', [])
        .sort((a, b) => moment(b.createdAt).diff(moment(a.createdAt)))}
      onCardPress={handleNotificationPress}
      // FlatList props
      onRefresh={refetch}
      refreshing={loading}
    />
  );
};

NotificationsListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired,
};

export default NotificationsListScreen;
