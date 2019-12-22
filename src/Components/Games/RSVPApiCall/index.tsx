import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import { ATTENDEE_ACTIONS } from '../../../constants';
import addAttendeeMutation from '../../../GraphQL/Activities/Mutations/addAttendee';
import removeAttendeeMutation from '../../../GraphQL/Activities/Mutations/removeAttendee';
import activityDetailsQuery from '../../../GraphQL/Activities/Queries/activityDetails';
import activitiesQuery from '../../../GraphQL/Activities/Queries/activities';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: move this to ActivityApiCall
class RSVPApiCall extends React.PureComponent {
  handleUpdate = async (inputFields) => {
    const { addAttendee, removeAttendee, onSuccess, onError } = this.props;
    const { activityId, action } = inputFields;

    console.log('inputFields', inputFields);

    if (!Object.values(ATTENDEE_ACTIONS).includes(action)) {
      throw new Error('Unkown action');
    }

    const mutation = action === ATTENDEE_ACTIONS.ADD ? addAttendee : removeAttendee;
    const variables = { _id: activityId };

    try {
      await mutation({
        variables,
        refetchQueries: [{
          query: activityDetailsQuery,
          variables,
        }, {
          query: activitiesQuery,
          variables: {
            offset: 0,
            limit: 10,
          },
        }],
      });

      // Pass event up to parent component
      onSuccess({ activityId });
    } catch (exc) {
      console.log(exc);
      onError(exc);
    }
  }

  render() {
    const { children } = this.props;

    // Public API
    const api = {
      // TODO: change name OR expose 2 methods: addAttendee / removeAttendee
      updateStatus: this.handleUpdate,
    };

    return children(api);
  }
}

RSVPApiCall.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  addAttendee: PropTypes.func.isRequired,
  removeAttendee: PropTypes.func.isRequired,
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

RSVPApiCall.defaultProps = {
  onError: () => {},
  onSuccess: () => {},
};

const enhance = compose(
  graphql(addAttendeeMutation, { name: 'addAttendee' }),
  graphql(removeAttendeeMutation, { name: 'removeAttendee' }),
);

export default enhance(RSVPApiCall);
