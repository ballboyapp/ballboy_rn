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
    $repeatFrequency: Int,
  ) {
    createActivity(
      sport: $sport,
      dateTime: $dateTime,
      duration: $duration,
      capacity: $capacity,
      spotId: $spotId,
      title: $title,
      description: $description,
      repeatFrequency: $repeatFrequency,
    ) {
      _id
    }
  }
`;

export default createActivityMutation;
