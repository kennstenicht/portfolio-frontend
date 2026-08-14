import { buildMacros } from '@embroider/macros/babel';
import { setConfig } from '@warp-drive/core/build-config';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Configure the @embroider/macros global config so WarpDrive's build-time
// macros (getGlobalConfig().WarpDrive.*) resolve. This replaces the
// `setConfig(app, __dirname, …)` call that used to live in ember-cli-build.js.
const Macros = buildMacros({
  configure: (config) => {
    setConfig(config, {
      // this should be the most recent <major>.<minor> version for
      // which all deprecations have been fully resolved
      compatWith: '5.8',
    });
  },
});

export default {
  plugins: [
    [
      '@babel/plugin-transform-typescript',
      {
        allExtensions: true,
        onlyRemoveTypeImports: true,
        allowDeclareFields: true,
      },
    ],
    [
      'babel-plugin-ember-template-compilation',
      {
        enableLegacyModules: [
          'ember-cli-htmlbars',
          'ember-cli-htmlbars-inline-precompile',
          'htmlbars-inline-precompile',
        ],
        transforms: [...Macros.templateMacros],
      },
    ],
    [
      'module:decorator-transforms',
      {
        runtime: {
          import: fileURLToPath(
            import.meta.resolve('decorator-transforms/runtime-esm'),
          ),
        },
      },
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        absoluteRuntime: dirname(fileURLToPath(import.meta.url)),
        useESModules: true,
        regenerator: false,
      },
    ],
    ['ember-concurrency/async-arrow-task-transform'],
    ...Macros.babelMacros,
  ],

  generatorOpts: {
    compact: false,
  },
};
