import CookiesService from 'ember-cookies/services/cookies';
import IntlService from 'ember-intl/services/intl';
import KeyboardService from 'ember-keyboard/services/keyboard';

import Router from './router';

export function normalizePodModules(
  glob: Record<string, unknown>,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(glob)) {
    const path = key
      .replace(/^\.\//, '')
      .replace(/\.\w+$/, '')
      .replace(/^routes\//, '');

    if (path.endsWith('/route')) {
      out[`routes/${path.slice(0, -'/route'.length)}`] = value;
    } else if (path.endsWith('/template')) {
      out[`templates/${path.slice(0, -'/template'.length)}`] = value;
    }
  }

  return out;
}

// templates and don't need registration.
export const modules: Record<string, unknown> = {
  './router': { default: Router },
  'services/intl': { default: IntlService },
  'services/cookies': { default: CookiesService },
  'services/keyboard': { default: KeyboardService },
  ...normalizePodModules(
    import.meta.glob('./routes/**/*.{gts,gjs,ts,js}', { eager: true }),
  ),
  ...import.meta.glob('./services/**/*.{ts,js}', { eager: true }),
};
