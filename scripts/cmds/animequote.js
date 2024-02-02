const axios = require("axios");

module.exports = {
  config: {
    name: "animequote",
    aliases: ["aquote"],
    version: "1.2",
    author: "AceGun",
    countDown: 5,
    role: 0,
    shortDescription: "Get anime quotes",
    longDescription: {
      en: "get quotes.",
    },
    category: "anime",
    guide: {
      en: "{prefix}",
    },
  },

  onStart: async function ({ api, event, args, message }) {
    try {
      const response = await axios.get("https://animechan.vercel.app/api/random");
      const { anime, character, quote } = response.data;
      const message = `❏From: ${anime}\n❏By: ${character}\n\n❏Quote: ${quote}`;
      return api.sendMessage(message, event.threadID);
    } catch (error) {
      console.error(error);
    }
  },
};
