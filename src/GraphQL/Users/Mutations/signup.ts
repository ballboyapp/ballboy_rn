import gql from 'graphql-tag';

const signupMutation = gql`
  mutation signup(
    $username: String!,
    $email: String!,
    $language: Language!,
  ) {
    signup(
      username: $username,
      email: $email,
      language: $language,
    ) {
      _id
    }
  }
`;

export default signupMutation;
