const env = process.env.EMBER_ENV || 'development';

const plugins = [
  require('postcss-nested'),
  require('autoprefixer'),
  require('postcss-advanced-variables')({
    importPaths: ['app/assets', 'node_modules'],
  }),
];

if (env === 'production') {
  plugins.push(
    require('cssnano')({
      preset: 'default',
    })
  );
}

module.exports = {
  plugins,
};
