import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { start as qunitStart, setupEmberOnerrorValidation } from 'ember-qunit';
import { setup } from 'qunit-dom';

import Application from 'portfolio/app';
import config from 'portfolio/config/environment';

export function start() {
  setApplication(Application.create(config.APP));

  setup(QUnit.assert);
  setupEmberOnerrorValidation();
  qunitStart();
}
