import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const isSmallPhone = width <= 320;
const isDesktop = width >= 600;

export const FontFamilies = {
  regular: 'Rajdhani-Regular',
  semibold: 'Rajdhani-SemiBold',
  bold: 'Rajdhani-Bold',
};

const Fonts = {
  XL: {
    fontFamily: FontFamilies.semibold,
    fontSize: isSmallPhone ? 32 : (isDesktop ? 50 : 40),
  },
  L: {
    fontFamily: FontFamilies.semibold,
    fontSize: isSmallPhone ? 24 : (isDesktop ? 38 : 32),
  },
  ML: {
    fontFamily: FontFamilies.semibold,
    fontSize: isSmallPhone ? 18 : (isDesktop ? 26 : 24),
  },
  M: {
    fontFamily: FontFamilies.semibold,
    fontSize: isSmallPhone ? 16 : (isDesktop ? 22 : 18),
  },
  SM: {
    fontFamily: FontFamilies.regular,
    fontSize: isSmallPhone ? 14 : (isDesktop ? 20 : 16),
  },
  // TODO: rename to S
  SSM: {
    fontFamily: FontFamilies.regular,
    fontSize: isSmallPhone ? 12 : (isDesktop ? 16 : 14),
  },
  // TODO: rename to XS
  S: {
    fontFamily: FontFamilies.regular,
    fontSize: isSmallPhone ? 10 : (isDesktop ? 14 : 12),
  },
};

export default Fonts;
