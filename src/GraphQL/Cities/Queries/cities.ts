import gql from 'graphql-tag';
import cityFragment from '../Fragments/city';

const citiesQuery = gql`
  query cities {
    cities {
      ...cityFragment
    }
  }
  ${cityFragment}
`;

export default citiesQuery;
