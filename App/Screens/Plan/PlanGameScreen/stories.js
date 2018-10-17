import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import Colors from '../../../Themes/Colors';
import Block from '../../../Components/Common/Block';
import Row from '../../../Components/Common/Row';
import DatePickerField from '../../../Components/Common/DatePickerField';
import DurationPickerField from '../../../Components/Common/DurationPickerField';
import PlanGameScreen from '.';

const dummyNavigation = {
  goBack: () => {},
  navigate: () => {},
};

storiesOf('Screens.Plan.PlanGameScreen', module)
  .add('PlanGameScreen', () => (
    <PlanGameScreen navigation={dummyNavigation} />
  ))
  .add('PlanGameScreen inputs', () => (
    <Block bgColor={Colors.primaryGreen}>
      <Row>
        <View style={{ flex: 1 }}>
          <DatePickerField
            label="I'm the label"
            error="I'm the error"
            // value="I'm the value"
          />
        </View>
        <View style={{ flex: 1 }}>
          <DurationPickerField
            label="I'm the label"
            error="I'm the error"
            value={90}
          />
        </View>
      </Row>
    </Block>
  ));

    /* .add('PlanGameScreen inputs no errors or labels', () => (
    <Block bgColor={Colors.primaryGreen}>
      <Row>
        <DatePickerField />
        <View style={{ flexGrow: 1 }}>
          <DurationPickerField />
        </View>
      </Row>
    </Block>
  )) */