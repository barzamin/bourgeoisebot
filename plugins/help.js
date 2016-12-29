const debug = require('debug')('plugin-help');
const {command} = require('./common');

const Help = {
  name: "Help",
  
  actions: [
    [command('!help'), function (message, bot) {
      message.reply(`⟹ cuddlebot v1.0-alpha ⟸`);
    }]
  ]
};

module.exports = Help;
