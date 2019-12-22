import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { WINDOW_WIDTH } from '../../../constants';
import ImageSwiper from '../../Common/ImageSwiper';
import { getSpotImages } from '../../../utils';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const HEIGHT = 200;

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  height: ${HEIGHT}px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotImages = ({ images }) => {
  const imgs = getSpotImages({ images, height: HEIGHT, width: WINDOW_WIDTH });

  return (
    <Container>
      <ImageSwiper images={imgs} />
    </Container>
  );
};

SpotImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};

SpotImages.defaultProps = {
  images: [],
};

export default SpotImages;
