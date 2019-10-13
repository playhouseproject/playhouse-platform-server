const express = require('express');

const {loadEnv} = require('./env');

const EventLogger = require.main.require('./services/event-logger');

loadEnv();

const services = {};
services.eventLogger = new EventLogger(services);

const app = express();

app.listen(process.env['HTTP_PORT'], () => {
  services.eventLogger.log('0/0', null, true);
});
