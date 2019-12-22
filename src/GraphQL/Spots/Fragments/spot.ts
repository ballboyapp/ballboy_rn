import gql from 'graphql-tag';
import spotBaseFragment from './spotBase';

const spotFragment = gql`
  fragment spotFragment on Spot {
    ...spotBaseFragment
  }
  ${spotBaseFragment}
`;

export default spotFragment;
