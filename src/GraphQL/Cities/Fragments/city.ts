import gql from 'graphql-tag';

const cityFragment = gql`
  fragment cityFragment on City {
    _id
    name
    country
    formattedAddress
    location {
      coordinates
    }
  }
`;

export default cityFragment;
