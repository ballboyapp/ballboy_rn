import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { View, TouchableOpacity } from 'react-native';
import get from 'lodash/get';
import moment from 'moment';
import I18n from '../../../I18n';
import activityDetailsFragment from '../../../GraphQL/Activities/Fragments/activityDetails';
import Text from '../../Common/Text';
import Row from '../../Common/Row';
import Spacer from '../../Common/Spacer';
import Icon from '../../Common/Icon';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Label = ({ children, ...rest }) => (
  <Text
    size="SM"
    color="black"
    style={{ flex: 1 }}
    {...rest}
  >
    {children}
  </Text>
);

Label.propTypes = {
  ...Text.propTypes,
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const GameProperties = ({ activity, onSpotPress }) => {
  const {
    title,
    dateTime,
    duration,
    sport,
    spot,
  } = activity;

  const endTime = moment(dateTime).clone().add(duration, 'minutes');

  const iconProps = { size: 22, color: 'shade' };

  return (
    <View>
      <Text size="ML" color="black">
        {title || '?'}
      </Text>
      <Spacer size="L" />
      <Row>
        <Icon
          iconSet="MaterialIcons"
          iconName="event"
          {...iconProps}
        />
        <Spacer row size="L" />
        <Label>
          {dateTime ? moment.utc(dateTime).format('dddd, D MMMM').toTitleCase() : '?'}
        </Label>
      </Row>
      <Spacer size="M" />
      <Row>
        <Icon
          iconSet="MaterialIcons"
          iconName="watch-later"
          {...iconProps}
        />
        <Spacer row size="L" />
        <Label>
          {`${dateTime ? moment.utc(dateTime).local().format('HH:mm') : '?'}${endTime ? ` - ${moment.utc(endTime).local().format('HH:mm')}` : ''}`}
        </Label>
      </Row>
      <Spacer size="M" />
      <Row>
        <Icon
          iconSet="MaterialIcons"
          iconName="label"
          {...iconProps}
        />
        <Spacer row size="L" />
        <Label>
          {I18n.t(sport)}
        </Label>
      </Row>
      <Spacer size="M" />
      <TouchableOpacity onPress={() => { onSpotPress(spot); }}>
        <Row>
          <Icon
            iconSet="MaterialIcons"
            iconName="place"
            {...iconProps}
          />
          <Spacer row size="L" />
          <Label>{get(spot, 'spotname', '?')}</Label>
        </Row>
      </TouchableOpacity>
    </View>
  );
};

GameProperties.propTypes = {
  activity: propType(activityDetailsFragment).isRequired,
  onSpotPress: PropTypes.func,
};

GameProperties.defaultProps = {
  onSpotPress: () => {},
};

export default GameProperties;


// import React from 'react';
// import PropTypes from 'prop-types';
// import { propType } from 'graphql-anywhere';
// import { View, TouchableOpacity } from 'react-native';
// import moment from 'moment';
// import I18n from '../../../I18n';
// import Text from '../../Common/Text';
// import Row from '../../Common/Row';
// import Spacer from '../../Common/Spacer';
// import Icon from '../../Common/Icon';
// import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';

// //------------------------------------------------------------------------------
// // STYLE:
// //------------------------------------------------------------------------------
// const Label = ({ children, ...rest }) => (
//   <Text
//     size="SM"
//     color="black"
//     style={{ flex: 1 }}
//     {...rest}
//   >
//     {children}
//   </Text>
// );

// Label.propTypes = {
//   ...Text.propTypes,
// };
// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// const GameProperties = ({ game, onSpotPress }) => {
//   const {
//     name,
//     start_time: startTime,
//     end_time: endTime,
//     sport,
//     spot,
//   } = game;

//   const iconProps = { size: 22, color: 'shade' };

//   return (
//     <View>
//       <Text size="ML" color="black">
//         {name || '?'}
//       </Text>
//       <Spacer size="L" />
//       <Row>
//         <Icon
//           iconSet="MaterialIcons"
//           iconName="event"
//           {...iconProps}
//         />
//         <Spacer row size="L" />
//         <Label>
//           {startTime ? moment.utc(startTime).format('dddd, D MMMM').toTitleCase() : '?'}
//         </Label>
//       </Row>
//       <Spacer size="M" />
//       <Row>
//         <Icon
//           iconSet="MaterialIcons"
//           iconName="watch-later"
//           {...iconProps}
//         />
//         <Spacer row size="L" />
//         <Label>
//           {`${startTime ? moment.utc(startTime).local().format('HH:mm') : '?'}${endTime ? ` - ${moment.utc(endTime).local().format('HH:mm')}` : ''}`}
//         </Label>
//       </Row>
//       <Spacer size="M" />
//       <Row>
//         <Icon
//           iconSet="MaterialIcons"
//           iconName="label"
//           {...iconProps}
//         />
//         <Spacer row size="L" />
//         <Label>
//           {(sport && sport.category && I18n.t(sport.category)) || '?'}
//         </Label>
//       </Row>
//       <Spacer size="M" />
//       <TouchableOpacity
//         onPress={() => {
//           if (!spot || !spot.uuid) { return; }
//           onSpotPress({ spotUUID: spot.uuid });
//         }}
//       >
//         <Row>
//           <Icon
//             iconSet="MaterialIcons"
//             iconName="place"
//             {...iconProps}
//           />
//           <Spacer row size="L" />
//           <Label>{(spot && spot.name) || '?'}</Label>
//         </Row>
//       </TouchableOpacity>
//     </View>
//   );
// };

// GameProperties.propTypes = {
//   game: propType(gameDetailsFragment).isRequired,
//   onSpotPress: PropTypes.func,
// };

// GameProperties.defaultProps = {
//   onSpotPress: () => {},
// };

// export default GameProperties;
