import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { FlatList } from 'react-native';
import I18n from '../../../I18n';
import notificationBaseFragment from '../../../GraphQL/Notifications/Fragments/notificationBase';
import NothingFound from '../../Common/NothingFound';
import Divider from '../../Common/Divider';
import NotificationCard from '../NotificationCard';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const NotificationsList = ({
  notifications,
  onCardPress,
  refreshing,
  ...rest
}) => (
  <FlatList
    showsVerticalScrollIndicator={false}
    data={notifications}
    keyExtractor={(item) => item._id}
    renderItem={({ item: notification }) => (
      <NotificationCard
        notification={notification}
        onCardPress={onCardPress}
      />
    )}
    ListEmptyComponent={!refreshing && (
      <NothingFound
        iconSet="MaterialCommunityIcons"
        iconName="whistle"
        text={I18n.t('notificationsList.noResults')}
      />
    )}
    ItemSeparatorComponent={() => <Divider />}
    onEndReachedThreshold={0.1}
    contentContainerStyle={{
      flexGrow: 1, // centers not-found-component
      paddingVertical: 0,
    }}
    refreshing={refreshing}
    {...rest}
  />
);

NotificationsList.propTypes = {
  notifications: PropTypes.arrayOf(propType(notificationBaseFragment)),
  onCardPress: PropTypes.func,
  refreshing: PropTypes.bool,
};

NotificationsList.defaultProps = {
  notifications: [],
  onCardPress: () => {},
  refreshing: false,
};

export default NotificationsList;
