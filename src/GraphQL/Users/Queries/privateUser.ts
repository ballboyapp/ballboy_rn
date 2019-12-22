import gql from 'graphql-tag';
import privateUserFragment from '../Fragments/privateUser';

const privateUserQuery = gql`
  query {
    privateUser {
      ...privateUserFragment
    }
  }
  ${privateUserFragment}
`;

export default privateUserQuery;
