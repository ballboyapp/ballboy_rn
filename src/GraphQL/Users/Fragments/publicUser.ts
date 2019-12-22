import gql from 'graphql-tag';
import userProfileFragment from './userProfile';

const publicUserFragment = gql`
  fragment publicUserFragment on PublicUser {
    _id
    profile {
      ...userProfileFragment
    }
  }
  ${userProfileFragment}
`;

export default publicUserFragment;
