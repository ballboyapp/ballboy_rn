import gql from 'graphql-tag';
import notificationsListFragment from '../Fragments/notificationsList';

const notificationsListQuery = gql`
  query notificationsList {
    notificationsList {
      ...notificationsListFragment
    }
  }
  ${notificationsListFragment}
`;

export default notificationsListQuery;
