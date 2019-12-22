import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import get from 'lodash/get';
import Fonts from '../../../Themes/Fonts';
import publicUserFragment from '../../../GraphQL/Users/Fragments/publicUser';
import Text from '../../Common/Text';
import Avatar from '../../Common/Avatar';
import Spacer from '../../Common/Spacer';
import Row from '../../Common/Row';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Organizer = ({ organizer, textSize }) => (
  <Row alignItems="center">
    <Avatar size="S" user={organizer} />
    <Spacer row size="M" />
    <Text size={textSize}>
      {get(organizer, 'profile.username', '?')}
    </Text>
  </Row>
);

Organizer.propTypes = {
  organizer: propType(publicUserFragment).isRequired,
  textSize: PropTypes.oneOf(Object.keys(Fonts)),
};

Organizer.defaultProps = {
  textSize: 'SM',
};

export default Organizer;
