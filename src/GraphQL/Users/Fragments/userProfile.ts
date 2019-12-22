import gql from 'graphql-tag';

const userProfileFragment = gql`
  fragment userProfileFragment on UserProfile {
    _id
    username
    avatar
    birthdate
    gender
    language
    city
    country
  }
`;

export default userProfileFragment;
