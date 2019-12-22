import get from 'lodash/get';

export const userToInitials = (user) => {
  const username = get(user, 'profile.username', '').trim();

  if (!username.length > 0) {
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


const SMALL_AVATAR_SIZE = 40;
const LARGE_AVATAR_SIZE = 80;

export const getSize = (size) => {
  if (!size || !['S', 'L'].includes(size)) {
    throw new Error('Size is required');
  }
  return size === 'S' ? SMALL_AVATAR_SIZE : LARGE_AVATAR_SIZE;
};
