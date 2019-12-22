import React from 'react';
import PropTypes from 'prop-types';
import { SPORTS } from '../../../constants';
import I18n from '../../../I18n';
import { TopLayout, BottomLayout } from '../../Layouts/FixedBottomLayout';
import Block from '../../Common/Block';
import Row from '../../Common/Row';
import Divider from '../../Common/Divider';
import Spacer from '../../Common/Spacer';
import Text from '../../Common/Text';
// import SliderWithText from '../../Common/SliderWithText';
import SwitchWithText from '../../Common/SwitchWithText';
import RaisedButton from '../../Common/RaisedButton';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class SpotsFilterForm extends React.PureComponent {
  constructor(props) {
    super(props);
    const { maxDistance, allSports, selectedSports } = props;
    this.state = { maxDistance, allSports, selectedSports };
  }

  handleDistanceChange = (maxDistance) => {
    this.setState({ maxDistance });
  }

  handleAllSportsChange = (allSports) => {
    this.setState({ allSports, selectedSports: [] });
  }

  handleSportChange = (sport) => {
    this.setState((prevState) => {
      // Check whether or not sport is already in the list of selected sports.
      const index = prevState.selectedSports.indexOf(sport);

      // If yes, remove it from the list; otherwise, add it.
      return {
        selectedSports: index !== -1 ? [
          ...prevState.selectedSports.slice(0, index),
          ...prevState.selectedSports.slice(index + 1),
        ] : [...prevState.selectedSports, sport],
        // Finally, update allSports switch
        allSports: false,
      };
    });
  }

  handleSubmit = () => {
    const { onBeforeHook, onClientCancelHook, onSuccessHook } = this.props;

    // Run before logic if provided and return on error. onBeforeHook will set the 'disabled'
    // value to 'true' so that the user cannot re-submit the form
    try {
      onBeforeHook();
    } catch (exc) {
      onClientCancelHook();
      return; // return silently
    }

    // Get field values
    const { maxDistance, allSports, selectedSports } = this.state;

    // Pass event up to parent component. onSuccessHook 'disabled'
    // value back to 'false' so that the user can re-submit the form
    onSuccessHook({ maxDistance, allSports, selectedSports });
  }

  render() {
    const { sports, disabled } = this.props;
    const { maxDistance, allSports, selectedSports } = this.state;

    return [
      <TopLayout key="top">
        {/* <Block>
          <SliderWithText
            minimumValue={0}
            maximumValue={20}
            value={maxDistance}
            onValueChange={this.handleDistanceChange}
            label={I18n.t('spotsFilterScreen.slider.label')}
            description={(
              <Row alignItems="flex-end">
                <Text size="SM" color="gray">
                  {I18n.t('spotsFilterScreen.slider.description')}
                </Text>
                <Spacer row size="S" />
                <Text size="SM" semibold>
                  {`${maxDistance.toFixed(1).toString().replace('.0', '')} KM`}
                </Text>
              </Row>
            )}
          />
        </Block>
        <Divider /> */}
        <Block>
          <SwitchWithText
            label={I18n.t('spotsFilterScreen.switch.allSports.label')}
            description={I18n.t('spotsFilterScreen.switch.allSports.description')}
            value={allSports}
            onChange={this.handleAllSportsChange}
          />
        </Block>
        <Divider />
        <Block>
          {sports.map((sport, index) => [
            <SwitchWithText
              key={sport}
              label={I18n.t(sport)}
              value={selectedSports.indexOf(sport) !== -1}
              onChange={() => { this.handleSportChange(sport); }}
            />,
            // Add spacer after every switch except for the last item
            index < sports.length - 1 && (
              <Spacer
                key={`spacer-${sport}`}
                size="XL"
              />
            ),
          ])}
        </Block>
      </TopLayout>,
      <BottomLayout key="bottom">
        <RaisedButton
          variant="default"
          label={I18n.t('spotsFilterScreen.btnLabel')}
          disabled={disabled}
          onPress={this.handleSubmit}
        />
      </BottomLayout>,
    ];
  }
}

// TODO: use filter props
SpotsFilterForm.propTypes = {
  sports: PropTypes.arrayOf(
    PropTypes.oneOf(Object.values(SPORTS)),
  ).isRequired,
  maxDistance: PropTypes.number.isRequired,
  allSports: PropTypes.bool.isRequired,
  selectedSports: PropTypes.arrayOf(
    PropTypes.oneOf(Object.values(SPORTS)),
  ).isRequired,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientCancelHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

SpotsFilterForm.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onClientCancelHook: () => {},
  onSuccessHook: () => {},
};

export default SpotsFilterForm;
