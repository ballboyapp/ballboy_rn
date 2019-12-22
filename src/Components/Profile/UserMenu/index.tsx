import React from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';
import { withApollo } from 'react-apollo';
import I18n from '../../../I18n';
import Menu from '../../Common/Menu';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class UserMenu extends React.PureComponent {
  handleLogout = async () => {
    const { navigation, client } = this.props;
    // Remove token from async storage and reset apollo store
    await AsyncStorage.removeItem('x-auth-token');
    await client.resetStore();
    navigation.navigate('SplashScreen');
  }

  handleEdit = () => {
    const { navigation } = this.props;
    navigation.navigate('ProfileEditScreen');
  }

  render() {
    const OPTIONS = [
      // {
      //   id: 'edit',
      //   text: I18n.t('userMenu.edit'),
      //   onPress: this.handleEdit,
      // },
      {
        id: 'logout',
        text: I18n.t('userMenu.logout'),
        danger: true,
        onPress: this.handleLogout,
      },
    ];

    return (
      <Menu
        menuName="user-profile-menu"
        triggerName="user-profile-trigger"
        options={OPTIONS}
      />
    );
  }
}

UserMenu.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  client: PropTypes.shape({
    resetStore: PropTypes.func.isRequired,
  }).isRequired,
};

export default withApollo(UserMenu);
