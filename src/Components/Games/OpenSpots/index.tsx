import React from 'react';
import { propType } from 'graphql-anywhere';
import activityDetailsFragment from '../../../GraphQL/Activities/Fragments/activityDetails';
import Avatar from '../../Common/Avatar';
import CappedList from '../../Common/CappedList';
import Row from '../../Common/Row';
import Spacer from '../../Common/Spacer';
import getPixelsFromSize from '../../Common/Spacer/utils';
// import { getAttendees } from '../utils';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const SPACER_SIZE = 'M';
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class OpenSpots extends React.PureComponent {
  state = {
    width: 0,
  }

  handleLayout = ({ nativeEvent }) => {
    this.setState({ width: nativeEvent.layout.width });
  }

  render() {
    const { activity } = this.props;
    const { width } = this.state;

    const { capacity, attendeesIds } = activity;

    if (!capacity) {
      return null;
    }

    const nOpenSpots = Math.max(0, capacity - attendeesIds.length);

    // Determine how many avatars fit on the parent container
    const AVATAR_SIZE = Avatar.size('S');
    let maxAvatars = 0;

    if (AVATAR_SIZE <= width) {
      maxAvatars = 1;
    }

    const diff = width - AVATAR_SIZE; // remove first avatar. Then we can only add space + avatar
    const space = getPixelsFromSize(SPACER_SIZE);
    if (diff > 0) {
      maxAvatars = 1 + parseInt(diff / (space + AVATAR_SIZE), 10);
    }

    return (
      <Row onLayout={this.handleLayout}>
        <CappedList
          max={Math.max(0, maxAvatars - 1)}
          data={[...Array(nOpenSpots)]}
          component={(_, i) => <Avatar key={i} size="S" />}
          capComponent={({ data }) => <Avatar key="cap" size="S" text={`+${data.length}`} />}
          ItemSeparatorComponent={() => <Spacer row size={SPACER_SIZE} />}
        />
      </Row>
    );
  }
}

OpenSpots.propTypes = {
  activity: propType(activityDetailsFragment).isRequired,
};

export default OpenSpots;
