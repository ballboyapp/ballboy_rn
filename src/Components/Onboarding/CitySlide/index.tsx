import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { View, FlatList, ScrollView } from 'react-native';
import cloneDeep from 'lodash/cloneDeep';
import I18n from '../../../I18n';
import { CitiesContext } from '../../../Context/Cities';
import cityFragment from '../../../GraphQL/Cities/Fragments/city';
import Images from '../../../Themes/Images';
import ImageBackground from '../../../Backgrounds/ImageBackground';
import Text from '../../Common/Text';
import Block from '../../Common/Block';
import Spacer from '../../Common/Spacer';
import RaisedButton from '../../Common/RaisedButton';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
export const INIT_STATE = {
  city: null,
};

export const getInitState = () => cloneDeep(INIT_STATE);
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const CitySlide = ({ city, onChange }) => {
  const { cities } = useContext(CitiesContext);

  return (
    <ImageBackground image={Images.locationOnboarding}>
      <View>
        <Text size="M" color="white" center>
          {I18n.t('locationSlide.title')}
        </Text>
      </View>
      <Spacer size="L" />
      <ScrollView>
        <Block style={{ flex: 1 }}>
          <FlatList
            data={cities}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <RaisedButton
                label={item.name}
                variant={city && city._id && city._id === item._id ? 'default' : 'transparent'}
                onPress={() => { onChange({ fieldName: 'city', value: item }); }}
              />
            )}
            ItemSeparatorComponent={() => (<Spacer size="XL" />)}
            contentContainerStyle={{ flex: 1 }}
          />
        </Block>
      </ScrollView>
    </ImageBackground>
  );
};

CitySlide.requiredFields = ['city'];

CitySlide.propTypes = {
  city: propType(cityFragment),
  onChange: PropTypes.func,
};

CitySlide.defaultProps = {
  city: getInitState(),
  onChange: () => {},
};

export default CitySlide;
