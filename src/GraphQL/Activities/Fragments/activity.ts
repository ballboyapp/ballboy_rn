import gql from 'graphql-tag';
import spotFragment from '../../Spots/Fragments/spot';
import activityBaseFragment from './activityBase';

const activityFragment = gql`
  fragment activityFragment on Activity {
    ...activityBaseFragment
    spot {
      ...spotFragment
    }
  }
  ${activityBaseFragment}
  ${spotFragment}
`;

export default activityFragment;
