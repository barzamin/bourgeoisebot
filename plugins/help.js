const debug = require('debug')('cuddlebot:plugin-help');
const {command} = require('./common');
const _ = require('lodash');

const Help = {
  name: "Help",
  docs: {
    'help': 'Get bot help',
  },
  
  actions: [
    [command('!help'), function (message, bot) {
      message.reply(`⟹ cuddlebot v1.0-alpha ⟸\n***plugins***:\n`
      + this.plugins.map(p => {
        return `⟿ **${p.name}**\n`
          + _.map(p.docs, (d, c) => `   » **${this.config.prefix}${c}** ➩ ${d}`);
        }).join('\n')
      );
    }]
  ]
};

module.exports = Help;
