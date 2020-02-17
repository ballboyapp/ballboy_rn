import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { useQuery } from 'react-apollo';
import get from 'lodash/get';
import notificationsListQuery from '../../../GraphQL/NotificationsList/Queries/notificationsList';
import NotificationsList from '.';

storiesOf('Notifications.NotificationsList', module)
  .add('NotificationsList', () => {
    const { loading, error, data } = useQuery(notificationsListQuery);

    if (loading || error) return null;

    return <NotificationsList notifications={get(data, 'notificationsList.items', [])} />;
  })
  .add('NotificationsList no items', () => <NotificationsList />);
