import React from 'react';
import { shallow } from 'enzyme';
import { Alert } from 'react-native';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components/native';
import I18n from '../../../I18n';
import activityDetailsQuery from '../../../GraphQL/Activities/Queries/activityDetails';
import mockClient from '../../../GraphQL/ApolloMockClient';
import scTheme from '../../../Themes/scTheme'; // styled-components theme
import CancelGameForm, { MAX_CHARS } from '.';

const validCancelMsg = new Array(MAX_CHARS + 1).join('a'); // aaaaaa... length = MAX_CHARS
const invalidCancelMsg = new Array(MAX_CHARS + 2).join('a'); // aaaaaa... length = MAX_CHARS + 1
const someErrorMsg = 'Some error msg';

describe('CancelGameForm', () => {
  let activity;

  beforeAll(async () => {
    const res = await mockClient.query({
      query: activityDetailsQuery,
      variables: { _id: '1' },
    });
    activity = res.data.activityDetails; // eslint-disable-line prefer-destructuring
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(
      <ThemeProvider theme={scTheme}>
        <CancelGameForm activity={activity} />
      </ThemeProvider>,
    ).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('renders custom label button', () => {
    const wrapper = shallow(<CancelGameForm activity={activity} />);
    expect(wrapper.find({ testID: 'cancelGameFormSubmitButton' }).props().label).toBe(I18n.t('cancelGameForm.btnLabel'));
  });

  it('aborts form submission if onBeforeHook throws', () => {
    const handleBefore = jest.fn().mockImplementation(() => { throw new Error(); });
    const handleClientCancel = jest.fn();
    const handleSuccess = jest.fn();

    const wrapper = shallow(
      <CancelGameForm
        activity={activity}
        onBeforeHook={handleBefore}
        onClientCancelHook={handleClientCancel}
        onSuccessHook={handleSuccess}
      />,
    );

    // Sanity check
    expect(wrapper.find({ testID: 'cancelGameFormCancelMsgField' }).props().value).toBe('');

    wrapper.find({ testID: 'cancelGameFormSubmitButton' }).props().onPress();

    expect(handleBefore).toBeCalled();
    expect(handleClientCancel).toBeCalled();
    expect(handleSuccess).not.toBeCalled();
  });

  it('errors when cancelMsg longer than MAX_CHARS', () => {
    const handleClientError = jest.fn();
    const wrapper = shallow(
      <CancelGameForm
        activity={activity}
        onClientErrorHook={handleClientError}
      />,
    );

    // Sanity check
    expect(wrapper.find({ testID: 'cancelGameFormCancelMsgField' }).props().value).toBe('');

    wrapper.find({ testID: 'cancelGameFormCancelMsgField' }).props().onChangeText(invalidCancelMsg);

    wrapper.find({ testID: 'cancelGameFormSubmitButton' }).props().onPress();

    expect(wrapper.find({ testID: 'cancelGameFormCancelMsgField' }).props().error).toBe(I18n.t('cancelGameForm.fields.cancelMsg.errors.tooLong'));
    expect(handleClientError).toBeCalled();
  });

  it('renders errors props', () => {
    const wrapper = shallow(<CancelGameForm activity={activity} />);
    expect(wrapper.find({ testID: 'cancelGameFormCancelMsgField' }).props().error).toBe('');
    wrapper.setProps({ errors: { cancelMsg: [someErrorMsg] } });
    expect(wrapper.find({ testID: 'cancelGameFormCancelMsgField' }).props().error).toBe(someErrorMsg);
  });

  it('calls onSuccessHook when no cancelMsg or cancelMsg.length <= MAX_CHARS is provided', () => {
    ['', validCancelMsg].forEach((cancelMsg) => {
      jest.mock('Alert', () => ({ alert: jest.fn() }));
      const handleBefore = jest.fn();
      const handleClientCancel = jest.fn();
      const handleClientError = jest.fn();
      const handleSuccess = jest.fn();

      const wrapper = shallow(
        <CancelGameForm
          activity={activity}
          onBeforeHook={handleBefore}
          onClientCancelHook={handleClientCancel}
          onClientErrorHook={handleClientError}
          onSuccessHook={handleSuccess}
        />,
      );

      // Sanity check
      expect(wrapper.find({ testID: 'cancelGameFormCancelMsgField' }).props().value).toBe('');

      wrapper.find({ testID: 'cancelGameFormCancelMsgField' }).props().onChangeText(cancelMsg);

      expect(wrapper.state().cancelMsg).toBe(cancelMsg);
      wrapper.find({ testID: 'cancelGameFormSubmitButton' }).props().onPress();

      expect(Alert.alert).toHaveBeenCalled();
      Alert.alert.mock.calls[0][2][1].onPress(); // simulate OK btn press

      expect(handleBefore).toBeCalled();
      expect(handleClientCancel).not.toBeCalled();
      expect(handleSuccess).toBeCalledWith(expect.objectContaining({
        activityId: activity._id,
        cancelMsg,
      }));

      Alert.alert.mockClear();
    });
  });

  it('calls onClientCancelHook when user dismisses confirmation modal', () => {
    ['', validCancelMsg].forEach((cancelMsg) => {
      jest.mock('Alert', () => ({ alert: jest.fn() }));
      const handleBefore = jest.fn();
      const handleClientCancel = jest.fn();
      const handleClientError = jest.fn();
      const handleSuccess = jest.fn();

      const wrapper = shallow(
        <CancelGameForm
          activity={activity}
          onBeforeHook={handleBefore}
          onClientCancelHook={handleClientCancel}
          onClientErrorHook={handleClientError}
          onSuccessHook={handleSuccess}
        />,
      );

      // Sanity check
      expect(wrapper.find({ testID: 'cancelGameFormCancelMsgField' }).props().value).toBe('');

      wrapper.find({ testID: 'cancelGameFormCancelMsgField' }).props().onChangeText(cancelMsg);

      expect(wrapper.state().cancelMsg).toBe(cancelMsg);
      wrapper.find({ testID: 'cancelGameFormSubmitButton' }).props().onPress();

      expect(Alert.alert).toHaveBeenCalled();
      Alert.alert.mock.calls[0][2][0].onPress(); // simulate CANCEL btn press

      expect(handleBefore).toBeCalled();
      expect(handleClientCancel).toBeCalled();
      expect(handleSuccess).not.toBeCalled();

      Alert.alert.mockClear();
    });
  });
});
