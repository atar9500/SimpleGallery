/**
 * @format
 */

import {AppRegistry} from 'react-native';

// eslint-disable-next-line @welldone-software/modules-engagement
import App from '~/app';

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
