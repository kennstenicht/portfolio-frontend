interface AppConfig {
  modulePrefix: string;
  environment: string;
  rootURL: string;
  locationType: string;
  host: string;
  siteName: string;
  EmberENV: Record<string, unknown>;
  APP: Record<string, unknown>;
}

// Vite inlines the build mode at compile time: 'production' for `vite build`,
// 'development' for the dev server, and 'test' for `vite build --mode test`.
const environment = import.meta.env.MODE;

const config: AppConfig = {
  modulePrefix: 'portfolio',
  environment,
  rootURL: '/',
  locationType: 'history',

  // Canonical origin used to build absolute URLs in meta tags.
  host: 'https://wiedenmann.cc',

  // Brand name used for the document title suffix and the web-app title.
  siteName: 'wiedenmann.cc',

  EmberENV: {
    EXTEND_PROTOTYPES: false,
    FEATURES: {
      EMBER_NATIVE_DECORATOR_SUPPORT: true,
    },
  },

  APP: {},
};

// Test-page settings (autoboot, rootElement, locationType, the LOG_* flags)
// deliberately do not live here: this file only sees the build mode, and the dev
// server always builds `development`, so a mode check would miss the test page
// served at /tests. `tests/test-helper.ts` applies them instead — it is loaded by
// the test page and nothing else.

export default config;
