import gql from 'graphql-tag';

const notificationsListBaseFragment = gql`
  fragment notificationsListBaseFragment on NotificationsList {
    _id
    unreadCounter
  }
`;

export default notificationsListBaseFragment;
