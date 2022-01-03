module.exports = {
	name: `ready`,
	once: true,

	execute: async (client) => {
		console.log(`Bot ready: ${client.user.tag}`);

		status();
		setInterval(status, 10000);

		async function status() {
			const message = [`BamiSchijf`, `BxmiSchijf#6367`, `https://discord.gg/beco`][Math.floor(Math.random() * 3)];
			const guilds = client.guilds.cache.size;

			client.user.setActivity(`${message} | ${guilds} servers | 1 shard`, { type: `WATCHING` });
		}
	},
};
