import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import moment from 'moment';
import MockDate from 'mockdate';
import cloneDeep from 'lodash/cloneDeep';
import I18n from '../../../I18n';
import { ApolloMockProvider } from '../../../GraphQL';
import SportDateTimeSlide, { INIT_ERRORS } from '.';

const mockMonth = 10; // november
const mockYear = 2018;
const mockDate = 1;

const validSport = 'SOCCER';
let validDate;
let validTime;
const validDuration = 120;
const validCapacity = 12;

describe('SportDateTimeSlide', () => {
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
        <SportDateTimeSlide />
      </ApolloMockProvider>,
    ).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('displays error msg on the correct input field', () => {
    [
      {
        fieldName: 'sport',
        testID: 'pickSport',
      },
      {
        fieldName: 'date',
        testID: 'pickDate',
      },
      {
        fieldName: 'time',
        testID: 'pickTime',
      },
    ].forEach(({ fieldName, testID }) => {
      const errorMsg = 'Some error msg';

      const wrapper = shallow(
        <SportDateTimeSlide errors={{ ...cloneDeep(INIT_ERRORS), [fieldName]: [errorMsg] }} />,
      );

      expect(wrapper.find({ testID }).props().error).toBe(I18n.t(errorMsg));
    });
  });

  it('calls onChange when sport, date, time, duration or capacity field is changed', () => {
    [
      {
        fieldName: 'sport',
        testID: 'pickSport',
        value: validSport,
      },
      {
        fieldName: 'date',
        testID: 'pickDate',
        value: validDate,
      },
      {
        fieldName: 'time',
        testID: 'pickTime',
        value: validTime,
      },
      {
        fieldName: 'duration',
        testID: 'pickDuration',
        value: validDuration,
      },
      {
        fieldName: 'capacity',
        testID: 'pickCapacity',
        value: validCapacity,
      },
    ].forEach(({ fieldName, testID, value }) => {
      const handleChange = jest.fn();
      const wrapper = shallow(<SportDateTimeSlide onChange={handleChange} />);

      wrapper.find({ testID }).props().onChange(value);

      expect(handleChange).toBeCalledWith(
        expect.objectContaining({ fieldName, value }),
      );
    });
  });

  it('errors when form is submitted without sport, date or time', () => {
    [
      {
        fieldName: 'sport',
        sport: '',
        date: validDate,
        time: validTime,
        errorMsg: 'sportDateTimeSlide.fields.sport.errors.required',
      },
      {
        fieldName: 'date',
        sport: validSport,
        date: '',
        time: validTime,
        errorMsg: 'sportDateTimeSlide.fields.date.errors.required',
      },
      {
        fieldName: 'time',
        sport: validSport,
        date: validDate,
        time: '',
        errorMsg: 'sportDateTimeSlide.fields.time.errors.required',
      },
    ].forEach(({
      fieldName,
      sport,
      date,
      time,
      errorMsg,
    }) => {
      const errors = SportDateTimeSlide.validateFields({ sport, date, time });

      expect(errors[fieldName]).toEqual(
        expect.arrayContaining([I18n.t(errorMsg)]),
      );
    });
  });

  it('errors when form is submitted with past date-time', () => {
    const args = {
      sport: validSport,
      date: validDate.clone().subtract(1, 'days'),
      time: validTime,
    };
    const errors = SportDateTimeSlide.validateFields(args);

    expect(errors.time).toEqual(
      expect.arrayContaining([I18n.t('sportDateTimeSlide.fields.time.errors.pastDateTime')]),
    );
  });
});