// import { storiesOf } from '@storybook/react-native';
// import React from 'react';
// import { Query } from 'react-apollo';
// import privateUserQuery from '../../../GraphQL/Users/Queries/privateUser';
// import UserSpots from '.';

// storiesOf('Profile.UserSpots', module)
//   .add('UserSpots', () => (
//     <Query query={privateUserQuery}>
//       {({ loading, error, data }) => {
//         if (loading || error) return null;

//         return <UserSpots user={data.privateUser} />;
//       }}
//     </Query>
//   ))
//   .add('UserSpots no results', () => <UserSpots spots={[]} />);
