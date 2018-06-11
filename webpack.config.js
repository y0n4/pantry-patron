var path = require('path');
var source = path.join(__dirname, './client/src');
var destination = path.join(__dirname, './client/dist');

module.exports = {
  entry: `${source}/index.jsx`,
  output : {
    filename: 'bundle.js',
    path: destination
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: source,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ],
  }
};