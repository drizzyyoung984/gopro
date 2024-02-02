
const axios = require('axios');

module.exports = {
	config: {
		name: "kanda",
		version: "1.0",
		author: "MILAN",
		countDown: 5,
		role: 2,
		shortDescription: "get nepali kanda",
		longDescription: "get nepali porn videos",
		category: "18+",
		guide: "{pn}"
	},

	onStart: async function ({ message, args }) {
			const BASE_URL = `https://milanbhandari.imageapi.repl.co/kanda?apikey=nepaihoni`;
 await message.reply("🔍processing your kanda it may take 1 to 5 minutes....\\Video is loading please don't use command again😾"); 
			try {
				let res = await axios.get(BASE_URL)
				let kanda = res.data.url;
				const form = {
					body: ``
				};
		 if (kanda)
					form.attachment = await global.utils.getStreamFromURL(kanda);
				message.reply(form); 
			} catch (e) { message.reply(`something went wrong`)
 console.log(e);
 }

		}
	};