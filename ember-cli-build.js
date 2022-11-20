'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { Webpack } = require('@embroider/webpack');
const path = require('path');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    babel: {
      sourceMaps: 'inline',
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
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
    packagerOptions: {
      publicAssetURL: '/',
      cssLoaderOptions: {
        sourceMap: isProduction() === false,
        modules: {
          mode: 'local',
          localIdentName: '[sha512:hash:base64:5]',
          getLocalIdent: function(context, localIdentName, localName, options) {
            if (isProduction()) {
              return
            }

            if (
              new RegExp(/^(?!.*[.]module.css$).*$|node_modules/i).test(context.resourcePath)
            ) {
              return localName;
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
          }
        },
      },
      webpackConfig: {
        devtool: 'source-map',
        module: {
          rules: [
            {
              // When webpack sees an import for a CSS files
              test: /\.css$/i,
              exclude: /node_modules/,
              use: [
                {
                  // use the PostCSS loader addon
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: isProduction() === false,
                    postcssOptions: {
                      config: './postcss.config.js',
                    },
                  },
                },
              ],
            },
          ],
        },
      }
    }
  });
};
