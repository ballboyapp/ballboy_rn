import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
// import get from 'lodash/get';
import styled from 'styled-components/native';
import themeImages from '../../../Themes/Images';
import { getImageUrl } from '../../../utils';
import publicUserFragment from '../../../GraphQL/Users/Fragments/publicUser';
import Text from '../Text';
import { userToInitials, getSize } from './utils';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const setSize = ({ size }) => getSize(size);
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Circle = styled.View`
  width: ${setSize}px;
  height: ${setSize}px;
  border-radius: ${setSize}px;
  background-color: ${({ theme, bgColor }) => (theme.colors[bgColor] || theme.colors.primaryGreen)};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
//------------------------------------------------------------------------------
const StyledImage = styled.Image`
  width: ${setSize}px;
  height: ${setSize}px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class Avatar extends React.PureComponent {
  render() {
    const { user, text, size } = this.props;

    // const avatar = user ? get(user, 'profile.avatar', '') : '';
    const avatar = (
      user
      && user.profile
      && user.profile.avatar
      && user.profile.avatar.length > 0
    ) ? user.profile.avatar : '';

    // const hasName = user ? get(user, 'profile.username', '').trim().length > 0 : false;
    const hasName = (
      user
      && user.profile
      && user.profile.username
      && user.profile.username.trim().length > 0
    ) || false;

    // console.log('avatar', avatar);
    // console.log('size', size);
    // console.log('converted', getImageUrl({ image: avatar, height: size, width: size }));

    if (avatar.length > 0) {
      const px = getSize(size);

      return (
        <Circle size={size}>
          <StyledImage
            source={{ uri: getImageUrl({ image: avatar, height: px, width: px }) }}
            size={size}
          />
        </Circle>
      );
    }

    if (hasName) {
      return (
        <Circle size={size}>
          <Text
            size={size === 'S' ? 'SM' : 'L'}
            color="white"
            center
          >
            {userToInitials(user)}
          </Text>
        </Circle>
      );
    }

    if (text && text.trim().length > 0) {
      return (
        <Circle size={size}>
          <Text
            size={size === 'S' ? 'SM' : 'L'}
            color="white"
            center
          >
            {text}
          </Text>
        </Circle>
      );
    }

    // If no user and no text, display default avatar
    return (
      <Circle bgColor="transparent" size={size}>
        <StyledImage
          source={themeImages.spotOpenCircle}
          size={size}
        />
      </Circle>
    );
  }
}

Avatar.size = getSize;

Avatar.propTypes = {
  user: propType(publicUserFragment),
  text: PropTypes.string,
  size: PropTypes.oneOf(['S', 'L']).isRequired,
};

Avatar.defaultProps = {
  user: null,
  text: '',
};

export default Avatar;
