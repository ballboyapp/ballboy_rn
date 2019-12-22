import gql from 'graphql-tag';

const addAttendeeMutation = gql`
  mutation addAttendee($_id: ID!) {
    addAttendee(_id: $_id) {
      _id
    }
  }
`;

export default addAttendeeMutation;
