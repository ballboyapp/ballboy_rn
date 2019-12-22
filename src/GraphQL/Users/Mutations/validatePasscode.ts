import gql from 'graphql-tag';
import authTokenFragment from '../Fragments/authToken';

const validatePasscodeMutation = gql`
  mutation validatePasscode(
    $email: String!,
    $passcode: String!,
  ) {
    validatePasscode(
      email: $email,
      passcode: $passcode,
    ) {
      ...authTokenFragment
    }
  }
  ${authTokenFragment}
`;

export default validatePasscodeMutation;
