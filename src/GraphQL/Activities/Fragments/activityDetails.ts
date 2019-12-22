import gql from 'graphql-tag';
import spotDetailsFragment from '../../Spots/Fragments/spotDetails';
import activityBaseFragment from './activityBase';

const activityDetailsFragment = gql`
  fragment activityDetailsFragment on Activity {
    ...activityBaseFragment
    isOrganizer
    duration
    description
    capacity
    shareLink
    chatkitRoomId
    spot {
      ...spotDetailsFragment
    }
  }
  ${activityBaseFragment}
  ${spotDetailsFragment}
`;

export default activityDetailsFragment;
