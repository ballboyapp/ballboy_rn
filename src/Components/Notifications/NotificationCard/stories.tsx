import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { useQuery } from 'react-apollo';
import get from 'lodash/get';
import notificationsListQuery from '../../../GraphQL/NotificationsList/Queries/notificationsList';
import NotificationCard from '.';

const Container = (props) => {
  const queryRes = useQuery(notificationsListQuery);

  const { loading, error, data } = queryRes;

  console.log({ error });

  if (loading || error || data == null) return null;

  const notifications = get(data, 'notificationsList.items', []);

  if (notifications.length === 0) return null;

  console.log({ notification: notifications[0] });

  return <NotificationCard notification={{ ...notifications[0], ...props }} />;
};

storiesOf('Notifications.NotificationCard', module)
  .add('NotificationCard', () => <Container didRead />)
  .add('NotificationCard unseen', () => <Container didRead={false} />);
