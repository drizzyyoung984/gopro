const axios = require('axios');
const request = require('request');
const fs = require('fs');

module.exports = {
  config: {
    name: "lyrics",
    aliases: ["ly"],
    version: "1.3",
    role: 0,
    author: "AceGun",
    countDown: 5,
    shortDescription: "",
    longDescription: "Find your favorite song lyrics",
    category: "music",
    guide: {
      vi: "",
      en: "{pn} title",
    },
  },

  onStart: async ({ api, event, args }) => {
    const song = args.join(' ');

    if (!song) {
      return api.sendMessage('Please enter a song.', event.threadID, event.messageID);
    } else {
      try {
        api.setMessageReaction("⏳", event.messageID, event.messageID, api);
        const searchMessage = await api.sendMessage(`✅ | Searching for lyrics.\n⏳ | Please wait...`, event.threadID);

        const res = await axios.get(`https://api.heckerman06.repl.co/api/other/lyrics2?song=${encodeURIComponent(song)}`);
        const { title, artist, lyrics, image } = res.data;

        const callback = () => {
          // Remove the loading reaction
          api.setMessageReaction("🎶", event.messageID, event.messageID, api);

          api.sendMessage({
            body: `Title: ${title}\n\nArtist: ${artist}\n\nLyrics: ${lyrics}`,
            attachment: fs.createReadStream(__dirname + '/cache/image.png')
          }, event.threadID, () => fs.unlinkSync(__dirname + '/cache/image.png'));
        };

        request(encodeURI(image))
          .pipe(fs.createWriteStream(__dirname + '/cache/image.png'))
          .on('close', callback);

        // Remove the initial search message
        await api.unsendMessage(searchMessage.messageID);

      } catch (error) {
        console.error('Lyrics API error:', error);
        api.sendMessage('Failed to fetch lyrics.', event.threadID, event.messageID);
      }
    }
  },
};
