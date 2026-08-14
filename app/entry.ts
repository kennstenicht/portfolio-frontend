import { bootRehydrated } from 'vite-ember-ssr/client';

import Application from './app';
import config from './config/environment';

// Client entry. `bootRehydrated` rehydrates onto the prerendered DOM when one
// is present (production SSG) and boots normally otherwise (dev). A plain
// `Application.create()` here would render a second, interactive copy alongside
// the static prerendered one.
bootRehydrated(Application, config);
