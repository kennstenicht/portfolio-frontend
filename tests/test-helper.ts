import '@warp-drive/ember/install';

import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { start as qunitStart, setupEmberOnerrorValidation } from 'ember-qunit';
import { setup } from 'qunit-dom';

import Application from 'portfolio/app';
import config from 'portfolio/config/environment';

export function start() {
  // These belong to the test page, not to a build mode: the dev server always
  // builds `development`, so a mode check in `app/config/environment.ts` would
  // miss the page served at /tests. Without `autoboot: false` the application
  // boots itself into <body> and renders the real app over the QUnit UI (routed
  // from the /tests URL, so the error page). `locationType` has to be set on the
  // config because the router reads it from there, so all of them are applied
  // the same way — on the config, before the application is created.
  config.locationType = 'none';
  config.APP.autoboot = false;
  config.APP.rootElement = '#ember-testing';
  config.APP.LOG_ACTIVE_GENERATION = false;
  config.APP.LOG_VIEW_LOOKUPS = false;

  setApplication(Application.create(config.APP));

  setup(QUnit.assert);
  setupEmberOnerrorValidation();
  qunitStart();
}
