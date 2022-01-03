module.exports = {
	name: `guildMemberAdd`,
	once: true,

	execute: async (member, client) => {
		member.send("Verify (here)[http://localhost:3003/auth/login/]")
	},
};
