module.exports = {
  config: {
    name: 'lyrics2',
    author: 'jun',
    countDown: 5,
    role: 0,
    category: "utility",
    shortDescription: {
      en: 'sends lyrics to chat',
    },
  },
  onStart: async function ({ api, event, args }) {

    try {
      const axios = require("axios");
      const searchQuery = args.join(" ");
      if(!searchQuery){
        api.sendMessage('Please provide a song name to get lyrics.', event.threadID, event.messageID);
        return;
      }

      let res = await axios.get("https://fantox001-scrappy-api.vercel.app/lyrics?search=" + searchQuery)
      const thumbnail = res.data.thumbnail
      const lyrics = res.data.lyrics

      const attachment = [
        await global.utils.getStreamFromURL(thumbnail),
      ];

      api.sendMessage({ attachment, body: lyrics }, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      api.sendMessage('', event.threadID, event.messageID);
    }
  },
};