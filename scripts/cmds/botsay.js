
module.exports = {
  config: {
    name: "botsay", 
    version: "1.0",
    author: "ZenitshuAgatsumaArbeen",
    countDown: 0,
    role: 2,
    shortDescription: "",
    longDescription: "",
    category: "admin",
    guide: {
      en: "{pn} "
    }
  },
  onStart: async function ({ message, api, event }) {
    if (event.body) {
      const c = event.body.split(" ")[1]; 
      api.sendMessage(c, event.threadID, event.messageID);
    }
  }
};