import React from 'react';
import { propType } from 'graphql-anywhere';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import styled from 'styled-components/native';
import Colors from '../../../Themes/Colors';
import I18n from '../../../I18n';
import privateUserFragment from '../../../GraphQL/Users/Fragments/privateUser';
import Text from '../../Common/Text';
import UserSpots from '../UserSpots';
// import UserGames from '../UserGames';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  padding: 0 16px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ProfileTabs = ({ user }) => (
  React.createElement(createMaterialTopTabNavigator({
    Spots: {
      screen: () => (
        <Container>
          <UserSpots spots={(user && user.profile && user.profile.spots) || []} />
        </Container>
      ),
      navigationOptions: {
        tabBarLabel: (
          <Text bold>
            {I18n.t('profileTabs.spots')}
          </Text>
        ),
      },
    },
    /* Games: {
      screen: () => <UserGames user={user} />,
      navigationOptions: {
        tabBarLabel: I18n.t('profileTabs.activities'),
      },
    }, */
  }, {
    tabBarPosition: 'top',
    tabBarOptions: {
      style: {
        backgroundColor: Colors.white,
      },
      labelStyle: {
        color: 'black',
        fontWeight: '700',
      },
      indicatorStyle: {
        backgroundColor: Colors.primaryGreen,
        height: 4,
      },
    },
    initialRouteName: 'Spots',
  }))
);

ProfileTabs.propTypes = {
  user: propType(privateUserFragment).isRequired,
};

export default ProfileTabs;
