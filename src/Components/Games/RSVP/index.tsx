import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import activityDetailsFragment from '../../../GraphQL/Activities/Fragments/activityDetails';
import FormProps from '../../../RenderProps/form-props';
import RSVPApiCall from '../RSVPApiCall';
import RSVPButtons from '../RSVPButtons';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const RSVP = ({ activity, joinLabel, editPresenceLabel }) => (
  <FormProps>
    {({
      disabled,
      handleBefore,
      handleClientCancel,
      handleServerError,
      handleSuccess,
    }) => (
      <RSVPApiCall
        onError={handleServerError}
        onSuccess={handleSuccess}
        // onRSVPSuccess={() => {
        //   // Extend formProps.handleSuccess' default functionality
        //   handleSuccess(onRSVPSuccess);
        // }}
      >
        {({ updateStatus }) => (
          <RSVPButtons
            activity={activity}
            joinLabel={joinLabel}
            editPresenceLabel={editPresenceLabel}
            disabled={disabled}
            onBeforeHook={handleBefore}
            onClientCancelHook={handleClientCancel}
            onSuccessHook={updateStatus}
          />
        )}
      </RSVPApiCall>
    )}
  </FormProps>
);

RSVP.propTypes = {
  activity: propType(activityDetailsFragment).isRequired,
  joinLabel: PropTypes.func,
  editPresenceLabel: PropTypes.func,
};

RSVP.defaultProps = {
  joinLabel: () => {},
  editPresenceLabel: () => {},
};

export default RSVP;


// import React from 'react';
// import PropTypes from 'prop-types';
// import FormProps from '../../../RenderProps/form-props';
// import RSVPApiCall from '../RSVPApiCall';
// import RSVPButtons from '../RSVPButtons';

// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// const RSVP = ({
//   gameUUID,
//   user,
//   userRSVP,
//   userStatus,
//   onRSVPLoggedOut,
//   onRSVPSuccess,
// }) => (
//   <FormProps>
//     {({
//       disabled,
//       handleBefore,
//       handleClientCancel,
//       handleServerError,
//       handleSuccess,
//     }) => (
//       <RSVPApiCall
//         onRSVPError={handleServerError}
//         onRSVPSuccess={() => {
//           // Extend formProps.handleSuccess' default functionality
//           handleSuccess(onRSVPSuccess);
//         }}
//       >
//         {({ updateStatus }) => (
//           <RSVPButtons
//             gameUUID={gameUUID}
//             userRSVP={userRSVP}
//             userStatus={userStatus}
//             disabled={disabled}
//             onBeforeHook={() => {
//               // Extend formProps.handleBefore' default functionality
//               handleBefore(() => {
//                 if (!user || !user.uuid) {
//                   onRSVPLoggedOut();
//                   // Throw error in order to interrupt rsvp normal flow
//                   throw new Error(401, 'User not authorized!');
//                 }
//               });
//             }}
//             onClientCancelHook={handleClientCancel}
//             // Call api to store data into DB
//             onSuccessHook={updateStatus}
//           />
//         )}
//       </RSVPApiCall>
//     )}
//   </FormProps>
// );

// RSVP.propTypes = {
//   gameUUID: PropTypes.string.isRequired,
//   user: PropTypes.object, // eslint-disable-line
//   userRSVP: PropTypes.object, // eslint-disable-line
//   userStatus: PropTypes.oneOf([
//     'UNKNOWN',
//     'ACCEPTED',
//     'ATTENDING',
//     'CHECKED_IN',
//     'DECLINED',
//     'INTERESTED',
//     'INVITED',
//   ]),
//   onRSVPLoggedOut: PropTypes.func,
//   onRSVPSuccess: PropTypes.func,
// };

// RSVP.defaultProps = {
//   user: null,
//   userRSVP: null,
//   userStatus: null,
//   onRSVPLoggedOut: () => {},
//   onRSVPSuccess: () => {},
// };

// export default RSVP;
