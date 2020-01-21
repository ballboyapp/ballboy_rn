import gql from 'graphql-tag';

const activityBaseFragment = gql`
  fragment activityBaseFragment on Activity {
    _id
    organizer {
      _id
      profile {
        _id
        username
        avatar
      }
    }
    sport
    dateTime
    title
    status
    attendeesIds
    attendees {
      _id
      profile {
        _id
        username
        avatar
      }
    }
    isAttendee
  }
`;

export default activityBaseFragment;
