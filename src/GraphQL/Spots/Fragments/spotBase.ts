import gql from 'graphql-tag';

const spotBaseFragment = gql`
  fragment spotBaseFragment on Spot {
    _id
    spotname
    images
    sports
    distance
  }
`;

export default spotBaseFragment;
