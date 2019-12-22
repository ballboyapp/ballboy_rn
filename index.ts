import Constants from 'expo-constants';
import { registerRootComponent } from 'expo';
import './src/prototypes';
import './src/I18n/I18n';
import App from './src/App';
import StorybookUI from './storybook';

const { isStorybook } = Constants.manifest.extra;

registerRootComponent(isStorybook ? StorybookUI : App);