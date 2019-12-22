import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { View } from 'react-native';
// import isNumber from 'lodash/isNumber';
import cloneDeep from 'lodash/cloneDeep';
import pick from 'lodash/pick';
// import moment from 'moment';
import ErrorHandling from 'error-handling-utils';
import I18n from '../../../I18n';
import { withCities } from '../../../Context/Cities';
import privateUserFragment from '../../../GraphQL/Users/Fragments/privateUser';
import cityFragment from '../../../GraphQL/Cities/Fragments/city';
import { TopLayout, BottomLayout } from '../../Layouts/FixedBottomLayout';
import Block from '../../Common/Block';
import TextField from '../../Common/TextField';
import RaisedButton from '../../Common/RaisedButton';
import AvatarPicker from '../../Common/AvatarPicker';
import CityPickerField from '../../Common/CityPickerField';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
export const MAX_CHARS = 120;

let INIT_STATE;

const getInitState = (user, cities) => {
  const {
    profile: {
      username,
      avatar,
      city,
    },
  } = user;

  return {
    name: username,
    // birthYear: (profile && profile.year_of_birth && profile.year_of_birth.toString()) || '',
    // avatar: (profile && profile.avatar && profile.avatar.toString()) || '',
    avatar,
    city: cities.find((c) => city === c.name),
  };
};

const INIT_ERRORS = {
  name: [], // use usernbame instead
  // birthYear: [],
  city: [],
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class EditProfileForm extends React.PureComponent {
  constructor(props) {
    super(props);

    const { user, cities } = props;
    // console.log('user', user);

    INIT_STATE = getInitState(user, cities);

    // Initialize state based on current user data
    this.state = {
      ...cloneDeep(INIT_STATE),
      errors: cloneDeep(INIT_ERRORS),
    };
  }

  componentWillReceiveProps({ errors }) {
    // Display (server side) errors coming from parent component
    if (errors) {
      this.setState({
        errors: {
          ...cloneDeep(INIT_ERRORS),
          ...errors,
        },
      });
    }
  }

  clearErrors = () => {
    this.setState({ errors: cloneDeep(INIT_ERRORS) });
  };

  handleChange = ({ fieldName, value }) => {
    const { errors } = this.state;

    // Update value and clear errors for the given field
    this.setState({
      [fieldName]: value,
      errors: ErrorHandling.clearErrors(errors, fieldName),
    } /* , () => { console.log('this.state', this.state); } */);
  }

  // TODO: validate city (required)
  validateFields = ({ name /* , birthYear */ }) => {
    // Initialize errors
    const errors = cloneDeep(INIT_ERRORS);

    // Sanitize input
    const _name = name && name.trim(); // eslint-disable-line no-underscore-dangle

    if (!_name || _name.length === 0) {
      errors.name.push('editProfileForm.fields.name.errors.required');
    } else if (_name.length > MAX_CHARS) {
      errors.name.push('editProfileForm.fields.name.errors.tooLong');
    }

    // Sanitize input
    // const _birthYear = birthYear && parseInt(birthYear, 10); // eslint-disable-line no-underscore-dangle

    // if (_birthYear && (
    //   !isNumber(_birthYear)
    //   || _birthYear < 1900
    //   || _birthYear > 9999
    //   || moment().diff(moment(_birthYear, 'YYYY'), 'years') <= 0 // diff between today and the provided year
    // )) {
    //   errors.birthYear.push('editProfileForm.fields.birthYear.errors.invalid');
    // }

    return errors;
  };

  handleSubmit = () => {
    const {
      // user,
      onBeforeHook,
      onClientCancelHook,
      onClientErrorHook,
      onSuccessHook,
    } = this.props;

    // Run before logic if provided and return on error. onBeforeHook will set the 'disabled'
    // value to 'true' so that the user cannot re-submit the form
    try {
      onBeforeHook();
    } catch (exc) {
      onClientCancelHook();
      return; // return silently
    }

    // Clear previous errors if any
    this.clearErrors();

    // Validate fields
    const errors = this.validateFields(this.state);

    // In case of errors, display on UI and return handler to parent component
    if (ErrorHandling.hasErrors(errors)) {
      this.setState({ errors });
      // Pass event up to parent component. onClientErrorHook will set 'disabled'
      // value back to 'false' so that the user can re-submit the form
      onClientErrorHook();
      return;
    }

    // Pass event up to parent component
    onSuccessHook(pick(this.state, Object.keys(INIT_STATE)));
  }

  render() {
    const { user, disabled } = this.props;
    const { name, city, /* birthYear, */ errors } = this.state;

    // Apply translation and concatenate field errors (string)
    const nameErrors = ErrorHandling.getFieldErrors(errors, 'name', I18n.t);
    // const birthYearErrors = ErrorHandling.getFieldErrors(errors, 'birthYear', I18n.t);

    return (
      <View style={{ flex: 1 }}>
        <TopLayout>
          <Block>
            <AvatarPicker
              user={user}
              onUploadSuccess={(value) => {
                this.handleChange({ fieldName: 'avatar', value });
              }}
            />
          </Block>
          <Block midHeight>
            <TextField
              testID="editProfileFieldName"
              label={I18n.t('editProfileForm.fields.name.label')}
              value={name}
              error={nameErrors}
              size="ML"
              disabled={disabled}
              onChangeText={(value) => {
                this.handleChange({ fieldName: 'name', value });
              }}
            />
          </Block>
          <Block midHeight>
            <CityPickerField
              testID="editProfileFieldCity"
              label={I18n.t('editProfileForm.fields.city.label')}
              city={city}
              size="ML"
              disabled={disabled}
              fullWidth
              onChange={(value) => {
                this.handleChange({ fieldName: 'city', value });
              }}
            />
          </Block>
          {/* <Block>
            <TextField
              testID="editProfileFieldBirthYear"
              label={I18n.t('editProfileForm.fields.birthYear.label')}
              value={birthYear}
              error={birthYearErrors}
              placeholder="YYYY"
              size="ML"
              keyboardType="numeric"
              onChangeText={(value) => {
                this.handleChange({ fieldName: 'birthYear', value });
              }}
            />
            </Block> */}
        </TopLayout>
        <BottomLayout>
          <RaisedButton
            testID="editProfileSubmitButton"
            variant="default"
            label={I18n.t('editProfileForm.btnLabel')}
            disabled={disabled}
            onPress={this.handleSubmit}
          />
        </BottomLayout>
      </View>
    );
  }
}

EditProfileForm.propTypes = {
  user: propType(privateUserFragment).isRequired,
  cities: PropTypes.arrayOf(propType(cityFragment)).isRequired,
  disabled: PropTypes.bool,
  errors: PropTypes.object, // eslint-disable-line
  onBeforeHook: PropTypes.func,
  onClientCancelHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

EditProfileForm.defaultProps = {
  disabled: false,
  errors: null,
  onBeforeHook: () => {},
  onClientCancelHook: () => {},
  onClientErrorHook: () => {},
  onSuccessHook: () => {},
};

export default withCities(EditProfileForm);
