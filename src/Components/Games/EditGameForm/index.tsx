import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components/native';
import ErrorHandling from 'error-handling-utils';
import moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';
import pick from 'lodash/pick';
import I18n from '../../../I18n';
import activityDetailsFragment from '../../../GraphQL/Activities/Fragments/activityDetails';
import { TopLayout, BottomLayout } from '../../Layouts/FixedBottomLayout';
import DatePickerField from '../../Common/DatePickerField';
import TimePickerField from '../../Common/TimePickerField';
import DurationPickerField from '../../Common/DurationPickerField';
import CapacityPickerField from '../../Common/CapacityPickerField';
import SpotPickerField from '../../Common/SpotPickerField';
import Block from '../../Common/Block';
import Row from '../../Common/Row';
import Divider from '../../Common/Divider';
import TextField from '../../Common/TextField';
import RaisedButton from '../../Common/RaisedButton';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
export const TITLE_MAX_CHARS = 120;
export const DESCRIPTION_MAX_CHARS = 2000;

let INIT_STATE;

const getInitState = ({ activity }) => {
  const {
    sport,
    dateTime,
    duration = null,
    capacity,
    spot,
    title,
    description = '',
  } = activity;

  // console.log('activity', activity);

  // throw new Error(typeof endTime + typeof startTime);

  const dateTimeMoment = dateTime ? moment.utc(dateTime) : moment.utc();
  // const endMoment = endTime ? moment.utc(endTime) : moment.utc();

  return {
    sport,
    date: dateTimeMoment.clone().startOf('day'),
    time: dateTimeMoment.clone(),
    duration,
    capacity,
    spot,
    title,
    description,
    // isPublic: inviteMode !== 'INVITE_ONLY',
  };
};

