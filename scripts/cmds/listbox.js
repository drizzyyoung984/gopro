module.exports = {
  config: {
    name: "listbox", 
    author: "ZENITSHU",
    version: "2.0",
    cooldowns: 5,
    role: 2,
    shortDescription: {
      en: "List all group chats the bot is in."
    },
    longDescription: {
      en: "Use this command to list all group chats the bot is currently in."
    },
    category: "owner",
    guide: {
      en: "{p}{n} "
    }
  },
  onStart: async function ({ api, event }) {
    try {
      const groupList = await api.getThreadList(100, null, ['INBOX']);

      
      const filteredList = groupList.filter(group => group.threadName !== null);

      if (filteredList.length === 0) {
        
        await api.sendMessage('No group chats found.', event.threadID);
      } else {
        const formattedList = filteredList.map((group, index) =>
          `│${index + 1}. ${group.threadName}\n│TID: ${group.threadID}`
        );
        const message = `╭─╮\n│LIST OF GROUP CHATS:\n${formattedList.map(line => `${line}`).join("\n")}\n╰───────────ꔪ`;
        await api.sendMessage(message, event.threadID, event.messageID);
      }
    } catch (error) {
      console.error("Error listing group chats", error);
    }
  },
};