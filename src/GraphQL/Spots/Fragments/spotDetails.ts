import gql from 'graphql-tag';
import spotBaseFragment from './spotBase';

const spotDetailsFragment = gql`
  fragment spotDetailsFragment on Spot {
    ...spotBaseFragment
    address
    location {
      coordinates
    }
  }
  ${spotBaseFragment}
`;

export default spotDetailsFragment;
