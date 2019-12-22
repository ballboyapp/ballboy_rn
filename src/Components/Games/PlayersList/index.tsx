import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { View } from 'react-native';
import styled from 'styled-components/native';
import publicUserFragment from '../../../GraphQL/Users/Fragments/publicUser';
import Divider from '../../Common/Divider';
import PlayerRow from '../PlayerRow';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const PlayersList = ({ players }) => {
  console.log('PlayersList.players', players);
  return (
    <Container>
      {players.map(player => (
        <View key={player._id}>
          <PlayerRow player={player} />
          <Divider />
        </View>
      ))}
    </Container>
  );
};

PlayersList.propTypes = {
  players: PropTypes.arrayOf(propType(publicUserFragment)),
};

PlayersList.defaultProps = {
  players: [],
};

export default PlayersList;


// import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components/native';
// import Divider from '../../Common/Divider';
// import PlayerRow from '../PlayerRow';

// //------------------------------------------------------------------------------
// // STYLE:
// //------------------------------------------------------------------------------
// const Container = styled.ScrollView`
//   flex: 1;
//   background-color: ${({ theme }) => theme.colors.white};
// `;
// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// const PlayersList = ({ players }) => (
//   <Container>
//     {players.map(player => [
//       <PlayerRow key={player.user.uuid} player={player} />,
//       <Divider key={`divider-${player.user.uuid}`} />,
//     ])}
//   </Container>
// );

// PlayersList.propTypes = {
//   players: PropTypes.arrayOf(PlayerRow.propTypes.player),
// };

// PlayersList.defaultProps = {
//   players: [],
// };

// export default PlayersList;
