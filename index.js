const _ = require('lodash');
const debug = require('debug')('cuddlebot:main');
const Discord = require('discord.js');

const bot = new Discord.Client();
config = _.merge(require('./config.json'), require('./secrets.json'));

const Auth = require('./auth');
const util = require('./util');

auth = new Auth(config);
plugins = [require('./plugins/help'), require('./plugins/proletariat')];

bot.login(config.token);
bot.on('ready', () => console.log('Bot ready!'));

bot.on('message', (message) => {
  if (message.author.bot) return; // drop out if it's our own message

  for (plugin of plugins) {
    for ([trigger, action] of plugin.actions) {
      if (trigger(message)) {
        action(message, bot);
      }
    }
  }
});
