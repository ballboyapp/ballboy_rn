import React from 'react';
import { propType } from 'graphql-anywhere';
import { View, Image } from 'react-native';
import moment from 'moment';
import get from 'lodash/get';
import styled from 'styled-components/native';
import { ACTIVITY_STATUSES } from '../../../constants';
import Fonts from '../../../Themes/Fonts';
import activityFragment from '../../../GraphQL/Activities/Fragments/activity';
import Colors from '../../../Themes/Colors';
// import I18n from '../../../I18n';
// import themeIcons from '../../../Themes/Icons';
import Text from '../../Common/Text';
import Divider from '../../Common/Divider';
// import DotSpacer from '../../Common/DotSpacer';
import Spacer from '../../Common/Spacer';
import Row from '../../Common/Row';
import Icon from '../../Common/Icon';
import Avatar from '../../Common/Avatar';
import Tag from '../../Common/Tag';
import getPixelsFromSize from '../../Common/Spacer/utils';
// import BackgroundImage from '../../Spots/BackgroundImage';
// import Organizer from '../Organizer';
import Attendees from '../Attendees';
import GameCanceledFlag from '../GameCanceledFlag';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const CARD_HEIGHT = 140 + Fonts.M.fontSize + Fonts.ML.fontSize + 3 * Fonts.SM.fontSize; // 222; // 182;
// const CARD_HEIGHT_CANCELED = 252;
const HEADER_HEIGHT = 48;
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Outer = styled.View`
  height: ${({ height }) => height}px;
  border-radius: 8px;
  shadow-offset: 0px 1px;
  shadow-color: ${({ theme }) => theme.colors.shade};
  shadow-opacity: 0.8;
  elevation: 2;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.silver};
`;
//------------------------------------------------------------------------------
const Top = styled(Row)`
  height: ${HEADER_HEIGHT}px;
  padding-horizontal: 16px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;
//------------------------------------------------------------------------------
const Bottom = styled.View`
  flex: 1;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;
//------------------------------------------------------------------------------
const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding: 16px;
`;
//------------------------------------------------------------------------------
const iconStyle = { backgroundColor: Colors.transparent };
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const GameListCard = ({ activity }) => {
  const {
    organizer,
    spot,
    sport,
    dateTime,
    title,
    status,
    attendees,
  } = activity;

  const isCanceled = status === ACTIVITY_STATUSES.CANCELED;
  const formattedStartTime = moment.utc(dateTime).local().format('dddd, D MMMM, HH:mm').toTitleCase();
  // const cardHeight = (isCanceled ? CARD_HEIGHT_CANCELED : CARD_HEIGHT) + Avatar.size('S') * (!!attendees && attendees.length > 0);
  const cardHeight = CARD_HEIGHT + (!!attendees && attendees.length > 0) * (Avatar.size('S') + 2 * getPixelsFromSize('M'));

  return (
    <Outer height={cardHeight}>
      <Top alignItems="center" midHeight>
        <Text size="M">
          {formattedStartTime}
        </Text>
      </Top>
      <Divider />
      <Bottom style={{ position: 'relative' }}>
        {isCanceled && (
          <GameCanceledFlag
            style={{
              position: 'absolute',
              right: 0,
              top: 50,
              zIndex: 2,
            }}
          />
        )}
        <Container>
          <Text size="ML" numberOfLines={1}>
            {title}
          </Text>
          <Spacer size="M" />
          <Tag status="success" value={sport.toTitleCase()} />
          <Spacer size="M" />
          <Row>
            <Icon
              iconSet="MaterialCommunityIcons"
              iconName="account"
              size={24}
              style={iconStyle}
            />
            <Spacer row size="M" />
            <Text size="SM">
              {get(organizer, 'profile.username', '?')}
            </Text>
          </Row>
          <Spacer size="M" />
          <Row>
            <Icon
              iconSet="MaterialCommunityIcons"
              iconName="map-marker"
              size={24}
              style={iconStyle}
            />
            <Spacer row size="M" />
            <Text size="SM">
              {spot.spotname}
            </Text>
          </Row>
          {attendees.length > 0 && (
            <View>
              <Spacer size="L" />
              <Attendees attendees={attendees} />
            </View>
          )}
        </Container>
      </Bottom>
    </Outer>
  );
};

GameListCard.propTypes = {
  activity: propType(activityFragment).isRequired,
};

export default GameListCard;


// import React from 'react';
// import { propType } from 'graphql-anywhere';
// import { View, Image } from 'react-native';
// import moment from 'moment';
// import get from 'lodash/get';
// import styled from 'styled-components/native';
// import { ACTIVITY_STATUSES } from '../../../constants';
// import activityFragment from '../../../GraphQL/Activities/Fragments/activity';
// import Colors from '../../../Themes/Colors';
// // import I18n from '../../../I18n';
// // import themeIcons from '../../../Themes/Icons';
// import Text from '../../Common/Text';
// // import DotSpacer from '../../Common/DotSpacer';
// import Spacer from '../../Common/Spacer';
// import Row from '../../Common/Row';
// import Icon from '../../Common/Icon';
// import Avatar from '../../Common/Avatar';
// import Tag from '../../Common/Tag';
// import getPixelsFromSize from '../../Common/Spacer/utils';
// // import BackgroundImage from '../../Spots/BackgroundImage';
// // import Organizer from '../Organizer';
// import Attendees from '../Attendees';
// import GameCanceledFlag from '../GameCanceledFlag';

// //------------------------------------------------------------------------------
// // CONSTANTS:
// //------------------------------------------------------------------------------
// const CARD_HEIGHT = 182;
// // const CARD_HEIGHT_CANCELED = 252;
// const HEADER_HEIGHT = 48;
// //------------------------------------------------------------------------------
// // STYLE:
// //------------------------------------------------------------------------------
// const Outer = styled.View`
//   height: ${({ height }) => height}px;
//   border-radius: 8px;
//   shadow-offset: 0px 1px;
//   shadow-color: ${({ theme }) => theme.colors.shade};
//   shadow-opacity: 0.8;
//   elevation: 2;
//   background-color: ${({ theme }) => theme.colors.white};
// `;
// //------------------------------------------------------------------------------
// const Top = styled(Row)`
//   height: ${HEADER_HEIGHT}px;
//   padding-horizontal: 16px;
//   border-top-left-radius: 8px;
//   border-top-right-radius: 8px;
// `;
// //------------------------------------------------------------------------------
// const Bottom = styled.View`
//   flex: 1;
//   border-bottom-left-radius: 8px;
//   border-bottom-right-radius: 8px;
// `;
// //------------------------------------------------------------------------------
// const Container = styled.View`
//   flex: 1;
//   justify-content: flex-end;
//   padding: 16px;
// `;
// //------------------------------------------------------------------------------
// const iconStyle = { backgroundColor: Colors.transparent };
// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// const GameListCard = ({ activity }) => {
//   const {
//     organizer,
//     spot,
//     sport,
//     dateTime,
//     title,
//     status,
//     attendees,
//   } = activity;

