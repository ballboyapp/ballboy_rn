import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import userNameAvatarFragment from '../../../GraphQL/Users/Fragments/userNameAvatar';
import Avatar from '../../Common/Avatar';
import CappedList from '../../Common/CappedList';
import Row from '../../Common/Row';
import Spacer from '../../Common/Spacer';
import getPixelsFromSize from '../../Common/Spacer/utils';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const SPACER_SIZE = 'M';
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class Attendees extends React.PureComponent {
  state = {
    width: 0,
  }

  handleLayout = ({ nativeEvent }) => {
    this.setState({ width: nativeEvent.layout.width });
  }

  render() {
    const { attendees } = this.props;
    const { width } = this.state;

    if (attendees.length === 0) {
      return null;
    }

    // Determine how many avatars fit on the parent container
    let maxAvatars = 0;

    if (Avatar.size() <= width) {
      maxAvatars = 1;
    }

    const diff = width - Avatar.size(); // remove first avatar. Then we can only add space + avatar
    const space = getPixelsFromSize(SPACER_SIZE);
    if (diff > 0) {
      maxAvatars = 1 + parseInt(diff / (space + Avatar.size()), 10);
    }

    return (
      <Row onLayout={this.handleLayout}>
        <CappedList
          max={maxAvatars}
          data={attendees}
          keyExtractor={({ user }) => (user.uuid)}
          component={({ user }) => <Avatar user={user} />}
          capComponent={({ data }) => <Avatar key="cap" text={`+${data.length}`} />}
          ItemSeparatorComponent={() => <Spacer row size={SPACER_SIZE} />}
        />
      </Row>
    );
  }
}

Attendees.propTypes = {
  attendees: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.oneOf(['ATTENDING']),
      user: propType(userNameAvatarFragment),
    }),
  ),
};

Attendees.defaultProps = {
  attendees: [],
};

export default Attendees;
