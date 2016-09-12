const _ = require('lodash');
const Discord = require('discord.js');

const bot = new Discord.Client();
let config = _.merge(require('./config.json'), require('./secrets.json'));

bot.login(config.token);
bot.on('ready', () => console.log('Bot ready!'));

function isAdmin(user) {
  return config.admins.contains(user.id);
}

bot.on('message', (message) => {
  if (message.author.bot) return;

  if (!message.guild) {
    const guild = bot.guilds.find('id', config.guild);
    const member = guild.member(message.author);
    if (message.content.startsWith('!giveexclusive')) {
      if (member.roles.exists('name', 'bourgeoise') || member.roles.exists('name', 'proleteriat') || isAdmin(member)) {
        const match = message.content.match(/!giveexclusive [\"\'](.+)[\"\'] ([\"\'])?(.+)\2/i);
        if (!match) {
          message.reply(`❎ Badly-formed command! Please check your syntax and try again.
Correct syntax is \`!giveexclusive <user id> <role>.\`
Quoting the role is necessary for roles with spaces in their name.`);
          return;
        }
        const [,userid_,,rolename_] = match;
        const member_ = guild.member(userid_);
        const role_ = guild.roles.find('name', rolename_);
        if (!member_) {message.reply(`❎ User not in guild "${guild.name}."`); return;}
        if (!role_) {message.reply(`❎ Role "${rolename_}" does not exist.`); return;}

        member_.removeRoles(config.exclusiveroles
          .find(e=>e.includes(rolename_))
          .filter(r=>r!=rolename_)
          .map(r=>guild.roles.find('name', r)))
          .then(() => member_.addRole(role_))
          .then(() => message.reply(`✅ Gave "${member_.user.username}#${member_.user.discriminator}" role "${rolename_}."`));
      }
    } else if (message.content === '!help') {
      message.reply(`Welcome to cuddlebot v0.1!
Available commands are:
\`\`\`
* !help
* !giveexclusive - give a role to a user, removing any conflicting roles (ie bourgeoise/proleteriat)
  * Current exclusive rolepairs: ${JSON.stringify(config.exclusiveroles)}
\`\`\``);
    }
  }
});