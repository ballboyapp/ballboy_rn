import gql from 'graphql-tag';
import activityDetailsFragment from '../Fragments/activityDetails';

const activityDetailsQuery = gql`
  query activityDetails($_id: ID!) {
    activityDetails(_id: $_id) {
      ...activityDetailsFragment
    }
  }
  ${activityDetailsFragment}
`;

export default activityDetailsQuery;
