const _ = require('lodash');
const Discord = require('discord.js');

const bot = new Discord.Client({forceFetchUsers: true});
let config = _.merge(require('./config.json'), require('./secrets.json'));

bot.login(config.token);
bot.on('ready', () => {
  console.log('Script ready!');

  const guild = bot.guilds.find('id', config.guild);
  const role = guild.roles.find('name', config.proletariat);
  guild.members.filter(m=>!m.roles.exists('name', config.proletariat))
    .map(m=>m.addRole(role).then(() =>
      console.log(`Added role ${config.proletariat} to user ${m.user.username}#${m.user.discriminator}`)));
});