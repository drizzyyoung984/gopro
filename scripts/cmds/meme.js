module.exports = {
  config: {
    name: 'meme',
    aliases: ['memes'],
    author: 'Shinpei',
    version: '1.0.0',
    role: 0,
    countdown: 5,
    shortDescription: { en: 'Get random meme' },
    longDescription: { en: 'Get random meme from reddit' },
    category: 'utility',
    guide: { en: '{pn} <Number>' }
  },

  onStart: async function ({ event, api, args }) {
    const request = require('request');
    const fs = require('fs-extra');
    const axios = require('axios');

    try {
      const gen = await axios.get('https://api.popcat.xyz/meme');
      const tsukasa = gen.data.image;
      const ryusui = gen.data.title;

      const callback = () => {
        api.sendMessage({
          body: `Random Meme\nTitle: ${ryusui}`,
          attachment: fs.createReadStream(__dirname + '/tmp/meme.png')
        }, event.threadID, () => fs.unlinkSync(__dirname + '/tmp/meme.png'), event.messageID);
      };

      request(encodeURI(tsukasa)).pipe(fs.createWriteStream(__dirname + '/tmp/meme.png')).on('close', callback);
    } catch (err) {
      console.log(err);
      return api.sendMessage('Error occurred while fetching a meme!', event.threadID);
    }
  }
};