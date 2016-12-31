module.exports = {
  command: function(name) {
    return (message)=>message.content.startsWith(this.config.prefix+name);
  },
};
