class Auth {
	constructor(config) {
		this.config = config;
	}

	isAdmin(user) {
		return config.admins.includes(user.id);
	}

	can(member, operation) {
	  return config.perms[operation].roles.map(x=>member.roles.exists('name', x)).some(x=>x===true)
	  	|| isAdmin(member); // admins automatically granted all permissions
	}
}

module.exports = Auth;