import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Row from '../../Components/Common/Row';
import Spacer from '../../Components/Common/Spacer';
import Icon from '../../Components/Common/Icon';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const ORIENTATION_TYPES = {
  left: 'left',
  right: 'right',
};

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  height: 48px;
  justify-content: center;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const NavBtn = ({ onPress, orientation, ...iconProps }) => (
  <Container>
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Row alignItems="center">
        {orientation === ORIENTATION_TYPES.left && <Spacer row size="M" />}
        <Icon {...iconProps} />
        {orientation === ORIENTATION_TYPES.right && <Spacer row size="M" />}
      </Row>
    </TouchableOpacity>
  </Container>
);

NavBtn.propTypes = {
  orientation: PropTypes.oneOf(Object.values(ORIENTATION_TYPES)).isRequired,
  onPress: PropTypes.func,
  ...Icon.propTypes,
};

NavBtn.defaultProps = {
  onPress: () => {},
};

export default NavBtn;
