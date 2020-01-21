import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { useQuery } from 'react-apollo';
import get from 'lodash/get';
import notificationsQuery from '../../../GraphQL/Notifications/Queries/notifications';
import NotificationsList from '.';

storiesOf('Notifications.NotificationsList', module)
  .add('NotificationsList', () => {
    const params = { variables: { offset: 0, limit: 10 } };
    const { loading, error, data } = useQuery(notificationsQuery, params);

    if (loading || error) return null;

    return <NotificationsList notifications={get(data, 'notifications', [])} />;
  })
  .add('NotificationsList no items', () => <NotificationsList />);
