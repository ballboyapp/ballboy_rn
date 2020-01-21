import gql from 'graphql-tag';
import notificationBaseFragment from '../Fragments/notificationBase';

const notificationsQuery = gql`
  query notifications($limit: Int!, $offset: Int!) {
    notifications(limit: $limit, offset: $offset) {
      ...notificationBaseFragment
    }
  }
  ${notificationBaseFragment}
`;

export default notificationsQuery;
