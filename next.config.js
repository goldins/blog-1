// eslint-disable-next-line
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins(
  [],
  {
    target: 'serverless'
  }
);
