import setupInspector from '@embroider/legacy-inspector-support/ember-source-4.12';
import { importSync, isDevelopingApp, macroCondition } from '@embroider/macros';
import Application from 'ember-strict-application-resolver';

import '@warp-drive/ember/install';

import { modules } from './modules';

import './assets/styles/styles.css';

if (macroCondition(isDevelopingApp())) {
  importSync('./deprecation-workflow');
}

export default class App extends Application {
  modules = modules;
  inspector = setupInspector(this);
}
