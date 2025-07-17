module.exports = {
  plugins: [
    require('postcss-preset-env')({
      features: { 'nesting-rules': true, 'has-pseudo-class': true },
    }),
    require('autoprefixer'),
    require('cssnano'),
  ],
};
