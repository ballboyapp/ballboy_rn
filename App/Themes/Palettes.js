import Colors from './Colors';

const getInputPalette = (theme) => {
  switch (theme) {
    case 'black':
      return {
        fontColor: Colors.black,
        baseColor: Colors.black,
        tintColor: Colors.primaryGreen,
        iconColor: Colors.black,
        lineWidth: 1,
      };
    case 'white':
      return {
        fontColor: Colors.white,
        baseColor: Colors.white,
        tintColor: Colors.white,
        iconColor: Colors.white,
        lineWidth: 1,
      };
    case 'transparent':
      return {
        fontColor: Colors.black,
        baseColor: Colors.black,
        tintColor: Colors.black,
        iconColor: Colors.black,
        lineWidth: 0,
      };
    case 'mix':
      return {
        fontColor: Colors.black,
        baseColor: Colors.white,
        tintColor: Colors.white,
        iconColor: Colors.white,
        lineWidth: 1,
      };
    default:
      throw new Error('Unknown status');
  }
};

export default getInputPalette;