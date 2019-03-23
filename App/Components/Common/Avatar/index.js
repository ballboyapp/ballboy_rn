import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import themeImages from '../../../Themes/Images';
import Text from '../Text';
import { userToInitials, convertS3ToImgix, getSize } from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Circle = styled.View`
  width: ${({ size }) => (getSize(size))};
  height: ${({ size }) => (getSize(size))};
  border-radius: ${({ size }) => (getSize(size))};
  background-color: ${({ bgColor }) => (bgColor || Colors.primaryGreen)};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
//------------------------------------------------------------------------------
const StyledImage = styled.Image`
  width: ${({ size }) => (getSize(size))};
  height: ${({ size }) => (getSize(size))};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class Avatar extends React.PureComponent {
  render() {
    const { user, text, size } = this.props;

    const avatar = (
      user
      && user.profile
      && user.profile.avatar
      && user.profile.avatar.length > 0
    ) ? user.profile.avatar : '';

    // console.log('avatar', avatar);
    // console.log('converted', convertS3ToImgix({ image: avatar, height: size, width: size }));

    if (avatar) {
      return (
        <Circle size={size}>
          <StyledImage
            source={{ uri: convertS3ToImgix({ image: avatar, height: size, width: size }) }}
            size={size}
          />
        </Circle>
      );
    }

    const hasName = (
      user
      && user.name
      && user.name.trim().length > 0
    ) || false;

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
      <Circle bgColor={Colors.transparent} size={size}>
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
  user: PropTypes.shape({
    name: PropTypes.string,
    profile: PropTypes.shape({
      avatar: PropTypes.string,
    }),
  }),
  text: PropTypes.string,
  size: PropTypes.oneOf(['S', 'L']).isRequired,
};

Avatar.defaultProps = {
  user: null,
  text: '',
};

export default Avatar;
