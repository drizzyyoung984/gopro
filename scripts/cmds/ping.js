
module.exports = {
  config: {
    name: "ping",
    aliases: ["ms"],
    version: "1.0",
    author: "Sandu",
    role: 2,
    shortDescription: {
      en: "Displays the current ping of the bot's system."
    },
    longDescription: {
      en: "Displays the current ping of the bot's system."
    },
    category: "owner",
    guide: {
      en: "Use {p}ping to check the current ping of the bot's system."
    }
  },
  onStart: async function ({ api, event, args }) {
    const timeStart = Date.now();
    await api.sendMessage("Checking Go-Pro's ping 🔍 ", event.threadID);
    const ping = Date.now() - timeStart;
    api.sendMessage(`The current ping of Go-Pro is ${ping}ms.`, event.threadID);
  }
};