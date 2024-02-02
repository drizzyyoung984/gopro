const fs = require('fs');
 
module.exports = {
	config: {
		name: "emoji",
		version: "1.2",
		author: "al-rulex/loufi",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "",
			en: "game to earn money"
		},
		longDescription: {
			vi: "",
			en: "game"
		},
		category: "game",
		guide: {
			en: "{pn}"
		},
		envConfig: {
			reward: 25
		}
	},
 
	langs: {
		en: {
			reply: "the FIRST ONE REPLY BY THIS WON ✓🙄",
			correct: "True you won %1 dollar 😇",
			wrong: "baka worng answer 😐"//delete if you want to doesn't warn false answer 
		}
	},
 
	onStart: async function ({ message, event, commandName, getLang }) {
 
    const json = JSON.parse(fs.readFileSync('emoji.json'));
    const Qdata = json[Math.floor(Math.random() * json.length)];
 
const link = Qdata.link
 
    message.reply({ 
			body: 'THE FIRST ONE REPLYING BY THIS EMOJI WONE', attachment:await global.utils.getStreamFromURL(link)}, (err, info) => {
			global.GoatBot.onReply.set(info.messageID, {
				commandName,
				messageID: info.messageID,
				author: event.senderID,
        answer: Qdata.emoji
			});
		});
	},
 
	onReply: async ({ message, Reply, event, getLang, usersData, envCommands, commandName }) => {
 
    const { author, messageID, answer } = Reply;
 
		if (formatText(event.body) == formatText(answer)) {
			global.GoatBot.onReply.delete(messageID);
      message.unsend(event.messageReply.messageID);
			await usersData.addMoney(event.senderID, envCommands[commandName].reward);
			message.reply(getLang("correct", envCommands[commandName].reward));
		}
		else
			message.reply(getLang("wrong"));
	}
};
 
function formatText(text) {
	return text.normalize("NFD")
		.toLowerCase()
}
//This code modified from nthkang dhcb game by LOUFI do not change please or you got global ban 🌝