//   const isCanceled = status === ACTIVITY_STATUSES.CANCELED;
//   const formattedStartTime = moment.utc(dateTime).local().format('dddd, D MMMM, HH:mm').toTitleCase();
//   // const cardHeight = (isCanceled ? CARD_HEIGHT_CANCELED : CARD_HEIGHT) + Avatar.size('S') * (!!attendees && attendees.length > 0);
//   const cardHeight = CARD_HEIGHT + (!!attendees && attendees.length > 0) * (Avatar.size('S') + 2 * getPixelsFromSize('M'));

//   return (
//     <Outer height={cardHeight}>
//       <Top alignItems="center" midHeight>
//         <Row>
//           {/* <Image source={sport ? themeIcons[sport.toLowerCase()] : themeIcons.football} /> */}
//           <Tag status="success" value={sport.toTitleCase()} />
//           <Spacer row size="ML" />
//           <Tag status="error" value={formattedStartTime} />
//           {/* <Text size="M">
//             {formattedStartTime}
//           </Text> */}
//         </Row>
//         {/* <Text size="M">
//           {I18n.t(sport)}
//         </Text> */}
//         {/* <DotSpacer /> */}
//       </Top>
//       <Bottom style={{ position: 'relative' }}>
//         {/* <BackgroundImage
//           images={spot.images}
//           height={cardHeight - HEADER_HEIGHT}
//           width={CARD_WIDTH}
//         /> */}
//         {isCanceled && (
//           <GameCanceledFlag style={{ position: 'absolute', right: 0, top: 0 }} />
//         )}
//         <Container>
//           <Text size="ML" numberOfLines={1}>
//             {title}
//           </Text>
//           <Spacer size="M" />
//           <Row>
//             <Icon
//               iconSet="MaterialCommunityIcons"
//               iconName="account"
//               size={24}
//               style={iconStyle}
//             />
//             <Spacer row size="M" />
//             <Text size="SM">
//               {get(organizer, 'profile.username', '?')}
//             </Text>
//           </Row>
//           <Spacer size="M" />
//           <Row>
//             <Icon
//               iconSet="MaterialCommunityIcons"
//               iconName="map-marker"
//               size={24}
//               style={iconStyle}
//             />
//             <Spacer row size="M" />
//             <Text size="SM">
//               {spot.spotname}
//             </Text>
//           </Row>
//           {attendees.length > 0 && (
//             <View>
//               <Spacer size="L" />
//               <Attendees attendees={attendees} />
//             </View>
//           )}
//         </Container>
//       </Bottom>
//     </Outer>
//   );
// };

