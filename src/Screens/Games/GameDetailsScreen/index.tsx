import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import { Query } from 'react-apollo';
import styled from 'styled-components/native';
import I18n from '../../../I18n';
import activityDetailsQuery from '../../../GraphQL/Activities/Queries/activityDetails';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';
import Block from '../../../Components/Common/Block';
import NothingFound from '../../../Components/Common/NothingFound';
import GameDetails from '../../../Components/Games/GameDetails';
import RSVP from '../../../Components/Games/RSVP';

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

          if (error || !data || !data.activityDetails) {
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
            <View style={{ flex: 1 }}>
              <Container
                testID="gameDetails"
                styeContentContainer={{ flex: 1 }}
              >
                <GameDetails
                  activity={activityDetails}
                  onSpotPress={this.handleSpotPress}
                  onChatPress={() => {
                    this.handleChatPress({ roomId: activityDetails.chatRoomId });
                  }}
                  onAttendeesPress={this.handleAttendeesPress}
                />
              </Container>
              <Block>
                <RSVP activity={activityDetails} />
              </Block>
            </View>
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
