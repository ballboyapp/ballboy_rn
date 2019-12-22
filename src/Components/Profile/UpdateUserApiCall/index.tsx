import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import extend from 'lodash/extend';
import { withSpotFilters, spotFiltersPropTypes } from '../../../Context/SpotFilters';
import updateUserMutation from '../../../GraphQL/Users/Mutations/updateUser';
import privateUserQuery from '../../../GraphQL/Users/Queries/privateUser';
import activitiesQuery from '../../../GraphQL/Activities/Queries/activities';
import spotsQuery from '../../../GraphQL/Spots/Queries/spots';
import curateErrors from './utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Gets input fields from the ProfileEditForm and calls API to store
 * data into the DB.
 */
class UpdateUserApiCall extends React.PureComponent {
  handleUpdate = async (inputFields) => {
    console.log({ inputFields });
    const {
      maxDistance,
      allSports,
      selectedSports,
      updateUser,
      onError,
      onSuccess,
    } = this.props;
    const { name: username, city, avatar } = inputFields;

    const variables = {};

    if (username) {
      extend(variables, { username });
    }
    if (city) {
      const {
        name, country, formattedAddress, location,
      } = city;

      extend(variables, {
        city: name,
        country,
        formattedAddress,
        coordinates: location.coordinates,
      });
    }
    if (avatar) {
      extend(variables, { avatar });
    }

    console.log('HANDLE UPDATE', inputFields);
    try {
      const res = await updateUser({
        variables,
        refetchQueries: [
          {
            query: privateUserQuery,
          },
          {
            query: activitiesQuery,
            variables: {
              offset: 0,
              limit: 10,
            },
          },
          {
            query: spotsQuery,
            variables: {
              sports: allSports ? [] : selectedSports, // empty array will return all spots
              distance: maxDistance * 1000, // km to mt
              offset: 0,
              limit: 10,
            },
          },
        ],
      });
      console.log('UPDATE RESPONSE', res);
      onSuccess();
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
      updateUser: this.handleUpdate,
    };

    return children(api);
  }
}

UpdateUserApiCall.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  updateUser: PropTypes.func.isRequired,
  maxDistance: spotFiltersPropTypes.maxDistance.isRequired,
  allSports: spotFiltersPropTypes.allSports.isRequired,
  selectedSports: spotFiltersPropTypes.selectedSports.isRequired,
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

UpdateUserApiCall.defaultProps = {
  onError: () => {},
  onSuccess: () => {},
};


const enhance = compose(
  graphql(updateUserMutation, { name: 'updateUser' }),
  withSpotFilters,
);

export default enhance(UpdateUserApiCall);


// import React from 'react';
// import PropTypes from 'prop-types';
// import { AsyncStorage } from 'react-native';
// import SeedorfAPI from '../../../Services/SeedorfApi';
// import curateErrors from './utils';

// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// /**
//  * @summary Gets input fields from the ProfileEditForm and calls API to store
//  * data into the DB.
//  */
// class EditProfileApiCall extends React.PureComponent {
//   handleUpdate = async (inputFields) => {
//     const { onEditError, onEditSuccess } = this.props;
//     const {
//       userUUID,
//       userProfileUUID,
//       name,
//       avatar,
//       location,
//     } = inputFields;

//     // Make sure birthYear is numeric
//     /* if (inputFields.birthYear) {
//       doc.birthYear = parseInt(inputFields.birthYear, 10);
//     } */

//     try {
//       const res = await SeedorfAPI.updateUserName({ userUUID, name });
//       console.log('RES NAME', res);

//       // Pass event up to parent component in case of error
//       if (res && res.problem) {
//         const errors = curateErrors(res.data);
//         onEditError(errors);
//         return;
//       }
//     } catch (exc) {
//       onEditError(exc);
//       return;
//     }

//     if (avatar.substr(0, 4) === 'data') {
//       try {
//         const res = await SeedorfAPI.updateUserAvatar({ userUUID, userProfileUUID, avatar });
//         // console.log('RES AVATAR', res);

//         // Pass event up to parent component in case of error
//         if (res && res.problem) {
//           const errors = curateErrors(res.data);
//           onEditError(errors);
//           return;
//         }
//       } catch (exc) {
//         onEditError(exc);
//         return;
//       }
//     }

//     try {
//       // Set user location
//       await AsyncStorage.setItem('userLocation', JSON.stringify(location));
//     } catch (exc) {
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
//       updateProfile: this.handleUpdate,
//     };

//     return children(api);
//   }
// }

// EditProfileApiCall.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.func,
//     PropTypes.object,
//   ]).isRequired,
//   onEditError: PropTypes.func,
//   onEditSuccess: PropTypes.func,
// };

// EditProfileApiCall.defaultProps = {
//   onEditError: () => {},
//   onEditSuccess: () => {},
// };

// export default EditProfileApiCall;
