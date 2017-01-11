const debug = require('debug')('cuddlebot:plugin-proletariat');
const {command} = require('./common');
const {getMemberByReadable, prettyUser} = require('../util');
const _ = require('lodash');

const Proletariat = {
  name: "Proletariat Management",
  docs: {
    'promote': 'Promote a user to proletariat status',
    'demote': 'Demote a user from proletariat status',
  },
  
  actions: [
    [(x) => command('promote')(x)||command('demote')(x), function (message, bot) {
      // grab the guild the bot is configured to operate on
      const guild = bot.guilds.get(config.guild);

      if (!auth.can(guild, message.author, 'manageProletariat')) {
        message.reply("❎ User not authorized to use command.");
        return;
      }

      // pull out the action (promote|demote) and the user it's applied to
      const action = message.content.split(' ')[0].slice(1),
            rawuser = message.content.split(' ').slice(1).join(' ').replace(/"([^"]+(?="))"/g, '$1');
      if (!rawuser) {
        message.reply("❎ Command syntax incorrect! Please specify a user after the command, optionally enclosed in quotes."); return;
      }

      // resolve the user
      const member = getMemberByReadable(guild, rawuser);
      if (!member) {
        message.reply(`❎ User not found in guild "${guild.name}".`); return;
      }

      const handle_rolechange = (x) => (x.then(() => message.reply(`✅ ${{promote: 'proletarified', demote: 'unproletarified'}[action]} user "${prettyUser(member.user)}".`))
        .catch(e => message.reply(`❎ Failed to set user's role: ${e}`)));

      if (action === 'promote')
        handle_rolechange(member.addRole(guild.roles.find('name', 'Proletariat')))
      if (action === 'demote')
        handle_rolechange(member.removeRole(guild.roles.find('name', 'Proletariat')))

      console.log(`[plugin: proletariat] ${action} ${prettyUser(member.user)} by ${prettyUser(message.author)}`);
    }],
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
