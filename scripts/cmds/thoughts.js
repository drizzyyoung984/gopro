const axios = require("axios");

module.exports = {
 config: {
 name: "thoughts",
 version: "1.0",
 author: "",
 countDown: 5,
 role: 0,
 shortDescription: {
 vi: "",
 en: ""
 },
 longDescription: {
 vi: "",
 en: ""
 },
 category: "fun",
 guide: ""
 },
 onStart: async function({ api, event, args }) {
 try {
 const res = await axios.get(`https://api.popcat.xyz/showerthoughts`);
 const result = res.data.result;
 const author = res.data.author;
 return api.sendMessage(`❏Author: ${author}\n\n❏Thoughts:\n${result}`, event.threadID, event.messageID);
 } catch (err) {
 console.error(err);
 return api.sendMessage("An error occurred while getting shower thoughts. Please try again later.", event.threadID, event.messageID);
 }
 }
};