const debug = require('debug')('cuddlebot:plugin-help');
const {command} = require('./common');
const _ = require('lodash');
const version = require('../package.json').version;

const Help = {
  name: "Help",
  docs: {
    'help': 'Get bot help',
  },
  
  actions: [
    [command('help'), function (message, bot) {
      message.reply(`⟹ cuddlebot v${version} ⟸\n***plugins***:\n`
      + this.plugins.map(p => {
        return `⟿ **${p.name}**\n`
          + (p.desc ? p.desc + '\n' : '')
          + _.map(p.docs, (d, c) => `   » **${this.config.prefix}${c}** ➩ ${d}`).join('\n');
        }).join('\n')
      );
    }]
  ]
};

module.exports = Help;
