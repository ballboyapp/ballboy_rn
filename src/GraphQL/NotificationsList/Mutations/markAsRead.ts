import gql from 'graphql-tag';

const markAsReadMutation = gql`
  mutation markAsRead {
    markAsRead {
      _id
    }
  }
`;

export default markAsReadMutation;
