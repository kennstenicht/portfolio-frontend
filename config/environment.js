'use strict';

module.exports = function (environment) {
  const ENV = {
    modulePrefix: 'portfolio',
    podModulePrefix: 'portfolio/pages',
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
        // Here you can enable experimental features on an ember canary build
        EMBER_NATIVE_DECORATOR_SUPPORT: true,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
