import { defineConfig } from 'vite';
import { extensions, classicEmberSupport, ember } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';
import path from 'path';
import { staticJsonApi } from './static-json-api.js';
import crypto from 'crypto';

function hash(input) {
  const hash = crypto.createHash('sha256').update(input).digest('hex');

  return `_${hash.slice(0, 6)}`;
}

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    plugins: [
      staticJsonApi({
        sourceDir: 'api',
        outputDir: 'public/api',
        resources: [
          {
            type: 'pages',
          },
          {
            type: 'projects',
          },
        ],
      }),
      classicEmberSupport(),
      ember(),
      // extra plugins here
      babel({
        babelHelpers: 'runtime',
        extensions,
      }),
    ],
    css: {
      modules: {
        generateScopedName: function (localName, filePath) {
          const relativePath = path.dirname(path.relative(__dirname, filePath));

          const fileName = path.basename(filePath, path.extname(filePath));
          const moduleName = fileName.substring(0, fileName.indexOf('.'));

          let blockClass = relativePath
            .replace(/\\/g, '/')
            .replace('app/', '')
            .replace('components', 'c')
            .replace('pages', 'c-pages')
            .replace('assets/styles/objects', 'o')
            .replace('assets/styles/utils', 'u')
            .replaceAll('/', '-');

          if (moduleName !== 'styles') {
            blockClass += `-${moduleName}`;
          }

          let className = `${blockClass}__${localName}`;

          if (localName.startsWith('scope')) {
            className = `${blockClass}${localName.replace('scope', '')}`;
          }

          return isProd ? hash(className) : className;
        },
      },
    },
  };
});
