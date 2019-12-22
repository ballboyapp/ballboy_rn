import gql from 'graphql-tag';

const removeAttendeeMutation = gql`
  mutation removeAttendee($_id: ID!) {
    removeAttendee(_id: $_id) {
      _id
    }
  }
`;

export default removeAttendeeMutation;
