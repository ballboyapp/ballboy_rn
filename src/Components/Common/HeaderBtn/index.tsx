import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Row from '../Row';
import Icon from '../Icon';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const StyledRow = styled(Row)`
  width: 60px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const HeaderBtn = ({
  iconSet, iconName, size, color, onPress,
}) => (
  <TouchableOpacity onPress={onPress}>
    <StyledRow
      justifyContent="center"
      alignItems="center"
    >
      <Icon
        iconSet={iconSet}
        iconName={iconName}
        size={size}
        color={color}
      />
    </StyledRow>
  </TouchableOpacity>
);

HeaderBtn.propTypes = {
  iconSet: PropTypes.string,
  iconName: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  onPress: PropTypes.func,
};

HeaderBtn.defaultProps = {
  iconSet: 'MaterialIcons',
  size: 32,
  color: 'black',
  onPress: () => {},
};

export default HeaderBtn;
