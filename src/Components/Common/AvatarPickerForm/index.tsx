import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { View } from 'react-native';
import ErrorHandling from 'error-handling-utils';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import I18n from '../../../I18n';
import privateUserFragment from '../../../GraphQL/Users/Fragments/privateUser';
import Row from '../Row';
import Spacer from '../Spacer';
import Text from '../Text';
import Avatar from '../Avatar';
import RaisedButton from '../RaisedButton';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: implement componentWillUpdate in case (user) name changes
class AvatarPickerForm extends React.PureComponent {
  constructor(props) {
    super(props);

    const { avatar } = props.user.profile;

    // Initialize state based on current user data
    this.state = {
      avatar: avatar || '',
      errors: {
        avatar: [],
      },
    };
  }

  async componentDidMount() {
    // Move this to onBEforeHook or place it before calle the image picker from expo
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        // TODO: show alert + translate
        console.log('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  clearErrors = () => {
    this.setState({ errors: { avatar: [] } });
  };

  handleUpload = async () => {
    const {
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

    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1.0,
      base64: true,
    };

    try {
      // TODO: add permissions https://docs.expo.io/versions/latest/sdk/imagepicker/
      const res = await ImagePicker.launchImageLibraryAsync(options);
      console.log({ res });

      if (res.cancelled) {
        console.log('User cancelled photo picker');
        onClientCancelHook();
        return;
      }

      const { base64, uri } = res;

      // You can display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + res.data };
      const avatar = base64 ? `data:image/jpeg;base64,${base64}` : uri;
      console.log({ avatar });
      this.setState({ avatar });
      // Pass event up to parent component. onClientSuccessHook will set 'disabled'
      // value back to 'false' so that the user can re-submit the form
      onSuccessHook({ file: avatar });
    } catch (exc) {
      console.log('ImagePicker Error: ', exc);
      // Pass event up to parent component. onClientErrorHook will set 'disabled'
      // value back to 'false' so that the user can re-submit the form
      this.setState({ errors: { avatar: [exc] } });
      onClientErrorHook();
    }
  }

  render() {
    const { user, disabled } = this.props;
    const { avatar, errors } = this.state;

    // Set user based on state values
    const usr = { ...user, profile: { avatar } };

    // Apply translation and concatenate field errors (string)
    const avatarErrors = ErrorHandling.getFieldErrors(errors, 'avatar', I18n.t);

    return (
      <View>
        <Row justifyContent="center">
          <Avatar user={usr} size="L" />
        </Row>
        <Spacer size="XL" />
        {!!avatarErrors && avatarErrors.length > 0 && (
          <View>
            <Text color="negative" center>
              {avatarErrors}
            </Text>
            <Spacer size="XL" />
          </View>
        )}
        <RaisedButton
          variant="ghost"
          label={I18n.t('avatarPickerForm.btnLabel')}
          disabled={disabled}
          onPress={this.handleUpload}
        />
      </View>
    );
  }
}

AvatarPickerForm.propTypes = {
  user: propType(privateUserFragment).isRequired,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientCancelHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

AvatarPickerForm.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onClientCancelHook: () => {},
  onClientErrorHook: () => {},
  onSuccessHook: () => {},
};

export default AvatarPickerForm;
