'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'portfolio',
    podModulePrefix: 'portfolio/routes',
    environment,
    rootURL: '/',
    locationType: 'auto',

    company: {
      name: 'Christoph Wiedenmann'
    },

    fastboot: {
      hostWhitelist: [
        'wiedenmann.io',
        'staging.wiedenmann.io',
        /^localhost:\d+$/,
        /^192\.168\.[0-9.]*:\d+$/
      ],
    },

    // Tracking
    metricsAdapters: [
      {
        name: 'GoogleTagManager',
        environments: ['development', 'production'],
        config: {
          id: 'GTM-MXZ7NKL',
          // Use `analytics_debug.js` in development
          debug: environment === 'development',
          // Use verbose tracing of GA events
          trace: environment === 'development',
          // Ensure development env hits aren't sent to GA
          sendHitTask: environment !== 'development',
        }
      },
    ],

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
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
