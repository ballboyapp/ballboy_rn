import gql from 'graphql-tag';
import activityFragment from '../Fragments/activity';

const activitiesQuery = gql`
  query activities(
    $sports: [Sport],
    $distance: Float,
    $limit: Int!,
    $offset: Int!,
  ) {
    activities(
      sports: $sports,
      distance: $distance,
      limit: $limit,
      offset: $offset,
    ) {
      ...activityFragment
    }
  }
  ${activityFragment}
`;

export default activitiesQuery;
