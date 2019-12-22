export const getPalette = (variant) => {
  switch (variant) {
    case 'default':
      return {
        fontColor: 'black', // 'white',
        bgColor: 'orange', // 'actionYellow',
        borderColor: 'orange', // 'actionYellow',
      };
    case 'primary':
      return {
        fontColor: 'white',
        bgColor: 'darkorchid',
        borderColor: 'darkorchid',
      };
    case 'secondary':
      return {
        fontColor: 'white',
        bgColor: 'gray',
        borderColor: 'gray',
      };
    case 'warning':
      return {
        fontColor: 'white',
        bgColor: 'negative',
        borderColor: 'negative',
      };
    case 'info':
      return {
        fontColor: 'white',
        bgColor: 'info',
        borderColor: 'info',
      };
    case 'ghost':
      return {
        fontColor: 'black',
        bgColor: 'white',
        borderColor: 'shade',
        withShadow: true,
      };
    case 'facebook':
      return {
        fontColor: 'white',
        bgColor: 'facebook',
        borderColor: 'facebook',
      };
    case 'google':
      return {
        fontColor: 'black',
        bgColor: 'white',
        borderColor: 'silver',
      };
    case 'transparent':
      return {
        fontColor: 'black',
        bgColor: 'transparent',
        borderColor: 'black',
      };
    default:
      throw new Error('Unknown variant');
  }
};

export const getPixelsFromSize = (size) => {
  switch (size) {
    case 'S':
      return {
        height: '32px',
        minWidth: '80px',
        borderRadius: '4px',
      };
    case 'M':
      return {
        height: '48px',
        minWidth: '100px',
        borderRadius: '8px',
      };
    default:
      throw new Error('Unknown size');
  }
};
