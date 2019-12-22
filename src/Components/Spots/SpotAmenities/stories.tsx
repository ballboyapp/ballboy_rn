// import { storiesOf } from '@storybook/react-native';
// import React from 'react';
// import { Query } from 'react-apollo';
// import spotDetailsQuery from '../../../GraphQL/Spots/Queries/spotDetails';
// import SpotAmenities from '.';

// const navigation = {
//   navigate: () => null,
// };

// storiesOf('Spots.SpotAmenities', module)
//   .add('SpotAmenities', () => (
//     <Query
//       query={spotDetailsQuery}
//       variables={{ _id: '1', limit: 1, offset: 0 }}
//     >
//       {({ loading, error, data }) => {
//         if (loading || error) return null;

//         return (
//           <SpotAmenities
//             spot={data.spotDetails}
//             navigation={navigation}
//           />
//         );
//       }}
//     </Query>
//   ));
