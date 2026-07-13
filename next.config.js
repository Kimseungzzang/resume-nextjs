/* eslint-disable */
const withImages = require('next-images');
const { homepage } = require('./package.json');

const { NODE_ENV } = process.env;

const subPath = (() => {
  if (NODE_ENV === 'production' && homepage) {
    try {
      console.log('> Detected homepage url in package.json');
      const { pathname } = new URL(homepage);
      if (pathname !== '/') {
        const trimmed = pathname.replace(/\/$/, '');
        console.log(`> Apply \'${trimmed}\' to assetPrefix/basePath(subPath)`);
        return trimmed;
      }
      return '';
    } catch {
      console.log('> Can not parse homepage URL not apply assetPrefix/basePath(subPath)');
      return '';
    }
  }
  return '';
})();

module.exports = withImages({
  basePath: subPath,
  assetPrefix: subPath,
});
// withCSS({
// webpack: config => {
//   config.resolve.alias['@'] = __dirname;
//   return config;
// }
// }),
