import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components/native';
// import moment from 'moment';
// import MockDate from 'mockdate';
import I18n from '../../../I18n';
// import { CITIES } from '../../../constants';
import privateUser from '../../../GraphQL/Users/Queries/privateUser';
import mockClient, { ApolloMockProvider } from '../../../GraphQL/ApolloMockClient';
import scTheme from '../../../Themes/scTheme'; // styled-components theme
import EditProfileForm, { MAX_CHARS } from '.';

const validName = 'John Doe';
const longName = new Array(MAX_CHARS + 2).join('a'); // aaaaaa... length = MAX_CHARS + 1
const someErrorMsg = 'Some error msg';

// const mockLocation = CITIES[0];

describe('EditProfileForm', () => {
  let user;

  beforeAll(async () => {
    const res = await mockClient.query({
      query: privateUser,
    });
    user = res.data.privateUser;
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(
      <ApolloMockProvider>
        <ThemeProvider theme={scTheme}>
          <EditProfileForm user={user} /* location={mockLocation} */ />
        </ThemeProvider>
      </ApolloMockProvider>,
    ).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('renders custom label button', () => {
    const wrapper = shallow(<EditProfileForm user={user} />);
    expect(wrapper.find({ testID: 'editProfileSubmitButton' }).props().label).toBe(I18n.t('editProfileForm.btnLabel'));
  });

  it('errors when form is submitted without name', () => {
    const name = '';
    const errorFieldID = 'editProfileFieldName';
    const errorMsg = 'editProfileForm.fields.name.errors.required';
    const handleClientError = jest.fn();
    const wrapper = shallow(
      <EditProfileForm
        user={user}
        // location={mockLocation}
        onClientErrorHook={handleClientError}
      />,
    );

    // Sanity check
    expect(wrapper.find({ testID: errorFieldID }).props().value).not.toBeNull();

    wrapper.find({ testID: errorFieldID }).props().onChangeText(name);

    wrapper.find({ testID: 'editProfileSubmitButton' }).props().onPress();

    expect(wrapper.find({ testID: errorFieldID }).props().error).toBe(I18n.t(errorMsg));
    expect(handleClientError).toBeCalled();
  });

  it('errors when form is submitted with name length > MAX_CHARS', () => {
    const name = longName;
    const errorFieldID = 'editProfileFieldName';
    const errorMsg = 'editProfileForm.fields.name.errors.tooLong';
    const handleClientError = jest.fn();
    const wrapper = shallow(
      <EditProfileForm
        // location={mockLocation}
        user={user}
        onClientErrorHook={handleClientError}
      />,
    );

    // Sanity check
    expect(wrapper.find({ testID: errorFieldID }).props().value).not.toBeNull();

    wrapper.find({ testID: errorFieldID }).props().onChangeText(name);

    wrapper.find({ testID: 'editProfileSubmitButton' }).props().onPress();

    expect(wrapper.find({ testID: errorFieldID }).props().error).toBe(I18n.t(errorMsg));
    expect(handleClientError).toBeCalled();
  });

  it('clears errors when name input field is modified after error', () => {
    const name = '';
    const validField = validName;
    const errorFieldID = 'editProfileFieldName';
    const errorMsg = 'editProfileForm.fields.name.errors.required';

    const handleClientError = jest.fn();
    const wrapper = shallow(
      <EditProfileForm
        // location={mockLocation}
        user={user}
        onClientErrorHook={handleClientError}
      />,
    );

    // Sanity check
    expect(wrapper.find({ testID: errorFieldID }).props().value).not.toBeNull();

    wrapper.find({ testID: errorFieldID }).props().onChangeText(name);

    wrapper.find({ testID: 'editProfileSubmitButton' }).props().onPress();

    expect(wrapper.find({ testID: errorFieldID }).props().error).toBe(I18n.t(errorMsg));
    expect(handleClientError).toBeCalled();

    wrapper.find({ testID: errorFieldID }).props().onChangeText(validField);
    wrapper.find({ testID: 'editProfileSubmitButton' }).props().onPress();

    expect(wrapper.find({ testID: errorFieldID }).props().error).toBe('');
  });

  it('aborts form submission if onBeforeHook throws', () => {
    const handleBefore = jest.fn().mockImplementation(() => { throw new Error(); });
    const handleClientCancel = jest.fn();
    const handleSuccess = jest.fn();

    const wrapper = shallow(
      <EditProfileForm
        user={user}
        // location={mockLocation}
        onBeforeHook={handleBefore}
        onClientCancelHook={handleClientCancel}
        onSuccessHook={handleSuccess}
      />,
    );

    // Sanity check
    expect(wrapper.find({ testID: 'editProfileFieldName' }).props().value).not.toBeNull();

    wrapper.find({ testID: 'editProfileFieldName' }).props().onChangeText(validName);

    wrapper.find({ testID: 'editProfileSubmitButton' }).props().onPress();

    expect(handleBefore).toBeCalled();
    expect(handleClientCancel).toBeCalled();
    expect(handleSuccess).not.toBeCalled();
  });

  it('renders errors props', () => {
    const wrapper = shallow(<EditProfileForm user={user} />);
    expect(wrapper.find({ testID: 'editProfileFieldName' }).props().error).toBe('');
    wrapper.setProps({ errors: { name: [someErrorMsg] } });
    expect(wrapper.find({ testID: 'editProfileFieldName' }).props().error).toBe(someErrorMsg);
  });

  it('calls onSuccessHook when valid name is provided', () => {
    const handleBefore = jest.fn();
    const handleClientCancel = jest.fn();
    const handleClientError = jest.fn();
    const handleSuccess = jest.fn();

    const wrapper = shallow(
      <EditProfileForm
        user={user}
        // location={mockLocation}
        onBeforeHook={handleBefore}
        onClientCancelHook={handleClientCancel}
        onClientErrorHook={handleClientError}
        onSuccessHook={handleSuccess}
      />,
    );

    // Sanity check
    expect(wrapper.find({ testID: 'editProfileFieldName' }).props().value).not.toBeNull();

    wrapper.find({ testID: 'editProfileFieldName' }).props().onChangeText(validName);

    expect(wrapper.state().name).toBe(validName);

    wrapper.find({ testID: 'editProfileSubmitButton' }).props().onPress();

    expect(handleBefore).toBeCalled();
    expect(handleClientCancel).not.toBeCalled();
    expect(handleSuccess).toBeCalledWith(
      expect.objectContaining({
        // userUUID: user.uuid,
        // userProfileUUID: user.profile.uuid,
        name: validName,
        avatar: user.profile.avatar,
        location: user.profile.location,
      }),
    );
  });
});
