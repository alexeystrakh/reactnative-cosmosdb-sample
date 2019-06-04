/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Buffer } from 'buffer';

window.global = window;
if (!window.global.Buffer) {
  window.global.Buffer = window.global.Buffer || Buffer;
}

AppRegistry.registerComponent(appName, () => App);
