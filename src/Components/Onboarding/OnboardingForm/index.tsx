import React from 'react';
import PropTypes from 'prop-types';
import { Keyboard, ScrollView } from 'react-native';
// import firebase from 'react-native-firebase';
import styled from 'styled-components/native';
import cloneDeep from 'lodash/cloneDeep';
import pick from 'lodash/pick';
import { WINDOW_WIDTH } from '../../../constants';
import I18n from '../../../I18n';
// import Images from '../../../Themes/Images';
// import ImageBackground from '../../../Backgrounds/ImageBackground';
import Footer from '../../Common/DarkFooter';
import CitySlide, { INIT_STATE as CITY_INIT_STATE } from '../CitySlide';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const SLIDES = [
  // {
  //   id: 'welcomeSlide',
  //   Comp: () => (
  //     <ImageBackground
  //       title={I18n.t('onboardingScreen.welcome.title')}
  //       text={I18n.t('onboardingScreen.welcome.text')}
  //       image={Images.illustrationWizard1}
  //     />
  //   ),
  // },
  // {
  //   id: 'joinGameSlide',
  //   Comp: () => (
  //     <ImageBackground
  //       title={I18n.t('onboardingScreen.joinGame.title')}
  //       text={I18n.t('onboardingScreen.joinGame.text')}
  //       image={Images.illustrationWizard2}
  //     />
  //   ),
  // },
  // {
  //   id: 'planGameSlide',
  //   Comp: () => (
  //     <ImageBackground
  //       title={I18n.t('onboardingScreen.planGame.title')}
  //       text={I18n.t('onboardingScreen.planGame.text')}
  //       image={Images.illustrationWizard3}
  //     />
  //   ),
  // },
  {
    id: 'citySlide',
    Comp: CitySlide,
    requiredFields: CitySlide.requiredFields,
  },
];

const INIT_STATE = {
  ...cloneDeep(CITY_INIT_STATE),
};
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FlexOne = styled.View`
  flex: 1; /* full height */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class OnboardingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      curSlide: 0,
      ...cloneDeep(INIT_STATE),
    };

    // console.log('INIT STATE', this.state);
  }

  handleScroll = (evt) => {
    const nextSlide = Math.round(evt.nativeEvent.contentOffset.x / WINDOW_WIDTH);
    this.setState({ curSlide: nextSlide });
  }

  get disableNext() {
    const { curSlide } = this.state;

    // Get required fields for the current slide
    const { requiredFields } = SLIDES[curSlide];

    // Disable next btn (return 'true') if at least on of the required fields isn't set
    if (requiredFields) {
      for (let i = 0; i < requiredFields.length; i += 1) {
        const fieldName = requiredFields[i];
        if (!this.state[fieldName]) { // eslint-disable-line
          return true;
        }
      }
    }

    // Enable btn otherwise (all required fields are set)
    return false;
  }

  get buttonNextText() {
    const { curSlide } = this.state;
    return curSlide < SLIDES.length - 1 ? 'onboardingScreen.nextBtnLabel' : 'onboardingScreen.lastBtnLabel';
  }

  handleNext = async () => {
    Keyboard.dismiss();

    const { curSlide } = this.state;

    // firebase.analytics().logEvent(`onboarding_footer_next_btn_press_idx_${curSlide}`);

    // If it's NOT the last slide, slide forward one position
    if (curSlide !== SLIDES.length - 1) {
      // refs are null when doing shallow tests
      if (this.swiper) {
        this.swiper.scrollTo({ x: (curSlide + 1) * WINDOW_WIDTH });
      }
      return;
    }

    // Otherwise, gather input field values and pass event up to parent component
    const {
      onBeforeHook,
      onClientCancelHook,
      // onClientErrorHook,
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

    // Pass event up to parent component
    onSuccessHook(pick(this.state, Object.keys(INIT_STATE)));
  }

  handleChange = ({ fieldName, value }) => {
    this.setState({ [fieldName]: value });
  }

  render() {
    const { disabled } = this.props;
    const { curSlide, ...rest } = this.state;

    return (
      <FlexOne>
        <ScrollView
          ref={(swiper) => { this.swiper = swiper; }}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={this.handleScroll}
        >
          {SLIDES.map(({ id, Comp }) => (
            <FlexOne key={id} style={{ width: WINDOW_WIDTH }}>
              <Comp
                onChange={this.handleChange}
                // Pass down all state values: location, sports, etc.
                {...rest}
              />
            </FlexOne>
          ))}
        </ScrollView>
        <Footer
          numPages={SLIDES.length}
          currentPage={curSlide}
          onNext={this.handleNext}
          disableNext={this.disableNext || disabled}
          buttonNextText={I18n.t(this.buttonNextText)}
          showBack={false}
        />
      </FlexOne>
    );
  }
}

OnboardingForm.propTypes = {
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientCancelHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

OnboardingForm.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onClientCancelHook: () => {},
  onSuccessHook: () => {},
};

export default OnboardingForm;

/*
import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../I18n';
import Images from '../../../Themes/Images';
import ScreenSlider from '../../../Components/Common/ScreenSlider';
import OnboardingSlide from '../../../Components/Onboarding/OnboardingSlide';
import globalRefs from '../../../globalRefs';

const data = [
  {
    title: I18n.t('onboardingScreen.hiSporter.title'),
    text: I18n.t('onboardingScreen.hiSporter.text'),
    image: Images.illustrationWizard1,
  },
  {
    title: I18n.t('onboardingScreen.joinGame.title'),
    text: I18n.t('onboardingScreen.joinGame.text'),
    image: Images.illustrationWizard2,
  },
  {
    title: I18n.t('onboardingScreen.planGame.title'),
    text: I18n.t('onboardingScreen.planGame.text'),
    image: Images.illustrationWizard3,
  },
];

class OnboardingScreen extends React.Component {
  componentDidMount() {
    globalRefs.OnBoardingScreen = this;
    // super.componentDidMount();
  }

  render() {
    const { onSuccessHook } = this.props;
    return (
      <ScreenSlider
        data={data}
        style={{ flex: 1 }}
        renderItem={({ item }) => <OnboardingSlide {...item} />}
        footerText={(item, index) => I18n.t(index < data.length - 1 ? 'OnboardingScreen.nextBtnLabel' : 'OnboardingScreen.lastBtnLabel')}
        onDone={onSuccessHook}
      />
    );
  }
}

OnboardingScreen.propTypes = {
  onSuccessHook: PropTypes.func.isRequired,
};

export default OnboardingScreen;

*/
