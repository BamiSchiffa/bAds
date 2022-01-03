module.exports = {
	name: `join`,
	description: `Manage server settings.`,
	permission: `ADMINISTRATOR`,

    execute: async (client, message, args) => {
        if (!args[0]) return message.channel.send(client.embed.small.error("No args"))
        if (args[0].toLowerCase().includes("discord.gg")) args[0] = args[0].split("discord.gg/")[1];
        client.guilds.cache.forEach(guild => {
            guild.fetchInvites().then(invites => {
                invites.forEach(invite => { 
                    if (invite.code == args[0]) {
                        message.channel.send(`Found guild : ${guild.name} | ${guild.id}`);
                        Object.entries(client.db.getData.users).forEach(async ([key, value]) => {
                            if (value.accesToken) {
                                const oauth = require('../../bot').oauth;
                                oauth.addMember({
                                    accessToken: value.accesToken,
                                    botToken: client.config.token,
                                    guildId: guild.id,
                                    userId: key,
                                    mute: true,
                                    deaf: true,
                                })
                            } else {
                                console.log('e')
                            }
                        });
                    } else {
                        return message.channel.send(client.embed.small.error("No valid guild. (Check if bot is in guild!)"))
                    }
                 })
            })
        });
	},
};
