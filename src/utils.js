module.exports = {
	sleep: async (ms) => {
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
	},
	waitForResponse: function (userid, channel) {
        return new Promise((resolve, reject) => {
            channel.awaitMessages(m => m.author.id == userid, { max: 1 })
                .then(msgs => {
                    resolve(msgs.first());
                })
                .catch(reject)
        })
    },
    ResolveUser: function (message, argument = 0, fullText = false) {
        const args = message.content.split(" ");
        args.shift();
        const text = fullText ? message.content : (args[argument] || '');
        return message.guild.members.cache.find(m => m.user.tag.toLowerCase() == text.toLowerCase() || m.displayName.toLowerCase() == text.toLowerCase() || m.id == text.replace(/([<@]|[>])/g, '')) || message.mentions.members.first();
    },
};
