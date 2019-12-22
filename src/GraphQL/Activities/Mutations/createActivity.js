import gql from 'graphql-tag';

const createActivityMutation = gql`
  mutation createActivity(
    $sport: Sport!,
    $dateTime: String!,
    $duration: Int,
    $capacity: Int,
    $spotId: ID!,
    $title: String!,
    $description: String,
  ) {
    createActivity(
      sport: $sport,
      dateTime: $dateTime,
      duration: $duration,
      capacity: $capacity,
      spotId: $spotId,
      title: $title,
      description: $description,
    ) {
      _id
    }
  }
`;

export default createActivityMutation;
