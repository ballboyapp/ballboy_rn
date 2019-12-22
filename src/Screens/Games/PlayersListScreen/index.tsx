import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { View } from 'react-native';
import activityDetailsQuery from '../../../GraphQL/Activities/Queries/activityDetails';
import Text from '../../../Components/Common/Text';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';
import PlayersList from '../../../Components/Games/PlayersList';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: introduce activityUserQuery so that we can do pagination on users
const PlayersListScreen = ({ navigation }) => (
  <Query
    query={activityDetailsQuery}
    variables={{ _id: navigation.state.params._id }}
  >
    {({ loading, error, data }) => {
      if (loading) return <CenteredActivityIndicator />;
      if (error) return <Text>{JSON.stringify(error)}</Text>;

      const { activityDetails } = data;
      const { attendees } = activityDetails;

      return (
        <View style={{ flex: 1 }}>
          <PlayersList players={attendees} />
        </View>
      );
    }}
  </Query>
);

PlayersListScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        _id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default PlayersListScreen;
