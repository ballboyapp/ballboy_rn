import gql from 'graphql-tag';

const cancelActivityMutation = gql`
  mutation cancelActivity($_id: ID!, $msg: String) {
    cancelActivity(_id: $_id, msg: $msg) {
      _id
    }
  }
`;

export default cancelActivityMutation;
