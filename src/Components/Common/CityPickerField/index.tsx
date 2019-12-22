import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { CitiesContext } from '../../../Context/Cities';
import cityFragment from '../../../GraphQL/Cities/Fragments/city';
import InputField from '../InputField';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const CityPickerField = ({ city, onChange, ...rest }) => {
  const { cities } = useContext(CitiesContext);

  const data = cities.map(({ _id, name }) => ({ value: _id, label: name }));

  const selected = city ? data.find((i) => (i.value === city._id)) : null;
  const nCities = cities.length;

  return (
    <InputField
      comp="Dropdown"
      value={(selected && selected.label) || ''}
      data={data}
      onChangeText={(item) => {
        const cty = cities.find((c) => (c._id === item.value));
        onChange(cty);
      }}
      dropdownPosition={-nCities}
      itemCount={nCities}
      {...rest}
    />
  );
};

CityPickerField.propTypes = {
  city: propType(cityFragment),
  onChange: PropTypes.func,
  // Plus all InputField props (theme, size)
};

CityPickerField.defaultProps = {
  city: null,
  onChange: () => {},
};

export default CityPickerField;
