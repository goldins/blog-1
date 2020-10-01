// eslint-disable-next-line
const withPlugins = require('next-compose-plugins');
// eslint-disable-next-line
const optimizedImages = require('next-optimized-images');

module.exports = withPlugins(
  [
    [
      optimizedImages,
      {
        /* config for next-optimized-images */
      }
    ]

    // your other plugins here
  ],
  {
    target: 'serverless'
  }
);
