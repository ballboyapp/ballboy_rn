import PropTypes from 'prop-types';

const cityPropTypes = PropTypes.shape({
  city: PropTypes.string,
  country: PropTypes.string,
  formattedAddress: PropTypes.string,
  coordinates: PropTypes.arrayOf(PropTypes.number),
});

export default cityPropTypes;
