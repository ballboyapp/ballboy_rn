import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { useQuery } from 'react-apollo';
import get from 'lodash/get';
import notificationsListQuery from '../../../GraphQL/NotificationsList/Queries/notificationsList';
import Row from '../../../Components/Common/Row';
import Spacer from '../../../Components/Common/Spacer';
import NotificationsList from '../../../Components/Notifications/NotificationsList';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const RowContainer = styled(Row)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const NotificationsListScreen = ({ navigation }) => {
  const params = {
    // fetchPolicy: 'cache-and-network',
    variables: { offset: 0, limit: 10 },
  };

  const queryRes = useQuery(notificationsListQuery, params);
  console.log({ queryRes });

  const handleNotificationPress = (notification) => {
    // navigation.navigate('TODO', { uuid: game.uuid });
  };

  const {
    loading, error, data, refetch,
  } = queryRes;

  return (
    <RowContainer>
      <Spacer row size="L" />
      <NotificationsList
        notifications={get(data, 'notificationsList.items', [])}
        onCardPress={handleNotificationPress}
        // FlatList props
        onRefresh={refetch}
        refreshing={loading}
      />
    </RowContainer>
  );
};

NotificationsListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default NotificationsListScreen;


// import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import Colors from '../../../Themes/Colors';
// import { QueryCatchErrors } from '../../../GraphQL/QueryCatchErrors';
// import GET_SPOTS from '../../../GraphQL/Spots/Queries/GET_SPOTS';
// import Row from '../../../Components/Common/Row';
// import Spacer from '../../../Components/Common/Spacer';
// import NotificationsList from '../../../Components/Notifications/NotificationsList';

// //------------------------------------------------------------------------------
// // STYLE:
// //------------------------------------------------------------------------------
// const RowContainer = styled(Row)`
//   flex: 1;
//   background-color: ${Colors.white};
// `;
// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// class NotificationsListScreen extends React.Component {
//   handleNotificationPress = (notification) => {
//     const { navigation } = this.props;
//     // navigation.navigate('TODO', { uuid: game.uuid });
//   }

//   render() {
//     const { user } = this.props;

//     return (
//       <QueryCatchErrors
//         query={GET_SPOTS}
//         // variables={variables}
//         fetchPolicy="cache-and-network"
//       >
//         {({
//           loading,
//           data,
//           refetch,
//           fetchMore,
//         }) => {
//           const loadMore = () => {
//             fetchMore({
//               variables: {
//                 offset: (data && data.spots && data.spots.length) || 0,
//               },
//               updateQuery: (prev, { fetchMoreResult }) => {
//                 if (!fetchMoreResult) return prev;
//                 return { ...prev, spots: [...prev.spots, ...fetchMoreResult.spots] };
//               },
//             });
//           };

//           return (
//             <RowContainer testID="NotificationsListScreen">
//               <Spacer row size="L" />
//               <NotificationsList
//                 notifications={(data && data.spots && data.spots.map(({ images }) => ({ image: images[0] }))) || []}
//                 onCardPress={this.handleNotificationPress}
//                 // FlatList props
//                 onRefresh={refetch}
//                 refreshing={loading}
//                 onEndReached={loadMore}
//                 onEndReachedThreshold={0.1}
//               />
//             </RowContainer>
//           );
//         }}
//       </QueryCatchErrors>
//     );
//   }
// }

// NotificationsListScreen.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func.isRequired,
//   }).isRequired,
// };

// export default NotificationsListScreen;
