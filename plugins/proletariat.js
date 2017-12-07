const debug = require('debug')('cuddlebot:plugin-proletariat');
const {command} = require('./common');
const {getMemberByReadable} = require('../util');
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

      const handle_rolechange = (x) => (x.then(() => message.reply(`✅ ${{promote: 'proletarified', demote: 'unproletarified'}[action]} user "${member.user.tag}".`))
        .catch(e => message.reply(`❎ Failed to set user's role: ${e}`)));

      if (action === 'promote')
        handle_rolechange(member.addRole(guild.roles.find('name', 'Proletariat')))
      if (action === 'demote')
        handle_rolechange(member.removeRole(guild.roles.find('name', 'Proletariat')))

      console.log(`[plugin: proletariat] (@${new Date()}) ${action} ${member.user.tag} by ${message.author.tag}`);
    }],
  ]
};

module.exports = Proletariat;