const INIT_ERRORS = {
  date: [],
  time: [],
  duration: [],
  capacity: [],
  title: [],
  description: [],
};
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FlexOne = styled.View`
  flex: 1; /* full height/width */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class EditGameForm extends React.PureComponent {
  constructor(props) {
    super(props);

    INIT_STATE = getInitState(props);

    this.state = {
      ...cloneDeep(INIT_STATE),
      errors: cloneDeep(INIT_ERRORS),
      // Keep track of field position in order to 'scroll to' on error
      offsetY: Object.keys(INIT_ERRORS).reduce((output, key) => (
        { ...output, [key]: 0 }
      ), {}),
    };

    // console.log('STATE', this.state);
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

  handleLayout = ({ fieldName, nativeEvent }) => {
    const { offsetY } = this.state;

    this.setState({
      offsetY: {
        ...offsetY,
        [fieldName]: nativeEvent.layout.y,
      },
    });
  }

  handleChange = ({ fieldName, value }) => {
    const { errors } = this.state;
    // Update value and clear errors for the given field
    this.setState({
      [fieldName]: value,
      errors: ErrorHandling.clearErrors(errors, fieldName),
    });
  }

  validateFields = ({
    date,
    time,
    duration,
    capacity,
    title,
    description,
  }) => {
    // Initialize errors
    const errors = cloneDeep(INIT_ERRORS);

    // Sanitize input
    const _title = title && title.trim(); // eslint-disable-line no-underscore-dangle

    if (!_title) {
      errors.title.push('editGameForm.fields.title.errors.required');
    } else if (_title.length > TITLE_MAX_CHARS) {
      errors.title.push('editGameForm.fields.title.errors.tooLong');
    }

    if (!date) {
      errors.date.push('editGameForm.fields.date.errors.required');
    }

    if (!time) {
      errors.time.push('editGameForm.fields.time.errors.required');
    }

    if (date && time) {
      const hours = time.hours();
      const minutes = time.minutes();
      const dateTime = date.clone().add(hours, 'hours').add(minutes, 'minutes');
      const now = moment.utc();
      const diff = dateTime.diff(now, 'seconds');

      if (diff < 0) {
        errors.time.push('editGameForm.fields.time.errors.pastDateTime');
      }
    }

    if (!duration) {
      errors.duration.push('editGameForm.fields.duration.errors.required');
    }

    // Sanitize input
    const _description = description && description.trim(); // eslint-disable-line no-underscore-dangle

    if (_description.length > DESCRIPTION_MAX_CHARS) {
      errors.description.push('editGameForm.fields.description.errors.tooLong');
    }

    // const attendees = getAttendees(game.attendees);
    const { activity } = this.props;
    const { attendeesIds } = activity;

    if (capacity && attendeesIds.length > capacity) {
      errors.capacity.push('editGameForm.fields.capacity.errors.noFit');
    }

    return errors;
  };

  handleSubmit = () => {
    const {
      activity,
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
      // Scroll to first error field
      const { offsetY } = this.state;
      const firstErrorKey = ErrorHandling.getFirstError(errors).key; // 'title', 'description'
      const y = parseInt(offsetY[firstErrorKey], 10);
      if (this.scroller) {
        this.scroller.scrollTo({ x: 0, y });
      }
      // Pass event up to parent component. onClientErrorHook will set 'disabled'
      // value back to 'false' so that the user can re-submit the form
      onClientErrorHook();
      return;
    }

    // Pass event up to parent component. onSuccessHook 'disabled'
    // value back to 'false' so that the user can re-submit the form
    onSuccessHook({ _id: activity._id, ...pick(this.state, Object.keys(INIT_STATE)) });
  }

  render() {
    const { disabled } = this.props;
    const {
      sport,
      date,
      time,
      duration,
      capacity,
      spot,
      title,
      description,
      // isPublic,
      errors,
    } = this.state;

    // Apply translation and concatenate field errors (string)
    const titleErrors = ErrorHandling.getFieldErrors(errors, 'title', I18n.t);
    const dateErrors = ErrorHandling.getFieldErrors(errors, 'date', I18n.t);
    const timeErrors = ErrorHandling.getFieldErrors(errors, 'time', I18n.t);
    const durationErrors = ErrorHandling.getFieldErrors(errors, 'duration', I18n.t);
    const capacityErrors = ErrorHandling.getFieldErrors(errors, 'capacity', I18n.t);
    const descriptionErrors = ErrorHandling.getFieldErrors(errors, 'description', I18n.t);

    return (
      <FlexOne>
        <TopLayout ref={(scroller) => { this.scroller = scroller; }}>
          <Block
            midHeight
            onLayout={({ nativeEvent }) => { this.handleLayout({ fieldName: 'title', nativeEvent }); }}
          >
            <TextField
              testID="editGameFieldName"
              label={I18n.t('editGameForm.fields.title.label')}
              value={title}
              error={titleErrors}
              placeholder={I18n.t('editGameForm.fields.title.placeholder')}
              size="ML"
              disabled={disabled}
              // multiline
              onChangeText={(value) => { this.handleChange({ fieldName: 'title', value }); }}
            />
          </Block>
          <Block
            midHeight
            bgColor="silver"
          >
            <TextField
              label={I18n.t('editGameForm.fields.sport.label')}
              value={I18n.t(sport)}
              size="ML"
              disabled // always disabled
              onChangeText={() => {}}
            />
          </Block>
          <Block
            midHeight
            onLayout={({ nativeEvent }) => { this.handleLayout({ fieldName: 'date', nativeEvent }); }}
          >
            <DatePickerField
              testID="editGameFieldDate"
              label={I18n.t('editGameForm.fields.date.label')}
              value={date || moment.utc()}
              error={dateErrors}
              size="ML"
              disabled={disabled}
              theme="transparent"
              dateFormat="DD/MM/YYYY"
              fullWidth
              onChange={(value) => { this.handleChange({ fieldName: 'date', value }); }}
            />
          </Block>
          <Divider />
          <Row onLayout={({ nativeEvent }) => { this.handleLayout({ fieldName: 'time', nativeEvent }); }}>
            <FlexOne>
              <Block midHeight>
                <TimePickerField
                  testID="editGameFieldTime"
                  label={I18n.t('editGameForm.fields.time.label')}
                  value={time || moment.utc()}
                  error={timeErrors}
                  size="ML"
                  disabled={disabled}
                  theme="transparent"
                  fullWidth
                  onChange={(value) => { this.handleChange({ fieldName: 'time', value }); }}
                />
              </Block>
            </FlexOne>
            <Divider row />
            <FlexOne>
              <Block
                midHeight
                onLayout={({ nativeEvent }) => { this.handleLayout({ fieldName: 'duration', nativeEvent }); }}
              >
                <DurationPickerField
                  testID="editGameFieldDuration"
                  label={I18n.t('editGameForm.fields.duration.label')}
                  value={duration}
                  error={durationErrors}
                  size="ML"
                  disabled={disabled}
                  theme="transparent"
                  fullWidth
                  onChange={(value) => { this.handleChange({ fieldName: 'duration', value }); }}
                />
              </Block>
            </FlexOne>
          </Row>
          <Divider />
          <Block
            midHeight
            onLayout={({ nativeEvent }) => { this.handleLayout({ fieldName: 'capacity', nativeEvent }); }}
          >
            <CapacityPickerField
              testID="editGameFieldCapacity"
              label={I18n.t('editGameForm.fields.capacity.label')}
              value={capacity}
              error={capacityErrors}
              size="ML"
              disabled={disabled}
              theme="transparent"
              fullWidth
              onChange={(value) => { this.handleChange({ fieldName: 'capacity', value }); }}
            />
          </Block>
          <Divider />
          <Block>
            <SpotPickerField
              value={spot}
              sport={sport}
              disabled={disabled}
              onChange={(value) => { this.handleChange({ fieldName: 'spot', value }); }}
            />
          </Block>
          <Divider />
          <Block
            midHeight
            onLayout={({ nativeEvent }) => { this.handleLayout({ fieldName: 'description', nativeEvent }); }}
          >
            <TextField
              testID="editGameFieldDescription"
              label={I18n.t('editGameForm.fields.description.label')}
              value={description}
              theme="black"
              error={descriptionErrors}
              disabled={disabled}
              characterRestriction={DESCRIPTION_MAX_CHARS}
              multiline
              placeholder={I18n.t('editGameForm.fields.description.placeholder')}
              onChangeText={(value) => { this.handleChange({ fieldName: 'description', value }); }}
            />
          </Block>
          <Divider />
          {/* <Block>
            <SwitchWithText
              label={I18n.t('editGameForm.fields.isPublic.label')}
              value={!isPublic}
              disabled={disabled}
              onChange={(value) => { this.handleChange({ fieldName: 'isPublic', value: !value }); }}
            />
          </Block> */}
        </TopLayout>
        <BottomLayout>
          <RaisedButton
            testID="editGameSubmitButton"
            variant="default"
            label={I18n.t('editGameForm.btnLabel')}
            disabled={disabled}
            onPress={this.handleSubmit}
          />
        </BottomLayout>
      </FlexOne>
    );
  }
}

EditGameForm.propTypes = {
  activity: propType(activityDetailsFragment).isRequired,
  disabled: PropTypes.bool,
  errors: PropTypes.object, // eslint-disable-line
  onBeforeHook: PropTypes.func,
  onClientCancelHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

EditGameForm.defaultProps = {
  disabled: false,
  errors: null,
  onBeforeHook: () => {},
  onClientCancelHook: () => {},
  onClientErrorHook: () => {},
  onSuccessHook: () => {},
};

export default EditGameForm;
