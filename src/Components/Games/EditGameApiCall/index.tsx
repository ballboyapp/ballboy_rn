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
    };

    console.log('variables', variables);

    try {
      const res = await updateActivity({
        variables,
        refetchQueries: [{
          query: activityDetailsQuery,
          variables: { _id },
        }],
      });

      console.log('UPDATE ACTIVITY RESPONSE', res);
      onSuccess({ activityId: res.data.updateActivity._id });
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


// import React from 'react';
// import PropTypes from 'prop-types';
// import moment from 'moment/moment';
// import SeedorfAPI from '../../../Services/SeedorfApi';
// import curateErrors from './utils';

// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// // TODO: move this logic to ActivityApiCall / GameApiCall
// class EditGameApiCall extends React.PureComponent {
//   handleUpdate = async (inputFields) => {
//     const { onEditSuccess, onEditError } = this.props;
//     const {
//       gameUUID,
//       name,
//       date,
//       time,
//       duration,
//       capacity,
//       spot,
//       description,
//       isPublic,
//     } = inputFields;

//     const startTime = moment.utc([
//       date.year(),
//       date.month(),
//       date.date(),
//       time.hour(),
//       time.minute(),
//     ]);
//     const endTime = startTime.clone().add(duration, 'minutes');

//     try {
//       // Set title
//       const res = await SeedorfAPI.setGameName({ gameUUID, name });
//       console.log('EDIT GAME NAME RESPONSE', res);

//       if (res && res.problem) {
//         const errors = curateErrors(res.data);
//         onEditError(errors);
//         return;
//       }
//     } catch (exc) {
//       console.log(exc);
//       onEditError(exc);
//       return;
//     }

//     try {
//       // Set date and duration
//       const res = await SeedorfAPI.setGameTimes({
//         gameUUID,
//         startTime: startTime.toISOString(),
//         endTime: endTime ? endTime.toISOString() : null,
//       });
//       console.log('EDIT GAME SET TIME RESPONSE', res);

//       if (res && res.problem) {
//         const errors = curateErrors(res.data);
//         onEditError(errors);
//         return;
//       }
//     } catch (exc) {
//       console.log(exc);
//       onEditError(exc);
//       return;
//     }

//     try {
//       // Set capacity
//       const res = await SeedorfAPI.setGameCapacity({ gameUUID, capacity: capacity || null });
//       console.log('EDIT GAME CAPACITY RESPONSE', res);

//       if (res && res.problem) {
//         const errors = curateErrors(res.data);
//         onEditError(errors);
//         return;
//       }
//     } catch (exc) {
//       console.log(exc);
//       onEditError(exc);
//       return;
//     }

//     try {
//       // Set spot
//       const res = await SeedorfAPI.setGameSpot({ gameUUID, spotUUID: spot.uuid });
//       console.log('EDIT GAME SPOT RESPONSE', res);

//       if (res && res.problem) {
//         const errors = curateErrors(res.data);
//         onEditError(errors);
//         return;
//       }
//     } catch (exc) {
//       console.log(exc);
//       onEditError(exc);
//       return;
//     }

//     try {
//       // Set description
//       const res = await SeedorfAPI.setGameDescription({ gameUUID, description });
//       console.log('EDIT GAME DESCRIPTION RESPONSE', res);

//       if (res && res.problem) {
//         const errors = curateErrors(res.data);
//         onEditError(errors);
//         return;
//       }
//     } catch (exc) {
//       console.log(exc);
//       onEditError(exc);
//       return;
//     }

//     try {
//       // Set game status
//       const res = await SeedorfAPI.setGameInviteMode({
//         gameUUID,
//         inviteMode: isPublic ? 'open' : 'invite_only',
//       });
//       console.log('UPDATED GAME', res.data);

//       if (res && res.problem) {
//         const errors = curateErrors(res.data);
//         onEditError(errors);
//         return;
//       }
//     } catch (exc) {
//       console.log(exc);
//       onEditError(exc);
//       return;
//     }

//     // Pass event up to parent component
//     onEditSuccess();
//   }

//   render() {
//     const { children } = this.props;

//     // Public API
//     const api = {
//       updateGame: this.handleUpdate,
//     };

//     return children(api);
//   }
// }

// EditGameApiCall.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.func,
//     PropTypes.object,
//   ]).isRequired,
//   onEditError: PropTypes.func,
//   onEditSuccess: PropTypes.func,
// };

// EditGameApiCall.defaultProps = {
//   onEditError: () => {},
//   onEditSuccess: () => {},
// };

// export default EditGameApiCall;


// import React from 'react';
// import PropTypes from 'prop-types';
// import moment from 'moment/moment';
// import SeedorfAPI from '../../../Services/SeedorfApi';
// import curateErrors from './utils';

// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// class EditGameApiCall extends React.PureComponent {
//   handleUpdate = async (inputFields) => {
//     const { onEditSuccess, onEditError } = this.props;
//     const {
//       gameUUID,
//       name,
//       date,
//       time,
//       duration,
//       capacity,
//       spot,
//       description,
//       isPublic,
//     } = inputFields;

//     const startTime = moment.utc([
//       date.year(),
//       date.month(),
//       date.date(),
//       time.hour(),
//       time.minute(),
//     ]);
//     const endTime = startTime.clone().add(duration, 'minutes');

//     try {
//       // Update/set game fields
//       const resArray = await Promise.all([
//         // Set title
//         SeedorfAPI.setGameName({ gameUUID, name }),
//         // Set date and duration
//         SeedorfAPI.setGameTimes({
//           gameUUID,
//           startTime: startTime.toISOString(),
//           endTime: endTime ? endTime.toISOString() : null,
//         }),
//         // Set capacity
//         SeedorfAPI.setGameCapacity({ gameUUID, capacity: capacity || null }),
//         // Set spot
//         SeedorfAPI.setGameSpot({ gameUUID, spotUUID: spot.uuid }),
//         // Set description
//         SeedorfAPI.setGameDescription({ gameUUID, description }),
//         // Set game status
//         SeedorfAPI.setGameInviteMode({
//           gameUUID,
//           inviteMode: isPublic ? 'open' : 'invite_only',
//         }),
//       ]);
//       console.log('EDIT GAME RESPONSE', resArray);

//       for (let i = 0; i < resArray.length; i += 1) {
//         const res = resArray[i];
//         if (res && res.problem) {
//           const errors = curateErrors(res.data);
//           onPlanError(errors);
//           return;
//         }
//       }
//     } catch (exc) {
//       console.log(exc);
//       onEditError(exc);
//       return;
//     }

//     // Pass event up to parent component
//     onEditSuccess();
//   }

//   render() {
//     const { children } = this.props;

//     // Public API
//     const api = {
//       updateGame: this.handleUpdate,
//     };

//     return children(api);
//   }
// }

// EditGameApiCall.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.func,
//     PropTypes.object,
//   ]).isRequired,
//   onEditError: PropTypes.func,
//   onEditSuccess: PropTypes.func,
// };

// EditGameApiCall.defaultProps = {
//   onEditError: () => {},
//   onEditSuccess: () => {},
// };

// export default EditGameApiCall;
