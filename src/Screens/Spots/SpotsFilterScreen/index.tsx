import React from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { SPORTS } from '../../../constants';
import { withSpotFilters, spotFiltersPropTypes } from '../../../Context/SpotFilters';
import FormProps from '../../../RenderProps/form-props';
import SpotsFilterActionCall from '../../../Components/Spots/SpotsFilterActionCall';
import SpotsFilterForm from '../../../Components/Spots/SpotsFilterForm';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotsFilterScreen = ({
  navigation,
  maxDistance,
  allSports,
  selectedSports,
}) => (
  <FormProps>
    {({
      disabled,
      handleBefore,
      handleClientCancel,
      handleSuccess,
    }) => (
      <SpotsFilterActionCall
        onSuccess={() => {
          // Extend formProps.handleSuccess' default functionality
          handleSuccess(() => {
            // Go back to spots screen
            if (Platform.OS === 'web') {
              navigation.navigate('SpotsListScreen');
            } else {
              navigation.goBack(null);
            }
          });
        }}
      >
        {({ filterSpots }) => (
          <SpotsFilterForm
            sports={Object.values(SPORTS)} // TODO: pass user sports
            maxDistance={maxDistance}
            allSports={allSports}
            selectedSports={selectedSports}
            disabled={disabled}
            onBeforeHook={handleBefore}
            onClientCancelHook={handleClientCancel}
            onSuccessHook={filterSpots}
          />
        )}
      </SpotsFilterActionCall>
    )}
  </FormProps>
);

SpotsFilterScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  maxDistance: spotFiltersPropTypes.maxDistance.isRequired,
  allSports: spotFiltersPropTypes.allSports.isRequired,
  selectedSports: spotFiltersPropTypes.selectedSports.isRequired,
};

export default withSpotFilters(SpotsFilterScreen);


// import React from 'react';
// import PropTypes from 'prop-types';
// import { Query } from 'react-apollo';
// import { withSpotFilters, spotFiltersPropTypes } from '../../../Context/SpotFilters';
// import FormProps from '../../../RenderProps/form-props';
// import GET_SPORTS from '../../../GraphQL/Sports/Queries/GET_SPORTS';
// import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';
// import SpotsFilterActionCall from '../../../Components/Spots/SpotsFilterActionCall';
// import SpotsFilterForm from '../../../Components/Spots/SpotsFilterForm';

// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// const SpotsFilterScreen = ({
//   navigation,
//   maxDistance,
//   allSports,
//   selectedSportIds,
// }) => (
//   <FormProps>
//     {({
//       disabled,
//       handleBefore,
//       handleClientCancel,
//       handleSuccess,
//     }) => (
//       <Query query={GET_SPORTS}>
//         {({ loading, error, data }) => {
//           if (loading) {
//             return <CenteredActivityIndicator />;
//           }
//           if (error || !data || !data.sports) {
//             return null;
//           }

//           return (
//             <SpotsFilterActionCall
//               onFilterSuccess={() => {
//                 // Extend formProps.handleSuccess' default functionality
//                 handleSuccess(() => {
//                   // Go back to spots screen
//                   navigation.goBack(null);
//                 });
//               }}
//             >
//               {({ filterSpots }) => (
//                 <SpotsFilterForm
//                   sports={data.sports}
//                   maxDistance={maxDistance}
//                   allSports={allSports}
//                   selectedSportIds={selectedSportIds}
//                   disabled={disabled}
//                   onBeforeHook={handleBefore}
//                   onClientCancelHook={handleClientCancel}
//                   onSuccessHook={filterSpots}
//                 />
//               )}
//             </SpotsFilterActionCall>
//           );
//         }}
//       </Query>
//     )}
//   </FormProps>
// );

// SpotsFilterScreen.propTypes = {
//   navigation: PropTypes.shape({
//     goBack: PropTypes.func.isRequired,
//   }).isRequired,
//   ...spotFiltersPropTypes,
// };

// export default withSpotFilters(SpotsFilterScreen);
