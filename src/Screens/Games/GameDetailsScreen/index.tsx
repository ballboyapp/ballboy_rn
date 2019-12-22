import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { Query } from 'react-apollo';
import styled from 'styled-components/native';
import I18n from '../../../I18n';
import activityDetailsQuery from '../../../GraphQL/Activities/Queries/activityDetails';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';
import NothingFound from '../../../Components/Common/NothingFound';
import GameDetails from '../../../Components/Games/GameDetails';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled(ScrollView)`
  background-color: ${({ theme }) => theme.colors.concrete};
`;
//------------------------------------------------------------------------------
const NothingFoundContainer = styled.View`
  flex: 1;
  justify-content: center;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class GameDetailsScreen extends React.PureComponent {
  get activityId() {
    const { navigation } = this.props;
    return navigation.state.params._id;
  }

  handleSpotPress = (spot) => {
    const { navigation } = this.props;
    navigation.navigate('SpotDetailsScreen', { _id: spot._id });
  }

  handleChatPress = ({ roomId }) => {
    const { navigation } = this.props;
    navigation.navigate('GameChatScreen', { _id: this.activityId, roomId });
  }

  handleAttendeesPress = () => {
    const { navigation } = this.props;
    navigation.navigate('PlayersListScreen', { _id: this.activityId });
  }

  render() {
    return (
      <Query
        query={activityDetailsQuery}
        variables={{ _id: this.activityId }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data }) => {
          if (loading) return <CenteredActivityIndicator />;

          if (error || !data) {
            return (
              <NothingFoundContainer>
                <NothingFound
                  iconSet="MaterialCommunityIcons"
                  iconName="calendar-plus"
                  text={I18n.t('gameDetailsScreen.notFound')}
                />
              </NothingFoundContainer>
            );
          }

          const { activityDetails } = data;

          return (
            <Container testID="gameDetails">
              <GameDetails
                activity={activityDetails}
                onSpotPress={this.handleSpotPress}
                onChatPress={() => {
                  this.handleChatPress({ roomId: activityDetails.chatkitRoomId });
                }}
                onAttendeesPress={this.handleAttendeesPress}
              />
            </Container>
          );
        }}
      </Query>
    );
  }
}

GameDetailsScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        _id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default GameDetailsScreen;
