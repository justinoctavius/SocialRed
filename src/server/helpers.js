const moment = require('moment');
const helpers = {};

helpers.timeAgo = timestamp => moment(timestamp).startOf('minutes').fromNow();

module.exports = helpers;