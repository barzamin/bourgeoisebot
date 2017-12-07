const _ = require('lodash');
const debug = require('debug')('cuddlebot:main');
const Discord = require('discord.js');

const bot = new Discord.Client();
config = require('./config.json');
config.token = process.env.TOKEN;

const Auth = require('./auth');
const util = require('./util');

auth = new Auth(config);
plugins = [require('./plugins/help'), require('./plugins/proletariat')];

bot.on('ready', () => {
  console.log(`=== bot start ===
logged in as ${bot.user.tag}`);
});

bot.on('message', (message) => {
  if (message.author.bot) return; // discard messages from bots

  for (plugin of plugins) {
    for ([trigger, action] of plugin.actions) {
      if (trigger.call(this, message)) {
        action(message, bot);
      }
    }
  }
});

bot.login(config.token);
