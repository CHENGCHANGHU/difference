const path = require('path');

// console.log(process.argv);
console.log('mode:', process.env.mode);
console.log('minimize:', process.env.minimize);

function getWebpackConfig () {
  return {
    mode: process.env.mode,
    optimization: {
      minimize: JSON.parse(process.env.minimize),
    },
    entry: {
      index: path.join(__dirname, 'src', 'index.js'),
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
      globalObject: 'typeof self === \'undefined\' ? this : self',
      library: {
        name: 'Difference',
        type: 'umd',
      },
    },
  };
}

module.exports = getWebpackConfig();
