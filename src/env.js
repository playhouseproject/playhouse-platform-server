const path = require('path');

const dotenv = require('dotenv');

if (process.env['NODE_ENV'] == null) {
  process.env['NODE_ENV'] = 'production';
}

module.exports = {loadEnv};

function loadEnv() {
  dotenv.config({
    path: path.resolve(__dirname, `../.env.${process.env['NODE_ENV']}.local`)
  });
  dotenv.config({
    path: path.resolve(__dirname, '../.env.local')
  });
  dotenv.config({
    path: path.resolve(__dirname, `../.env.${process.env['NODE_ENV']}`)
  });
  dotenv.config({
    path: path.resolve(__dirname, '../.env')
  });
}
