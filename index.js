const _ = require('lodash');
const Discord = require('discord.js');

const bot = new Discord.Client();
let config = _.merge(require('./config.json'), require('./secrets.json'));

bot.login(config.token);
bot.on('ready', () => console.log('Bot ready!'));

function isAdmin(user) {
  return config.admins.includes(user.id);
}

function getMemberByName(guild, name) {
  return guild.members.find(m=>m.nickname==name||m.user.username==name);
}

function canManageProletariat(member) {
  return config.perms.manageProletariat.map(x=>member.roles.exists('name', x))
    .some(x=>x===true) || isAdmin(member);
}

bot.on('message', (message) => {
  if (message.author.bot) return;

  const guild = bot.guilds.find('id', config.guild);
  //if (message.guild == guild) {
    const member = guild.member(message.author);
    if (message.content.startsWith('!promote')) {
      if (canManageProletariat(member)) {
        const match = message.content.match(/!promote [\"\'](.+)[\"\']/i);
        if (!match) {
          message.reply(`❎ Badly-formed command! Please check your syntax and try again.
Correct syntax is \`!promote "<user id|username>".`);
          return;
        }
        const [/*discard 0*/, userid_] = match;
        const member_ = Number.isInteger(parseInt(userid_)) ? guild.member(userid_) : getMemberByName(guild, userid_);
        if (!member_) {message.reply(`❎ User not in guild "${guild.name}."`); return;}

        console.log(`User ${member.user.username}#${member.user.discriminator} adding role ${config.proletariat} to user ${member_.id}/\
${member_.user.username}#${member_.user.discriminator}`);
        member_.addRole(guild.roles.find('name', config.proletariat))
          .then(() => message.reply(`✅ proletarified "${member_.user.username}#${member_.user.discriminator}".`))
          .catch(e => message.reply(`❎ Failed to set user's role: ${e}`));
      }
    } else if (message.content.startsWith('!demote')) {
      if (canManageProletariat(member)) {
        const match = message.content.match(/!demote [\"\'](.+)[\"\']/i);
        if (!match) {
          message.reply(`❎ Badly-formed command! Please check your syntax and try again.
Correct syntax is \`!demote "<user id|username>".`);
          return;
        }
        const [/*discard 0*/, userid_] = match;
        const member_ = Number.isInteger(parseInt(userid_)) ? guild.member(userid_) : getMemberByName(guild, userid_);
        if (!member_) {message.reply(`❎ User not in guild "${guild.name}."`); return;}

        console.log(`User ${member.user.username}#${member.user.discriminator} removing ${config.proletariat} from user ${member_.id}/\
${member_.user.username}#${member_.user.discriminator}`);
        member_.removeRole(guild.roles.find('name', config.proletariat))
          .then(() => message.reply(`✅ unproletarified "${member_.user.username}#${member_.user.discriminator}".`))
          .catch(e => message.reply(`❎ Failed to set user's role: ${e}`));
      }
    } else if (message.content === '!help') {
      message.reply(`Welcome to cuddlebot v0.1!
Available commands are:
\`\`\`
* !help
* !promote "username or userid" - give a user the proletariat role (requires: config.admin or ${config.bourgeoisie})
* !demote "username or userid" - remove the proletariat role from a user (requires: config.admin or ${config.bourgeoisie})
\`\`\``);
    }
  //}
});
