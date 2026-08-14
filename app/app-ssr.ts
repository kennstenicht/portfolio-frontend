import './ssr-polyfills';

import Application from 'ember-strict-application-resolver';

import '@warp-drive/ember/install';

import config from './config/environment';
import { modules } from './modules';

// Re-exporting `settled` lets the renderer await Ember's run loop, pending
// timers, and any registered test-waiters (WarpDrive requests) before capturing
// the DOM.
export { settled } from '@ember/test-helpers';

export default class App extends Application {
  modules = modules;
}

export function createSsrApp() {
  return App.create({ ...config.APP, autoboot: false });
}
