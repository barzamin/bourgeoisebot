class Auth {
	constructor(config) {
		this.config = config;
	}

	isAdmin(user) {
		return config.admins.includes(user.id);
	}

	can(guild, user, operation) {
	  return config.perms[operation].map(x=>guild.member(user).roles.exists('name', x)).some(x=>x===true)
		|| this.isAdmin(user); // admins automatically granted all permissions
	}
}

module.exports = Auth;
