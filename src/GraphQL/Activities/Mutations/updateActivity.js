import gql from 'graphql-tag';

const updateActivityMutation = gql`
  mutation updateActivity(
    $_id: ID!,
    $dateTime: String!,
    $duration: Int,
    $capacity: Int,
    $spotId: ID!,
    $title: String!,
    $description: String,
    $repeatFrequency: Int,
  ) {
    updateActivity(
      _id: $_id,
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

export default updateActivityMutation;
