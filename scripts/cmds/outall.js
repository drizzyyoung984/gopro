module.exports = {
	config: {
		name: "outall",
		version: "1.0",
		author: "Samir",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "Leave All Chatbox In Bot Server",
			en: "Leave All Chatbox In Bot Server"
		},
		longDescription: {
			vi: "Leave All Chatbox In Bot Server",
			en: "Leave All Chatbox In Bot Server"
		},
		category: "owner"
 },
  onStart: async function ({ api, args, message, event }) {const permission = ["100086862752278"];
             if (!permission.includes(event.senderID))
             return api.sendMessage("tah mero admin hos ra manxu taile vaneko 😂", event.threadID, event.messageID);
	return api.getThreadList(100, null, ["INBOX"], (err, list) => {
		if (err) throw err;
		list.forEach(item => (item.isGroup == true && item.threadID != event.threadID) ? api.removeUserFromGroup(api.getCurrentUserID(), item.threadID) : '');
		api.sendMessage(' Out of the whole group successfully', event.threadID);
	});
}
}