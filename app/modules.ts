import AnimatedBeacon from 'ember-animated/components/animated-beacon';
import AnimatedContainer from 'ember-animated/components/animated-container';
import AnimatedEach from 'ember-animated/components/animated-each';
import AnimatedIf from 'ember-animated/components/animated-if';
import AnimatedOrphans from 'ember-animated/components/animated-orphans';
import AnimatedValue from 'ember-animated/components/animated-value';
import EaListElement from 'ember-animated/components/ea-list-element';
import MotionService from 'ember-animated/services/-ea-motion';
import CookiesService from 'ember-cookies/services/cookies';
import IntlService from 'ember-intl/services/intl';
import KeyboardService from 'ember-keyboard/services/keyboard';

import Router from './router';

// The strict resolver looks modules up by their flat name (e.g. "routes/page"
// for route:page, "templates/projects/show" for the projects.show template).
// This app keeps its routes and templates in pod folders under `pages/`, so we
// translate the glob keys into the `routes/*` and `templates/*` paths the
// resolver expects. Anything that isn't a route or template is ignored.
export function normalizePodModules(
  glob: Record<string, unknown>,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(glob)) {
    const path = key
      .replace(/^\.\//, '')
      .replace(/\.\w+$/, '')
      .replace(/^pages\//, '');

    if (path.endsWith('/route')) {
      out[`routes/${path.slice(0, -'/route'.length)}`] = value;
    } else if (path.endsWith('/template')) {
      out[`templates/${path.slice(0, -'/template'.length)}`] = value;
    }
  }

  return out;
}

// The resolver module registry. Things resolved by name need to live here: the
// router, routes, route templates, the services referenced via `@service`, and
// the ember-animated components it invokes by name from its own templates. The
// app's own components, helpers, and modifiers are imported directly in
// templates and don't need registration.
export const modules: Record<string, unknown> = {
  './router': { default: Router },
  // Addon services that are injected by name (`@service …`) must be registered
  // explicitly for the strict resolver — the app's own services come from the
  // glob below, but addon services do not.
  'services/intl': { default: IntlService },
  'services/cookies': { default: CookiesService },
  'services/-ea-motion': { default: MotionService },
  'services/keyboard': { default: KeyboardService },
  // ember-animated invokes these components by name from its internal
  // templates, so the strict resolver needs them registered.
  'components/animated-beacon': { default: AnimatedBeacon },
  'components/animated-container': { default: AnimatedContainer },
  'components/animated-each': { default: AnimatedEach },
  'components/animated-if': { default: AnimatedIf },
  'components/animated-orphans': { default: AnimatedOrphans },
  'components/animated-value': { default: AnimatedValue },
  'components/ea-list-element': { default: EaListElement },
  ...normalizePodModules(
    import.meta.glob('./pages/**/*.{gts,gjs,ts,js}', { eager: true }),
  ),
  ...import.meta.glob('./services/**/*.{ts,js}', { eager: true }),
};
