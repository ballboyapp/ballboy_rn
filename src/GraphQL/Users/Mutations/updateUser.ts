import gql from 'graphql-tag';

const updateUserMutation = gql`
  mutation updateUser(
    $username: String,
    $gender: String,
    $avatar: String,
    $city: String,
    $country: String,
    $formattedAddress: String,
    $coordinates: [Float],
  ) {
    updateUser(
      username: $username
      gender: $gender
      avatar: $avatar
      city: $city
      country: $country
      formattedAddress: $formattedAddress
      coordinates: $coordinates
    ) {
      _id
    }
  }
`;

export default updateUserMutation;
