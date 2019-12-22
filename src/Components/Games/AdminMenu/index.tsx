import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import I18n from '../../../I18n';
import { ACTIVITY_STATUSES } from '../../../constants';
import activityDetailsQuery from '../../../GraphQL/Activities/Queries/activityDetails';
import Menu from '../../Common/Menu';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class AdminMenu extends React.PureComponent {
  handleEdit = () => {
    const { navigation, activityId } = this.props;
    navigation.navigate('EditGameScreen', { _id: activityId });
  }

  handleCancel = () => {
    const { navigation, activityId } = this.props;
    navigation.navigate('CancelGameScreen', { _id: activityId });
  }

  render() {
    const { activityId } = this.props;
    console.log('AdminMenu.activityId', activityId);

    const OPTIONS = [
      {
        id: 'edit',
        text: I18n.t('adminMenu.edit'),
        onPress: this.handleEdit,
      },
      {
        id: 'cancel',
        text: I18n.t('adminMenu.cancel'),
        danger: true,
        onPress: this.handleCancel,
      },
    ];

    return (
      <Query
        query={activityDetailsQuery}
        variables={{ _id: activityId }}
        fetchPolicy="network-only"
      >
        {({ loading, error, data }) => {
          if (loading || error || !data) {
            return null;
          }

          const { activityDetails } = data;
          const { isOrganizer } = activityDetails;

          // Only display menu if user is the organizer of the activity and the activity is active
          if (!isOrganizer || activityDetails.status !== ACTIVITY_STATUSES.ACTIVE) {
            return null;
          }

          return (
            <Menu
              testID="gameAdminMenuTrigger"
              menuName="display-game-menu"
              triggerName="display-game-trigger"
              options={OPTIONS}
            />
          );
        }}
      </Query>
    );
  }
}

AdminMenu.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  activityId: PropTypes.string.isRequired,
};

export default AdminMenu;
