
const axios = require('axios');

module.exports = {
	config: {
		name: "nude2",
		version: "1.0",
		author: "Samir",
		countDown: 5,
		role: 2,
		shortDescription: "Nude",
		longDescription: "Ask For Nude Photos",
		category: "18+",
		guide: "{pn}"
	},

	onStart: async function ({ message, args }) {
			const BASE_URL = `https://api-mtx.mtxproject1.repl.co/api/nude.php`;
 message.reply(""); 
			try {
				let res = await axios.get(BASE_URL)
				let porn = res.data.data;
				const form = {
					body: `Here is your Bae🥵❤ `
				};
		 if (porn)
					form.attachment = await global.utils.getStreamFromURL(porn);
				message.reply(form); 
			} catch (e) { message.reply(`An Error Occured While Processing Your Request.`)
 console.log(e);
 }

		}
	};