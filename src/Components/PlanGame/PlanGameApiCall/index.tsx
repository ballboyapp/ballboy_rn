import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import moment from 'moment-timezone';
import createActivityMutation from '../../../GraphQL/Activities/Mutations/createActivity';
import activitiesQuery from '../../../GraphQL/Activities/Queries/activities';
import curateErrors from './utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class PlanGameApiCall extends React.PureComponent {
  handleCreate = async (inputFields) => {
    const { createActivity, onSuccess, onError } = this.props;
    const {
      sport,
      date,
      time,
      duration,
      capacity,
      spot,
      title,
      description,
    } = inputFields;

    // Get user timezone, startTime and endTime from date, time and duration
    // const userTZ = moment.tz.guess();
    const dateTime = moment.utc([
      date.year(),
      date.month(),
      date.date(),
      time.hour(),
      time.minute(),
    ]);
    // const endTime = startTime.clone().add(duration, 'minutes');

    const variables = {
      sport,
      dateTime: dateTime.toISOString(),
      duration,
      capacity,
      spotId: spot._id,
      title,
      description,
    };

    console.log('variables', variables);

    try {
      const res = await createActivity({
        variables,
        refetchQueries: {
          query: activitiesQuery,
          variables: {
            offset: 0,
            limit: 10,
          },
        },
      });
      console.log('CREATE ACTIVITY RESPONSE', res);
      onSuccess({ activityId: res.data.createActivity._id });
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
      createActivity: this.handleCreate,
    };

    return children(api);
  }
}

PlanGameApiCall.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  createActivity: PropTypes.func.isRequired,
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

PlanGameApiCall.defaultProps = {
  onError: () => {},
  onSuccess: () => {},
};

const enhance = compose(
  graphql(createActivityMutation, { name: 'createActivity' }),
);

export default enhance(PlanGameApiCall);


// import React from 'react';
// import PropTypes from 'prop-types';
// import moment from 'moment-timezone';
// import SeedorfAPI from '../../../Services/SeedorfApi';
// import curateErrors from './utils';

// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// class PlanGameApiCall extends React.PureComponent {
//   handleCreate = async (inputFields) => {
//     const { onPlanSuccess, onPlanError } = this.props;
//     const {
//       title,
//       sport,
//       date,
//       time,
//       duration,
//       capacity,
//       spot,
//       description,
//     } = inputFields;

//     // Get user timezone, startTime and endTime from date, time and duration
//     const userTZ = moment.tz.guess();
//     const startTime = moment.utc([
//       date.year(),
//       date.month(),
//       date.date(),
//       time.hour(),
//       time.minute(),
//     ]);
//     const endTime = startTime.clone().add(duration, 'minutes');

//     // TODO: replace this with a single endpoint
//     let gameUUID;

//     try {
//       // Create game
//       const res = await SeedorfAPI.createGame({
//         title,
//         startTZ: userTZ,
//         startTime: startTime.toISOString(),
//         endTZ: userTZ,
//         endTime: endTime ? endTime.toISOString() : null,
//         capacity,
//         description,
//       });
//       console.log('CREATE GAME RESPONSE', res);
//       gameUUID = res.data.uuid;

//       if (res && res.problem) {
//         const errors = curateErrors(res.data);
//         onPlanError(errors);
//         return;
//       }
//     } catch (exc) {
//       console.log(exc);
//       onPlanError(exc);
//       return;
//     }

//     try {
//       // Set sport
//       const res = await SeedorfAPI.setGameSport({ gameUUID, sport });
//       console.log('SET SPORT RESPONSE', res);

//       if (res && res.problem) {
//         const errors = curateErrors(res.data);
//         onPlanError(errors);
//         return;
//       }
//     } catch (exc) {
//       console.log(exc);
//       onPlanError(exc);
//       return;
//     }

//     try {
//       // Set spot
//       const res = await SeedorfAPI.setGameSpot({ gameUUID, spotUUID: spot.uuid });
//       console.log('SET SPOT RESPONSE', res);

//       if (res && res.problem) {
//         const errors = curateErrors(res.data);
//         onPlanError(errors);
//         return;
//       }
//     } catch (exc) {
//       console.log(exc);
//       onPlanError(exc);
//       return;
//     }

//     try {
//       // Set game status to 'planned'
//       const res = await SeedorfAPI.setGameStatus({ gameUUID, status: 'PLANNED' });
//       console.log('SET GAME STATUS TO PLANNED', res);

//       if (res && res.problem) {
//         const errors = curateErrors(res.data);
//         onPlanError(errors);
//         return;
//       }
//     } catch (exc) {
//       console.log(exc);
//       onPlanError(exc);
//       return;
//     }

//     // Pass event up to parent component
//     onPlanSuccess({ gameUUID });
//   }

//   render() {
//     const { children } = this.props;

//     // Public API
//     const api = {
//       createGame: this.handleCreate,
//     };

//     return children(api);
//   }
// }

// PlanGameApiCall.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.func,
//     PropTypes.object,
//   ]).isRequired,
//   onPlanError: PropTypes.func,
//   onPlanSuccess: PropTypes.func,
// };

// PlanGameApiCall.defaultProps = {
//   onPlanError: () => {},
//   onPlanSuccess: () => {},
// };

// export default PlanGameApiCall;
