module.exports = {
  getMemberByReadable: function(guild, ident) {
    if (Number.isInteger(ident)) { // this is a raw userid
      return guild.member(ident);
    } else {
      const [/*discard full match*/, name, discrim] = ident.match(/(\w+)(?:\#(\d+))?/);
      if (discrim) {
        return guild.members.find(m=>(m.nickname==name||m.username==name)&&m.discriminator==discrim);
      } else {
        return guild.members.find(m=>m.nickname==name||m.user.username==name);
      }
    }
  },
};
