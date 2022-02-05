module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.pdf$/i,
      use: 'base64-inline-loader',
    });
    return config;
  },
};
