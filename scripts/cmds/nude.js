const fs = require('fs');

module.exports = {
	config: {
		name: "nude",
		version: "1.0",
		author: "AceGun",
		countDown: 5,
		role: 2,
		shortDescription: {
			vi: "",
			en: "Sends a random nude image."
		},
		longDescription: {
			vi: "",
			en: "Sends a random nude image."
		},
		category: "18+",
		guide: {
			en: "{pn}"
		},
		envConfig: {}
	},

	onStart: async function ({ message }) {
		const json = JSON.parse(fs.readFileSync('nude.json'));
		const data = json[Math.floor(Math.random() * json.length)];
		const link = data.link;

		message.reply({
			body: '「 Here is your Bae😻❤️ 」', attachment: await global.utils.getStreamFromURL(link)
		});
	}
};
