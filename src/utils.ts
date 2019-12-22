// import Config from 'react-native-config';
import isString from 'lodash/isString';
import castArray from 'lodash/castArray';

/* eslint-disable no-param-reassign */
// TODO: try using react-hooks instead
export const addModelState = (reactComponentInstance, modalName, isOpen = false) => {
  reactComponentInstance.modals = reactComponentInstance.modals || {};
  reactComponentInstance.state.modals = reactComponentInstance.state.modals || {};
  const setState = (state) => {
    reactComponentInstance.setState({
      modals: { ...reactComponentInstance.state.modals, [modalName]: state },
    });
  };
  reactComponentInstance.modals[modalName] = {
    show: () => setState(true),
    hide: () => setState(false),
    get isVisible() {
      return reactComponentInstance.state.modals[modalName];
    },
  };
  reactComponentInstance.state.modals[modalName] = isOpen;
};

export function makeNumGenerator() {
  let i = -1;
  return () => {
    i += 1;
    return i;
  };
}

export const getImageUrl = ({ image, height, width }) => (
  image.replace('/upload', `/upload${width ? `/w_${parseInt(width, 10)}` : ''}`)
  // .concat('?auto=compress')
  // .concat(height ? `&h=${height}` : '')
  // .concat(width ? `&w=${width}` : '')
);

// TODO: read this from env var
const DEFAULT_SPOT_IMG = 'https://raw.githubusercontent.com/SportySpots/cruijff/master/App/Images/spot-placeholder.png';

export const getSpotImages = ({ images, height, width }) => {
  if (!height || !width) {
    throw new Error('Height | width is not defined');
  }

  return images && images.length > 0
    ? images.map((image) => getImageUrl({ image, height, width }))
    : getImageUrl({ image: DEFAULT_SPOT_IMG, height, width });
};

// export const getSpotImages = ({ images, height, width }) => {
//   if (!height || !width) {
//     throw new Error('Height | width is not defined');
//   }

//   return images && images.length > 0
//     ? images.map(({ image }) => getImageUrl({ image, height, width }))
//     : [DEFAULT_SPOT_IMG];
// };

const routeToString = (route, depth = 0) => {
  let str = route.routeName || 'ROOT';
  if (route.routes) {
    str += `\n${  route.routes.map((subRoute, idx) => {
      const isActive = (idx === route.index);
      return ' '.repeat(3 * depth) + (isActive ? ' * ' : '   ') + routeToString(subRoute, depth + 1);
    }).join('\n')}`;
  }
  return str;
};

// export const logNavigationState = (route = globalRefs.rootNavigator.state.nav) => {
//   console.log(routeToString(route));
// };


/**
 * errors = {
 *  email: ['This field must be unique.'],
 *  password1: ['This password is too short. It must contain at least 8 characters.']
 * }
 * OR
 * errors = ['Invalid Spot. Spot being assigned doesnt have the already associated sport']
 * OR
 * errors = 'Email already in use'
*/
export const curateErrors = (curateFieldName, curateErrorMsg) => (errors) => {
  console.log('curateErrors.errors', errors);
  let errs = {};

  // TODO: pass errors to curateFieldName
  if (isString(errors)) {
    errs = { [curateFieldName(null)]: [errors.replace('GraphQL error: ', '')] }; // curatedErrors
  } else if (Array.isArray(errors)) {
    errs = { [curateFieldName(null)]: errors }; // curatedErrors
  } else {
    errs = errors;
  }

  // In case errors is an object
  const keys = Object.keys(errs);
  const curatedErrors = {};

  keys.forEach((key) => {
    const arrayError = castArray(errs[key]);
    const curatedArray = arrayError.map((errorMsg) => (curateErrorMsg(errorMsg)));
    curatedErrors[curateFieldName(key)] = curatedArray;
  });

  return curatedErrors;
};

// export const decodeJWTToken = (token) => {
//   if (!token) {
//     return null;
//   }
//   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('ascii'));
// };
