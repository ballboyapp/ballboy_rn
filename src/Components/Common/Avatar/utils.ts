import get from 'lodash/get';
import { object } from 'prop-types';

export const userToInitials = (user) => {
  const username = get(user, 'profile.username', '').trim();

  if (username.length <= 0) {
    return '?'; // unknown user
  }

  const splitName = username.split(' ');
  if (splitName.length > 1) {
    // Return first letters of first and last word
    return `${splitName[0].substr(0, 1)}${splitName[splitName.length - 1].substr(0, 1)}`;
  }

  return username.substr(0, 2);
};

// export const userToInitials = (user) => {
//   if (!user || !user.name) {
//     return '?'; // unknown user
//   }
//   const splitName = user.name.split(' ');
//   if (splitName.length > 1) {
//     // return first letters of first and last word
//     return `${splitName[0].substr(0, 1)}${splitName[splitName.length - 1].substr(0, 1)}`;
//   }
//   return user.name.substr(0, 2);
// };

export const AVATAR_SIZES = {
  S: 'S',
  M: 'M',
  L: 'L',
};

export const getSize = (size) => {
  if (size == null) {
    throw new Error('Size is required');
  }

  switch (size) {
    case AVATAR_SIZES.S:
      return 40;
    case AVATAR_SIZES.M:
      return 50;
    case AVATAR_SIZES.L:
      return 80;
    default:
      throw new Error(`Unknown avatar size ${size}`);
  }
};
