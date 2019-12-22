import gql from 'graphql-tag';
import activityFragment from '../../Activities/Fragments/activity';
import spotDetailsFragment from '../Fragments/spotDetails';

const spotDetailsQuery = gql`
  query spotDetails($_id: ID!, $limit: Int!, $offset: Int!) {
    spotDetails(_id: $_id) {
      ...spotDetailsFragment
      activities (limit: $limit, offset: $offset) {
        ...activityFragment
      }
    }
  }
  ${spotDetailsFragment}
  ${activityFragment}
`;

export default spotDetailsQuery;
