import React from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components/native';
import GoogleStaticMap from 'react-native-google-static-map';
import { WINDOW_WIDTH } from '../../../constants';
import ErrorsManager from '../../../managers/errors';
import spotDetailsFragment from '../../../GraphQL/Spots/Fragments/spotDetails';
import Block from '../../Common/Block';
import Row from '../../Common/Row';
// import Spacer from '../../Common/Spacer';
import RoundButton from '../../Common/RoundButton';
import { getSpotLocation, openGoogleMapsLocation /* openGoogleMapsDirections */ } from '../utils';
import getGoogleMapsApiKey from './utils';

// -----------------------------------------------------------------------------
// CONSTANTS:
// -----------------------------------------------------------------------------
const GOOGLE_MAPS_API_KEY = getGoogleMapsApiKey();

// -----------------------------------------------------------------------------
// STYLE:
// -----------------------------------------------------------------------------
const Relative = styled.View`
  position: relative;
  margin: 0;
  background-color: ${({ theme }) => theme.colors.lightSkyBlue}
`;
// -----------------------------------------------------------------------------
const Absolute = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
`;
// -----------------------------------------------------------------------------
// COMPONENT:
// -----------------------------------------------------------------------------
/**
 * @summary Renders a map centered on the spot's location. Two buttons are
 * displayed at the bottom of the map, the first one takes the user to google
 * maps and shows the spot's location; the second takes the user to google maps
 * and provides directions to the spot based on the user's current position.
 */
const SpotMap = ({ spot }) => {
  // Get sport location
  const latLng = getSpotLocation(spot);

  if (!latLng.latitude || !latLng.longitude) {
    return null;
  }

  // Test fallback
  // throw new Error(401, 'bla');

  return (
    <Relative>
      <GoogleStaticMap
        latitude={latLng.latitude.toString()}
        longitude={latLng.longitude.toString()}
        zoom={13}
        size={{ width: parseInt(WINDOW_WIDTH, 10), height: 150 }}
        apiKey={GOOGLE_MAPS_API_KEY}
        onError={({ nativeEvent: { error } }) => { ErrorsManager.captureException(error); }}
      />
      <Absolute>
        <Block>
          <Row>
            {/* <RoundButton
              status="translucid"
              iconSet="MaterialCommunityIcons"
              iconName="directions"
              onPress={() => {
                openGoogleMapsDirections({ latLng, title: spot.name });
              }}
            />
            <Spacer row size="M" /> */}
            <RoundButton
              status="translucid"
              iconSet="MaterialCommunityIcons"
              iconName="google-maps"
              onPress={async () => {
                await openGoogleMapsLocation({ latLng, title: spot.name });
              }}
            />
          </Row>
        </Block>
      </Absolute>
    </Relative>
  );
};

SpotMap.propTypes = {
  spot: propType(spotDetailsFragment).isRequired,
};

export default SpotMap;
