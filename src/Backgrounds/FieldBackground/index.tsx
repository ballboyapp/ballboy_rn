import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
// import { Svg } from 'expo';
import styled from 'styled-components/native';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../../constants';
import Colors from '../../Themes/Colors';
import Logo from '../../Components/Common/Logo';
import Spacer from '../../Components/Common/Spacer';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
// const { Path } = Svg;
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
// const BgContainer = styled.View`
//   background-color: ${({ theme }) => theme.colors.primaryGreen}
//   position: absolute;
//   left: 0;
//   top: 0;
// `;
//------------------------------------------------------------------------------
const FlexGrow = styled.View`
  flex-grow: 1;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const FieldBackground = ({ children }) => (
  <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: Colors.white }}>
    {/* <BgContainer>
      <Svg width={fullWidth} height={fullHeight}>
        <Path
          d={`M${0.2 * fullWidth} 0 h ${0.08 * fullWidth} L ${-0.1 *
          fullWidth} ${fullHeight} h ${-0.12 * fullWidth} Z`}
          fill="white"
        />
        <Path
          d={`M0 0 h ${fullWidth} v ${0.5 * fullHeight} L 0 ${2 / 3 * fullHeight} Z`}
          fill={Colors.secondaryDarkBlueGreen}
          opacity=".84"
        />
      </Svg>
    </BgContainer> */}
    <Spacer size="XXXL" />
    <Spacer size="XXXL" />
    <Spacer size="XXXL" />
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
      <Logo scale={1} />
    </View>
    {/* <Spacer size="XXXL" /> */}
    <FlexGrow>
      {children}
    </FlexGrow>
  </ScrollView>
);

FieldBackground.propTypes = {
  children: PropTypes.node,
};

FieldBackground.defaultProps = {
  children: null,
};

export default FieldBackground;


/* <Path
d={`M${0.2 * fullWidth} 0 h ${0.08 * fullWidth} L ${0.16 *
fullWidth} ${fullHeight} h ${-0.12 * fullWidth} Z`}
fill="white"
/> */
