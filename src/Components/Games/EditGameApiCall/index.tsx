import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import moment from 'moment-timezone';
import updateActivityMutation from '../../../GraphQL/Activities/Mutations/updateActivity';
import activityDetailsQuery from '../../../GraphQL/Activities/Queries/activityDetails';
import curateErrors from './utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: move this logic to ActivityApiCall / GameApiCall
class EditGameApiCall extends React.PureComponent {
  handleUpdate = async (inputFields) => {
    const { updateActivity, onSuccess, onError } = this.props;
    const {
      _id,
      date,
      time,
      duration,
      capacity,
      spot,
      title,
      description,
      repeatFrequency,
    } = inputFields;

    const dateTime = moment.utc([
      date.year(),
      date.month(),
      date.date(),
      time.hour(),
      time.minute(),
    ]);

    const variables = {
      _id,
      dateTime: dateTime.toISOString(),
      duration,
      capacity,
      spotId: spot._id,
      title,
      description,
      repeatFrequency,
    };

    // console.log('variables', variables);

    try {
      const res = await updateActivity({
        variables,
        refetchQueries: [{
          query: activityDetailsQuery,
          variables: { _id },
        }],
      });

      // console.log('UPDATE ACTIVITY RESPONSE', res);
      onSuccess({ activityId: res.data.updateActivity._id });
    } catch (exc) {
      // console.log(exc);
      const errors = curateErrors(exc.message || exc);
      onError(errors);
    }
  }

  render() {
    const { children } = this.props;

    // Public API
    const api = {
      updateGame: this.handleUpdate,
    };

    return children(api);
  }
}

EditGameApiCall.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  updateActivity: PropTypes.func.isRequired,
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

EditGameApiCall.defaultProps = {
  onError: () => {},
  onSuccess: () => {},
};

const enhance = compose(
  graphql(updateActivityMutation, { name: 'updateActivity' }),
);

export default enhance(EditGameApiCall);
