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

if (environment === 'test') {
  // Testem prefers this...
  config.locationType = 'none';

  // keep test console output quieter
  config.APP.LOG_ACTIVE_GENERATION = false;
  config.APP.LOG_VIEW_LOOKUPS = false;

  config.APP.rootElement = '#ember-testing';
  config.APP.autoboot = false;
}

export default config;
