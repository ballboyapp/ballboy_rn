import gql from 'graphql-tag';
import spotFragment from '../Fragments/spot';

const spotsQuery = gql`
  query spots(
    $sports: [Sport],
    $distance: Float,
    $limit: Int!,
    $offset: Int!,
  ) {
    spots(
      sports: $sports,
      distance: $distance,
      limit: $limit,
      offset: $offset,
    ) {
      ...spotFragment
    }
  }
  ${spotFragment}
`;

export default spotsQuery;
