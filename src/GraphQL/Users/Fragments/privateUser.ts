import gql from 'graphql-tag';
import userProfileFragment from './userProfile';

const privateUserFragment = gql`
  fragment privateUserFragment on PrivateUser {
    _id
    email
    profile {
      ...userProfileFragment
    }
    formattedAddress
    location {
      coordinates
    }
  }
  ${userProfileFragment}
`;

export default privateUserFragment;