// GameListCard.propTypes = {
//   activity: propType(activityFragment).isRequired,
// };

// export default GameListCard;

// import React from 'react';
// import { propType } from 'graphql-anywhere';
// import { Dimensions, View } from 'react-native';
// import styled from 'styled-components/native';
// import moment from 'moment';
// import { ACTIVITY_STATUSES } from '../../../constants';
// import activityFragment from '../../../GraphQL/Activities/Fragments/activity';
// import Colors from '../../../Themes/Colors';
// import I18n from '../../../I18n';
// import Text from '../../Common/Text';
// import DotSpacer from '../../Common/DotSpacer';
// import Spacer from '../../Common/Spacer';
// import Row from '../../Common/Row';
// import Icon from '../../Common/Icon';
// import Avatar from '../../Common/Avatar';
// import BackgroundImage from '../../Spots/BackgroundImage';
// import Organizer from '../Organizer';
// import Attendees from '../Attendees';
// import GameCanceledFlag from '../GameCanceledFlag';

// //------------------------------------------------------------------------------
// // CONSTANTS:
// //------------------------------------------------------------------------------
// const CARD_HEIGHT = 192;
// const CARD_HEIGHT_CANCELED = 252;
// const CARD_WIDTH = Dimensions.get('window').width; // aprox, we are not considering the padding from the parent container
// const HEADER_HEIGHT = 58;
// //------------------------------------------------------------------------------
// // STYLE:
// //------------------------------------------------------------------------------
// const Outer = styled.View`
//   height: ${({ height }) => height}px;
//   border-radius: 8px;
//   shadow-offset: 0px 1px;
//   shadow-color: ${({ theme }) => theme.colors.shade};
//   shadow-opacity: 0.8;
//   elevation: 2;
// `;
// //------------------------------------------------------------------------------
// const Top = styled(Row)`
//   height: ${HEADER_HEIGHT}px;
//   padding-horizontal: 16px;
//   background-color: white;
//   border-top-left-radius: 8px;
//   border-top-right-radius: 8px;
// `;
// //------------------------------------------------------------------------------
// const Bottom = styled.View`
//   flex: 1;
//   border-bottom-left-radius: 8px;
//   border-bottom-right-radius: 8px;
// `;
// //------------------------------------------------------------------------------
// const Container = styled.View`
//   flex: 1;
//   justify-content: flex-end;
//   padding: 16px;
// `;
// //------------------------------------------------------------------------------
// const iconStyle = { backgroundColor: Colors.transparent };
// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// const GameListCard = ({ activity }) => {
//   const {
//     organizer,
//     spot,
//     sport,
//     dateTime,
//     title,
//     status,
//     // respondents,
//     attendees,
//   } = activity;

//   const isCanceled = status === ACTIVITY_STATUSES.CANCELED;
//   // const attendees = getAttendees(respondents);
//   const formattedStartTime = moment.utc(dateTime).local().format('dddd, D MMMM, HH:mm').toTitleCase();
//   const cardHeight = (isCanceled ? CARD_HEIGHT_CANCELED : CARD_HEIGHT) + Avatar.size('S') * (!!attendees && attendees.length > 0);

//   return (
//     <Outer height={cardHeight}>
//       <Top alignItems="center">
//         <Organizer organizer={organizer} textSize="M" />
//         <DotSpacer />
//         <Text size="M">
//           {I18n.t(sport)}
//         </Text>
//       </Top>
//       <Bottom>
//         <BackgroundImage
//           images={spot.images}
//           height={cardHeight - HEADER_HEIGHT}
//           width={CARD_WIDTH}
//         />
//         {isCanceled && (
//           <View>
//             <Spacer size="L" />
//             <GameCanceledFlag />
//           </View>
//         )}
//         <Container>
//           <Text size="ML" color="white" numberOfLines={2}>
//             {title}
//           </Text>
//           <Spacer size="M" />
//           <Row>
//             <Icon
//               iconSet="Ionicons"
//               iconName="ios-time"
//               color="white"
//               size={24}
//               style={iconStyle}
//             />
//             <Spacer row size="M" />
//             <Text size="SM" color="white">
//               {formattedStartTime}
//             </Text>
//             <Spacer row size="L" />
//             <Icon
//               iconSet="MaterialCommunityIcons"
//               iconName="map-marker"
//               color="white"
//               size={24}
//               style={iconStyle}
//             />
//             <Spacer row size="M" />
//             <Text size="SM" color="white">
//               {spot.spotname}
//             </Text>
//           </Row>
//           {attendees.length > 0 && (
//             <View>
//               <Spacer size="L" />
//               <Attendees attendees={attendees} />
//             </View>
//           )}
//         </Container>
//       </Bottom>
//     </Outer>
//   );
// };

// GameListCard.propTypes = {
//   activity: propType(activityFragment).isRequired,
// };

// export default GameListCard;
