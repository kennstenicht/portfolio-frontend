'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { Webpack } = require('@embroider/webpack');
const path = require('path');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    babel: {
      sourceMaps: 'inline',
    },
    emberData: {
      deprecations: {
        DEPRECATE_STORE_EXTENDS_EMBER_OBJECT: false,
      },
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  function isProduction() {
    return EmberApp.env() === 'production';
  }

  // return app.toTree();
  return require('@embroider/compat').compatBuild(app, Webpack, {
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    staticHelpers: true,
    staticModifiers: true,
    staticComponents: true,
    // splitAtRoutes: [
    //   'pages',
    //   'pages.show',
    //   'pages.home',
    //   'projects',
    //   'projects.index',
    //   'projects.show',
    //   'error'
    // ],
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
    packagerOptions: {
      publicAssetURL: '/',
      cssLoaderOptions: {
        sourceMap: !isProduction(),
        modules: {
          getLocalIdent: function (
            context,
            localIdentName,
            localName,
            options,
          ) {
            if (isProduction()) {
              return;
            }

            if (!options.context) {
              options.context = context.rootContext;
            }

            const componentPath = path
              .relative(options.context, context.resourcePath)
              .replace(/\\/g, '/')
              .replace('assets/styles/', '')
              .replace('components', 'c')
              .replace('objects', 'o')
              .replace('utils', 'u')
              .split('/');

            const filename = componentPath.pop();
            const name = filename.substring(0, filename.indexOf('.'));

            if (name !== 'styles') {
              componentPath.push(name);
            }

            let blockClass = componentPath.join('-');

            if (localName.startsWith('scope')) {
              return `${blockClass}${localName.replace('scope', '')}`;
            }

            return `${blockClass}__${localName}`;
          },
          localIdentName: '[sha512:hash:base64:5]',
          mode: (resourcePath) => {
            const hostAppLocation = 'node_modules/.embroider/rewritten-app';

            return resourcePath.includes(hostAppLocation) ? 'local' : 'global';
          },
        },
      },
      webpackConfig: {
        devtool: 'source-map',
        module: {
          rules: [
            {
              test: /(node_modules\/\.embroider\/rewritten-app\/)(.*\.module.css)$/i,
              use: [
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: !isProduction(),
                    postcssOptions: {
                      config: './postcss.config.js',
                    },
                  },
                },
              ],
            },
          ],
        },
      },
    },
  });
};
