module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/mariage/' : '/',
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      if (process.env.NODE_ENV === 'production') {
        args[0].minify.removeComments = false;
        args[0].minify.collapseWhitespace = false;
      }
      return args;
    });
  },
};
