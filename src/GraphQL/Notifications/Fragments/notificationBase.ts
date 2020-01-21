import gql from 'graphql-tag';

const notificationBaseFragment = gql`
  fragment notificationBaseFragment on Notification {
    _id
    createdBy
    createdAt
    recipientId
    #recipient {
    #  _id
    #  profile {
    #    _id
    #    username
    #    avatar
    #  }
    #}
    notificationType
    link
    didRead
  }
`;

export default notificationBaseFragment;
