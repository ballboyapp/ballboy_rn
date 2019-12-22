import gql from 'graphql-tag';

const authTokenFragment = gql`
  fragment authTokenFragment on AuthToken {
    _id
    token
  }
`;

export default authTokenFragment;
