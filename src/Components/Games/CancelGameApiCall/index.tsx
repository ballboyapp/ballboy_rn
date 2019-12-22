import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import cancelActivityMutation from '../../../GraphQL/Activities/Mutations/cancelActivity';
import curateErrors from './utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class CancelGameApiCall extends React.PureComponent {
  handleCancel = async (inputFields) => {
    const { cancelActivity, onSuccess, onError } = this.props;
    const { activityId, cancelMsg } = inputFields;

    try {
      const res = await cancelActivity({
        variables: {
          _id: activityId,
          msg: cancelMsg,
        },
        // DO NOT refetch here
      });
      console.log('CANCEL_GAME', res);
      onSuccess({ activityId });
    } catch (exc) {
      console.log(exc);
      const errors = curateErrors(exc.message || exc);
      onError(errors);
    }
  }

  render() {
    const { children } = this.props;

    // Public API
    const api = {
      cancelActivity: this.handleCancel,
    };

    return children(api);
  }
}

CancelGameApiCall.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  cancelActivity: PropTypes.func.isRequired,
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

CancelGameApiCall.defaultProps = {
  onError: () => {},
  onSuccess: () => {},
};

const enhance = compose(
  graphql(cancelActivityMutation, { name: 'cancelActivity' }),
);

export default enhance(CancelGameApiCall);
