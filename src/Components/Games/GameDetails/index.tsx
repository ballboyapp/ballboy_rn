import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { View } from 'react-native';
import get from 'lodash/get';
import styled from 'styled-components/native';
import I18n from '../../../I18n';
import { ACTIVITY_STATUSES } from '../../../constants';
import activityDetailsFragment from '../../../GraphQL/Activities/Fragments/activityDetails';
import SpotImages from '../../Spots/SpotImages';
import SpotMapWithLinkFallback from '../../Spots/SpotMapWithLinkFallback';
import Block from '../../Common/Block';
import Text from '../../Common/Text';
import AlertMsg from '../../Common/AlertMsg';
import ChatWithGroup from '../../Chat/ChatWithGroup';
import GameProperties from '../GameProperties';
import Organizer from '../Organizer';
import DescriptionReadMore from '../DescriptionReadMore';
import ClickableAttendees from '../ClickableAttendees';
import ShareGameButtons from '../ShareGameButtons';
import getMsg from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
`;
//------------------------------------------------------------------------------
const Label = (props) => (
  <Text
    size="M"
    color="black"
    style={{ marginBottom: 16 }}
    {...props}
  />
);
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const GameDetails = ({
  activity,
  onSpotPress,
  onChatPress,
  onAttendeesPress,
}) => {
  const {
    status,
    organizer,
    description,
    capacity = -1,
    spot,
    attendees,
    shareLink,
  } = activity;

  const hasCapacity = capacity > 0;
  const isCanceled = status === ACTIVITY_STATUSES.CANCELED;
  const isFinished = status === ACTIVITY_STATUSES.FINISHED;
  const isFull = capacity > 0 && capacity === attendees.length;

  const { msg, msgStatus } = getMsg({ isFinished, isCanceled, isFull });

  return (
    <View style={{ flex: 1 }}>
      <SpotImages images={get(spot, 'images', [])} />
      <Container>
        {msg != null && status != null && (
          <Block>
            <AlertMsg
              value={I18n.t(msg)}
              status={msgStatus}
            />
          </Block>
        )}
        <Block>
          <GameProperties
            activity={activity}
            onSpotPress={onSpotPress}
          />
        </Block>
        <Block>
          <Label>{I18n.t('gameDetails.organizer')}</Label>
          <Organizer
            organizer={organizer}
            description={description}
          />
        </Block>
        {attendees.length > 0 && (
          <Block>
            <Label>{`${I18n.t('gameDetails.attending')} (${attendees.length}${hasCapacity ? `/${capacity}` : ''})`}</Label>
            <ClickableAttendees
              attendees={attendees}
              onAttendeesPress={onAttendeesPress}
            />
          </Block>
        )}
        <Block>
          <ChatWithGroup onChatPress={onChatPress} />
        </Block>
        {!!description && description.length > 0 && (
          <Block>
            <Label>{I18n.t('gameDetails.description')}</Label>
            <DescriptionReadMore description={description} />
          </Block>
        )}
        <SpotMapWithLinkFallback spot={spot} />
        <Block key="share">
          <Label>{I18n.t('gameDetails.share')}</Label>
          <ShareGameButtons shareLink={shareLink} />
        </Block>
      </Container>
    </View>
  );
};

GameDetails.propTypes = {
  activity: propType(activityDetailsFragment).isRequired,
  onSpotPress: PropTypes.func,
  onChatPress: PropTypes.func,
  onAttendeesPress: PropTypes.func,
};

GameDetails.defaultProps = {
  onSpotPress: () => {},
  onChatPress: () => {},
  onAttendeesPress: () => {},
};

export default GameDetails;
