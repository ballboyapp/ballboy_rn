import React from 'react';
import PropTypes from 'prop-types';
import { Image, ScrollView } from 'react-native';
import get from 'lodash/get';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../../../constants';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ImageSwiper = ({ images }) => {
  const src = get(images, '0', '');

  return (
    <Image
      key={src}
      style={{ flex: 1 }}
      source={{ uri: src }}
      width={WINDOW_WIDTH}
      height={WINDOW_HEIGHT}
    />
  );
  // <ScrollView
  //   horizontal
  //   pagingEnabled
  //   showsHorizontalScrollIndicator={false}
  // >
  //   {images.map((src) => (
  //     <Image
  //       key={src}
  //       style={{ flex: 1 }}
  //       source={{ uri: src }}
  //       width={WINDOW_WIDTH}
  //       height={WINDOW_HEIGHT}
  //     />
  //   ))}
  // </ScrollView>
};

ImageSwiper.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};

ImageSwiper.defaultProps = {
  images: [],
};

export default ImageSwiper;
