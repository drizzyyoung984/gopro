module.exports = {
  config: {
    name: "repeat",
    aliases: ["rep"],
    version: "1.1",
    author: "Subash",
    role: 0,
    shortDescription: "Repeats a message",
    category: "FUN",
    guide: {
      en: "{pn} <message>"
    }
  },

  onStart: async function ({ api, event, args }) {
    const message = args.join(" ");
    if (!message) {
      return api.sendMessage("Please provide a message to repeat.", event.threadID);
    }

    let repeatedMessage = "";
    for (let i = 0; i < 100; i++) {
      repeatedMessage += message + "\n";
    }

    api.sendMessage(repeatedMessage, event.threadID);
  }
};