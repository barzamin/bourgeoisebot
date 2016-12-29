const debug = require('debug')('plugin-proletariat');
const {command} = require('./common');
const _ = require('lodash');

const Proletariat = {
  name: "Help",
  docs: {
    'help': 'Get bot help',
  },
  
  actions: [
  ]
};

  // if (message.content.startsWith('!promote')) {
  //   if (canManageProletariat(member)) {
  //     const userid_ = message.content.split(' ')[1];
  //     if (!userid_) {
  //       message.reply(`❎ Badly-formed command! Please check your syntax and try again.
  // Correct syntax is \`!promote "<user id|username>".`);
  //       return;
  //     }
  //     const member_ = Number.isInteger(parseInt(userid_)) ? guild.member(userid_) : getMemberByName(guild, userid_);
  //     if (!member_) {message.reply(`❎ User not in guild "${guild.name}."`); return;}

  //     console.log(`User ${member.user.username}#${member.user.discriminator} adding role ${config.proletariat} to user ${member_.id}/\
  // ${member_.user.username}#${member_.user.discriminator}`);
  //     member_.addRole(guild.roles.find('name', config.proletariat))
  //       .then(() => message.reply(`✅ proletarified "${member_.user.username}#${member_.user.discriminator}".`))
  //       .catch(e => message.reply(`❎ Failed to set user's role: ${e}`));
  //   }
  // } else if (message.content.startsWith('!demote')) {
  //   if (canManageProletariat(member)) {
  //     const match = message.content.match(/!demote [\"\'](.+)[\"\']/i);
  //     if (!match) {
  //       message.reply(`❎ Badly-formed command! Please check your syntax and try again.
  // Correct syntax is \`!demote "<user id|username>".`);
  //       return;
  //     }
  //     const [/*discard 0*/, userid_] = match;
  //     const member_ = Number.isInteger(parseInt(userid_)) ? guild.member(userid_) : getMemberByName(guild, userid_);
  //     if (!member_) {message.reply(`❎ User not in guild "${guild.name}."`); return;}

  //     console.log(`User ${member.user.username}#${member.user.discriminator} removing ${config.proletariat} from user ${member_.id}/\
  // ${member_.user.username}#${member_.user.discriminator}`);
  //     member_.removeRole(guild.roles.find('name', config.proletariat))
  //       .then(() => message.reply(`✅ unproletarified "${member_.user.username}#${member_.user.discriminator}".`))
  //       .catch(e => message.reply(`❎ Failed to set user's role: ${e}`));
  //   }
  // } else if (message.content === '!help') {
  //   message.reply(`Welcome to cuddlebot v0.1!
  // Available commands are:
  // \`\`\`
  // * !help
  // * !promote "username or userid" - give a user the proletariat role (requires: config.admin or ${config.bourgeoisie})
  // * !demote "username or userid" - remove the proletariat role from a user (requires: config.admin or ${config.bourgeoisie})
  // \`\`\``);
  // }

module.exports = Proletariat;
