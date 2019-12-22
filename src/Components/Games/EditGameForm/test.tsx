import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components/native';
import moment from 'moment';
import MockDate from 'mockdate';
import I18n from '../../../I18n';
import activityDetailsQuery from '../../../GraphQL/Activities/Queries/activityDetails';
import mockClient, { ApolloMockProvider } from '../../../GraphQL/ApolloMockClient';
import scTheme from '../../../Themes/scTheme'; // styled-components theme
import EditGameForm, { TITLE_MAX_CHARS, DESCRIPTION_MAX_CHARS } from '.';

const mockMonth = 10; // november
const mockYear = 2018;
const mockDate = 1;

const validTitle = 'Football game!';
let validDate;
let validTime;
const validDuration = 120;
const longName = new Array(TITLE_MAX_CHARS + 2).join('a'); // aaaaaa... length = TITLE_MAX_CHARS + 1
const longDescription = new Array(DESCRIPTION_MAX_CHARS + 2).join('a'); // aaaaaa... length = DESCRIPTION_MAX_CHARS + 1
const someErrorMsg = 'Some error msg';

describe('EditGameForm', () => {
  let activity;

  beforeAll(async () => {
    const res = await mockClient.query({
      query: activityDetailsQuery,
      variables: { _id: '1' },
    });
    activity = res.data.activityDetails; // eslint-disable-line prefer-destructuring
  });

  beforeEach(() => {
    const mockMoment = moment.utc({
      year: mockYear,
      month: mockMonth,
      date: mockDate,
    });
    MockDate.set(mockMoment.toDate());

    validDate = moment.utc();
    validTime = moment.utc().clone().add(1, 'hours');
  });

  afterEach(() => {
    MockDate.reset();
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(
      <ApolloMockProvider>
        <ThemeProvider theme={scTheme}>
          <EditGameForm activity={activity} />
        </ThemeProvider>
      </ApolloMockProvider>,
    ).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('renders custom label button', () => {
    const wrapper = shallow(<EditGameForm activity={activity} />);
    expect(wrapper.find({ testID: 'editGameSubmitButton' }).props().label).toBe(I18n.t('editGameForm.btnLabel'));
  });

  it('errors when form is submitted without title, date, time or duration', () => {
    [
      {
        title: '',
        date: validDate,
        time: validTime,
        duration: validDuration,
        errorFieldID: 'editGameFieldName',
        errorMsg: 'editGameForm.fields.title.errors.required',
      },
      {
        title: validTitle,
        date: '',
        time: validTime,
        duration: validDuration,
        errorFieldID: 'editGameFieldDate',
        errorMsg: 'editGameForm.fields.date.errors.required',
      },
      {
        title: validTitle,
        date: validDate,
        time: '',
        duration: validDuration,
        errorFieldID: 'editGameFieldTime',
        errorMsg: 'editGameForm.fields.time.errors.required',
      },
      {
        title: validTitle,
        date: validDate,
        time: validTime,
        duration: '',
        errorFieldID: 'editGameFieldDuration',
        errorMsg: 'editGameForm.fields.duration.errors.required',
      },
    ].forEach(({
      title,
      date,
      time,
      duration,
      errorFieldID,
      errorMsg,
    }) => {
      const handleClientError = jest.fn();
      const wrapper = shallow(
        <EditGameForm
          activity={activity}
          onClientErrorHook={handleClientError}
        />,
      );

      // Sanity check
      expect(wrapper.find({ testID: 'editGameFieldName' }).props().value).not.toBeNull();
      expect(wrapper.find({ testID: 'editGameFieldDate' }).props().value).not.toBeNull();
      expect(wrapper.find({ testID: 'editGameFieldTime' }).props().value).not.toBeNull();
      expect(wrapper.find({ testID: 'editGameFieldDuration' }).props().value).not.toBeNull();

      wrapper.find({ testID: 'editGameFieldName' }).props().onChangeText(title);
      wrapper.find({ testID: 'editGameFieldDate' }).props().onChange(date);
      wrapper.find({ testID: 'editGameFieldTime' }).props().onChange(time);
      wrapper.find({ testID: 'editGameFieldDuration' }).props().onChange(duration);

      wrapper.find({ testID: 'editGameSubmitButton' }).props().onPress();

      expect(wrapper.find({ testID: errorFieldID }).props().error).toBe(I18n.t(errorMsg));
      expect(handleClientError).toBeCalled();
    });
  });

  it('errors when title, description length > MAX_CHARS', () => {
    [
      {
        value: longName,
        errorFieldID: 'editGameFieldName',
        errorMsg: 'editGameForm.fields.title.errors.tooLong',
      },
      {
        value: longDescription,
        errorFieldID: 'editGameFieldDescription',
        errorMsg: 'editGameForm.fields.description.errors.tooLong',
      },
    ].forEach(({ value, errorFieldID, errorMsg }) => {
      const handleClientError = jest.fn();
      const wrapper = shallow(
        <EditGameForm
          activity={activity}
          onClientErrorHook={handleClientError}
        />,
      );

      wrapper.find({ testID: errorFieldID }).props().onChangeText(value);

      wrapper.find({ testID: 'editGameSubmitButton' }).props().onPress();

      expect(wrapper.find({ testID: errorFieldID }).props().error).toBe(I18n.t(errorMsg));
      expect(handleClientError).toBeCalled();
    });
  });

  it('errors when form is submitted with past date-time', () => {
    const handleClientError = jest.fn();
    const wrapper = shallow(
      <EditGameForm
        activity={activity}
        onClientErrorHook={handleClientError}
      />,
    );

    // Sanity check
    expect(wrapper.find({ testID: 'editGameFieldDate' }).props().value).not.toBeNull();
    expect(wrapper.find({ testID: 'editGameFieldTime' }).props().value).not.toBeNull();

    wrapper.find({ testID: 'editGameFieldDate' }).props().onChange(validDate.clone().subtract(1, 'days'));
    wrapper.find({ testID: 'editGameFieldTime' }).props().onChange(validTime);
    wrapper.find({ testID: 'editGameSubmitButton' }).props().onPress();

    expect(wrapper.find({ testID: 'editGameFieldTime' }).props().error).toBe(I18n.t('editGameForm.fields.time.errors.pastDateTime'));
    expect(handleClientError).toBeCalled();
  });

  it('errors when number of attendees > activity.capacity', () => {
    const handleClientError = jest.fn();
    const capacity = activity.attendees.length - 1;

    const wrapper = shallow(
      <EditGameForm
        activity={Object.assign({}, activity, { capacity })} // see mocks attendees.length > 2
        onClientErrorHook={handleClientError}
      />,
    );

    // Sanity check
    expect(wrapper.find({ testID: 'editGameFieldCapacity' }).props().value).toBe(capacity);

    wrapper.find({ testID: 'editGameSubmitButton' }).props().onPress();

    expect(wrapper.find({ testID: 'editGameFieldCapacity' }).props().error).toBe(I18n.t('editGameForm.fields.capacity.errors.noFit'));
    expect(handleClientError).toBeCalled();
  });

  it('clears errors when title, date, time or duration input field is modified after error', () => {
    [
      {
        title: '',
        validField: validTitle,
        date: validDate,
        time: validTime,
        duration: validDuration,
        errorFieldID: 'editGameFieldName',
        errorMsg: 'editGameForm.fields.title.errors.required',
      },
      {
        title: validTitle,
        date: '',
        validField: validDate,
        time: validTime,
        duration: validDuration,
        errorFieldID: 'editGameFieldDate',
        errorMsg: 'editGameForm.fields.date.errors.required',
      },
      {
        title: validTitle,
        date: validDate,
        time: '',
        validField: validTime,
        duration: validDuration,
        errorFieldID: 'editGameFieldTime',
        errorMsg: 'editGameForm.fields.time.errors.required',
      },
      {
        title: validTitle,
        date: validDate,
        time: validTime,
        duration: '',
        validField: validDuration,
        errorFieldID: 'editGameFieldDuration',
        errorMsg: 'editGameForm.fields.duration.errors.required',
      },
    ].forEach(({
      title,
      date,
      time,
      duration,
      validField,
      errorFieldID,
      errorMsg,
    }) => {
      const handleClientError = jest.fn();
      const wrapper = shallow(
        <EditGameForm
          activity={activity}
          onClientErrorHook={handleClientError}
        />,
      );

      // Sanity check
      expect(wrapper.find({ testID: 'editGameFieldName' }).props().value).not.toBeNull();
      expect(wrapper.find({ testID: 'editGameFieldDate' }).props().value).not.toBeNull();
      expect(wrapper.find({ testID: 'editGameFieldTime' }).props().value).not.toBeNull();
      expect(wrapper.find({ testID: 'editGameFieldDuration' }).props().value).not.toBeNull();

      wrapper.find({ testID: 'editGameFieldName' }).props().onChangeText(title);
      wrapper.find({ testID: 'editGameFieldDate' }).props().onChange(date);
      wrapper.find({ testID: 'editGameFieldTime' }).props().onChange(time);
      wrapper.find({ testID: 'editGameFieldDuration' }).props().onChange(duration);


      wrapper.find({ testID: 'editGameSubmitButton' }).props().onPress();

      expect(wrapper.find({ testID: errorFieldID }).props().error).toBe(I18n.t(errorMsg));
      expect(handleClientError).toBeCalled();

      if (errorFieldID === 'editGameFieldName') {
        wrapper.find({ testID: errorFieldID }).props().onChangeText(validField);
      } else {
        wrapper.find({ testID: errorFieldID }).props().onChange(validField);
      }

      wrapper.find({ testID: 'editGameSubmitButton' }).props().onPress();

      expect(wrapper.find({ testID: errorFieldID }).props().error).toBe('');
    });
  });

  it('aborts form submission if onBeforeHook throws', () => {
    const handleBefore = jest.fn().mockImplementation(() => { throw new Error(); });
    const handleClientCancel = jest.fn();
    const handleSuccess = jest.fn();

    const wrapper = shallow(
      <EditGameForm
        activity={activity}
        onBeforeHook={handleBefore}
        onClientCancelHook={handleClientCancel}
        onSuccessHook={handleSuccess}
      />,
    );

    // Sanity check
    expect(wrapper.find({ testID: 'editGameFieldName' }).props().value).not.toBeNull();
    expect(wrapper.find({ testID: 'editGameFieldDate' }).props().value).not.toBeNull();
    expect(wrapper.find({ testID: 'editGameFieldTime' }).props().value).not.toBeNull();
    expect(wrapper.find({ testID: 'editGameFieldDuration' }).props().value).not.toBeNull();

    wrapper.find({ testID: 'editGameFieldName' }).props().onChangeText(validTitle);
    wrapper.find({ testID: 'editGameFieldDate' }).props().onChange(validDate);
    wrapper.find({ testID: 'editGameFieldTime' }).props().onChange(validTime);
    wrapper.find({ testID: 'editGameFieldDuration' }).props().onChange(validDuration);

    wrapper.find({ testID: 'editGameSubmitButton' }).props().onPress();

    expect(handleBefore).toBeCalled();
    expect(handleClientCancel).toBeCalled();
    expect(handleSuccess).not.toBeCalled();
  });

  it('renders errors props', () => {
    [
      { fieldName: 'title', testID: 'editGameFieldName' },
      { fieldName: 'date', testID: 'editGameFieldDate' },
      { fieldName: 'time', testID: 'editGameFieldTime' },
      { fieldName: 'duration', testID: 'editGameFieldDuration' },
      { fieldName: 'capacity', testID: 'editGameFieldCapacity' },
      { fieldName: 'description', testID: 'editGameFieldDescription' },
    ].forEach(({ fieldName, testID }) => {
      const wrapper = shallow(<EditGameForm activity={activity} />);
      expect(wrapper.find({ testID }).props().error).toBe('');
      wrapper.setProps({ errors: { [fieldName]: [someErrorMsg] } });
      expect(wrapper.find({ testID }).props().error).toBe(someErrorMsg);
    });
  });

  it('calls onSuccessHook when valid title, date, time and duration are provided', () => {
    const handleBefore = jest.fn();
    const handleClientCancel = jest.fn();
    const handleClientError = jest.fn();
    const handleSuccess = jest.fn();
    const capacity = activity.attendees.length;

    const wrapper = shallow(
      <EditGameForm
        activity={Object.assign({}, activity, { capacity })}
        onBeforeHook={handleBefore}
        onClientCancelHook={handleClientCancel}
        onClientErrorHook={handleClientError}
        onSuccessHook={handleSuccess}
      />,
    );

    // Sanity check
    expect(wrapper.find({ testID: 'editGameFieldName' }).props().value).not.toBeNull();
    expect(wrapper.find({ testID: 'editGameFieldDate' }).props().value).not.toBeNull();
    expect(wrapper.find({ testID: 'editGameFieldTime' }).props().value).not.toBeNull();
    expect(wrapper.find({ testID: 'editGameFieldDuration' }).props().value).not.toBeNull();

    wrapper.find({ testID: 'editGameFieldName' }).props().onChangeText(validTitle);
    wrapper.find({ testID: 'editGameFieldDate' }).props().onChange(validDate);
    wrapper.find({ testID: 'editGameFieldTime' }).props().onChange(validTime);
    wrapper.find({ testID: 'editGameFieldDuration' }).props().onChange(validDuration);

    expect(wrapper.state().title).toBe(validTitle);
    expect(wrapper.state().date).toBe(validDate);
    expect(wrapper.state().time).toBe(validTime);
    expect(wrapper.state().duration).toBe(validDuration);

    wrapper.find({ testID: 'editGameSubmitButton' }).props().onPress();

    expect(handleBefore).toBeCalled();
    expect(handleClientCancel).not.toBeCalled();
    expect(handleClientError).not.toBeCalled();
    expect(handleSuccess).toBeCalledWith(
      expect.objectContaining({
        title: validTitle,
        date: validDate,
        time: validTime,
        duration: validDuration,
      }),
    );
  });
});
