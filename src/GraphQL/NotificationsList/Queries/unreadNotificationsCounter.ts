import gql from 'graphql-tag';
import notificationsListBaseFragment from '../Fragments/notificationsListBase';

const unreadNotificationsCounterQuery = gql`
  query notificationsList {
    notificationsList {
      ...notificationsListBaseFragment
    }
  }
  ${notificationsListBaseFragment}
`;

export default unreadNotificationsCounterQuery;
