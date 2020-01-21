import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { useQuery } from 'react-apollo';
import get from 'lodash/get';
import notificationsQuery from '../../../GraphQL/Notifications/Queries/notifications';
import Row from '../../../Components/Common/Row';
import Spacer from '../../../Components/Common/Spacer';
import NotificationsList from '../../../Components/Notifications/NotificationList';

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
  const [hasNewResults, setHasNewResults] = useState(true);

  const params = {
    fetchPolicy: 'cache-and-network',
    variables: { offset: 0, limit: 10 },
  };

  const queryRes = useQuery(notificationsQuery, params);
  console.log({ queryRes });

  const handleNotificationPress = (notification) => {
    // navigation.navigate('TODO', { uuid: game.uuid });
  };

  const {
    loading, error, data, refetch, fetchMore,
  } = queryRes;

  const loadMore = () => {
    fetchMore({
      variables: {
        offset: get(data, 'notifications.length', 0),
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || get(fetchMoreResult, 'notifications.length', 0) === 0) {
          setHasNewResults(false); // fix/hack for persistent loading indicator (loading never gets set to false when fetchMoreResult doesn't return new data)
          return prev;
        }
        return { ...prev, notifications: [...prev.notifications, ...fetchMoreResult.notifications] };
      },
    });
  };

  return (
    <RowContainer>
      <Spacer row size="L" />
      <NotificationsList
        notifications={get(data, 'notifications', [])}
        onCardPress={handleNotificationPress}
        // FlatList props
        onRefresh={refetch}
        refreshing={loading && hasNewResults}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
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
