import gql from 'graphql-tag';

const sendMessageMutation = gql`
  mutation sendMessage($roomId: ID!, $text: String!) {
    sendMessage(roomId: $roomId, text: $text) {
      _id
    }
  }
`;

export default sendMessageMutation;
