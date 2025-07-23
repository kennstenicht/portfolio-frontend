import { defineConfig } from 'vite';
import { extensions, classicEmberSupport, ember } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';
import { staticJsonApi } from './static-json-api.js';

export default defineConfig({
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
});
