import gql from 'graphql-tag';

const loginMutation = gql`
  mutation login($email: String!) {
    login(email: $email) {
      _id
    }
  }
`;

export default loginMutation;
