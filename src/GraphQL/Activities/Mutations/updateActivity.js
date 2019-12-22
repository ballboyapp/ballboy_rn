import gql from 'graphql-tag';

const updateActivityMutation = gql`
  mutation updateActivity(
    $_id: ID!,
    $dateTime: String!
    $duration: Int
    $capacity: Int
    $spotId: ID!
    $title: String!
    $description: String
  ) {
    updateActivity(
      _id: $_id
      dateTime: $dateTime
      duration: $duration
      capacity: $capacity
      spotId: $spotId
      title: $title
      description: $description
    ) {
      _id
    }
  }
`;

export default updateActivityMutation;

