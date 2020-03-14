import React from 'react';
import PropTypes from 'prop-types';
import { Platform, Keyboard } from 'react-native';
import { Query } from 'react-apollo';
// import firebase from 'react-native-firebase';
import styled from 'styled-components/native';
import get from 'lodash/get';
import I18n from '../../I18n';
import unreadNotificationsCounterQuery from '../../GraphQL/NotificationsList/Queries/unreadNotificationsCounter';
import Row from '../../Components/Common/Row';
import NavBarButton from '../NavBarButton';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const StyledRow = styled(Row)`
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.silver};
  height: 48;
`;
//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const buttons = [{
  id: 'activities',
  label: 'navBar.activities',
  route: Platform.select({ web: 'GamesListScreen', default: 'GameSearchTab' }),
  icon: {
    set: 'MaterialCommunityIcons',
    name: 'calendar',
  },
}, {
  id: 'spots',
  label: 'navBar.spots',
  route: Platform.select({ web: 'SpotsListScreen', default: 'SpotSearchTab' }),
  icon: {
    set: 'MaterialCommunityIcons',
    name: 'soccer-field', // 'map-marker-radius',
  },
}, {
  id: 'profile',
  label: 'navBar.profile',
  route: Platform.select({ web: 'ProfileEditScreen', default: 'ProfileTab' }),
  icon: {
    set: 'MaterialIcons',
    name: 'account-circle',
  },
}, {
  id: 'notifications',
  label: 'navBar.notifications',
  route: Platform.select({ web: 'NotificationsListScreen', default: 'NotificationsTab' }),
  icon: {
    set: 'MaterialCommunityIcons',
    name: 'bell',
  },
}, {
  id: 'info',
  label: 'navBar.info',
  route: Platform.select({ web: 'InfoScreen', default: 'InfoTab' }),
  icon: {
    set: 'MaterialIcons',
    name: 'info',
  },
}];
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class NavBar extends React.Component {
  state = {
    keyboardActive: false,
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => this.handleKeyboard({ active: true }));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => this.handleKeyboard({ active: false }));
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  get curRoute() {
    const { navigation } = this.props;
    const curRoute = navigation.state.routes[navigation.state.index];
    return Platform.OS === 'web' ? curRoute.key : curRoute.routeName;
  }

  handleKeyboard = ({ active }) => {
    this.setState({ keyboardActive: active });
  }

  handlePress = (btn) => {
    const { navigation } = this.props;

    // firebase.analytics().logEvent(`navbar_btn_press_${btn.route}`);
    if (Platform.OS === 'web') {
      navigation.navigate(btn.route);
    } else {
      // Go back to the begining of the stack
      navigation.popToTop();
      // Jump to the requested route.
      navigation.navigate({ routeName: btn.route });
    }
  };

  render() {
    const { keyboardActive } = this.state;

    if (keyboardActive) {
      return null;
    }

    return (
      <Query query={unreadNotificationsCounterQuery}>
        {({ loading, error, data }) => (
          <StyledRow>
            {buttons.map((btn) => (
              <NavBarButton
                testID={`navbarButton_${btn.id}`}
                key={btn.id}
                btnLabel={I18n.t(btn.label)}
                icon={btn.icon}
                withBadge={btn.id === 'notifications' && !loading && !error && get(data, 'notificationsList.unreadCounter', 0) > 0}
                badgeCounter={get(data, 'notificationsList.unreadCounter', 0)}
                active={this.curRoute === btn.route}
                onPress={() => { this.handlePress(btn); }}
              />
            ))}
          </StyledRow>
        )}
      </Query>
    );
  }
}

NavBar.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    popToTop: PropTypes.func.isRequired,
  }).isRequired,
};

export default NavBar;
