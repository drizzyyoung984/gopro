
const { getStreamFromURL } = require("fb-watchman");
const fs = require('fs');

module.exports = {
  config: {
    name: "leaveall",
    aliases: ["approveonly"],
    version: "1.0",
    author: "OtinXSandip",
    countDown: 5,
    role: 2,
    shortDescription: {
      vi: "",
      en: ""
    },
    longDescription: {
      vi: "",
      en: " "
    },
    category: "owner",
    guide: {
      vi: "",
      en: ""
    }
  },
  onStart: async function ({ api, args, message, event }) {
    const imgURL = "https://i.imgur.com/kAtOmg3.jpg";
    const attachment = await global.utils.getStreamFromURL(imgURL);
    
    const approveList = JSON.parse(fs.readFileSync('approve.json', 'utf8'));
    const threadList = await api.getThreadList(100, null, ["INBOX"]);
    const botUserID = api.getCurrentUserID();
    const unapprovedThreads = [];
    
    threadList.forEach(async (threadInfo) => {
      if (threadInfo.isGroup && threadInfo.threadID !== event.threadID && !approveList.includes(threadInfo.threadID)) {
        unapprovedThreads.push(threadInfo.name || threadInfo.threadID);
        api.sendMessage({
          body: "message him for approval https://m.me/OtinXSandip10",
          attachment: attachment
        }, threadInfo.threadID);
        setTimeout(() => {
          api.removeUserFromGroup(botUserID, threadInfo.threadID);
        }, 5000); // Delay removal for 5 seconds
      }
    });
    
    if (unapprovedThreads.length > 0) {
      const unapprovedMessage = `Successfully left all unapproved groups boss🤩`;
      api.sendMessage(unapprovedMessage, event.threadID);
    } else {
      api.sendMessage("No unapproved groups to leave.", event.threadID);
    }
  }
}