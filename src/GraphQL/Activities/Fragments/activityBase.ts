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

// import gql from 'graphql-tag';
// import userNameAvatarFragment from '../../Users/Fragments/userNameAvatar';

// const gameFragment = gql`
//   fragment gameFragment on GameType {
//     id
//     uuid
//     status
//     name
//     start_time
//     end_time
//     is_featured
//     show_remaining
//     capacity
//     share_link
//     sport {
//       id
//       uuid
//       category
//     }
//     organizer {
//       id
//       uuid
//       ...userNameAvatarFragment
//     }
//     spot {
//       id
//       uuid
//       name
//       images {
//         uuid
//         image
//       }
//       amenities {
//         id
//         uuid
//         #sport {
//         #  uuid
//         #  category
//         #}
//         data
//       }
//       sports {
//         id
//         uuid
//         category
//       }
//       address {
//         id
//         uuid
//         lat
//         lng
//       }
//     }
//     attendees {
//       id
//       uuid
//       status
//       user {
//         id
//         uuid
//         ...userNameAvatarFragment
//       }
//     }
//   }
//   ${userNameAvatarFragment}
// `;

// export default gameFragment;
