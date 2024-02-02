const axios = require('axios');

module.exports = {
  config: {
    name: "insta",
    aliases: ["instagram"],
    version: "1.0",
    author: "MILAN",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Download Instagram videos.",
      vi: "Tải xuống video trên Instagram."
    },
    longDescription: {
      en: "This command allows you to download videos from Instagram by providing the video link. It uses the Nguyen Manh API to fetch and download the video. Simply use the command followed by the Instagram video link and it will start the download process.",
      vi: "Lệnh này cho phép bạn tải xuống video từ Instagram bằng cách cung cấp đường link video. Nó sử dụng API của Nguyen Manh để lấy và tải xuống video. Chỉ cần sử dụng lệnh theo sau là đường link video trên Instagram và nó sẽ bắt đầu quá trình tải xuống."
    },
    category: "media",
    guide: {
      en: "{pn} '<link>",
      vi: "{pn} '<đường link>"
    }
  },


  onStart: async function({ api, args, message, event }) {
    const name = args.join(" ");
    if (!name) {
      return message.reply("Please enter a video link");
    }

    const BASE_URL = `https://milanbhandari.imageapi.repl.co/igdll?url=${encodeURIComponent(name)}`;
    await message.reply("✅| Downloading your video...").then(async (reply) => {
      let id = reply.messageID;
      try {
        let res = await axios.get(BASE_URL);
        let videoData = res.data.url.data[0];
        if (videoData) {
          const form = {
            attachment: await global.utils.getStreamFromURL(videoData.url)
          };
          await message.reply(form);
          message.unsend(id);
        } else {
          await message.reply("Failed to download your video, please try again later.");
        }
      } catch (e) {
        await message.reply("Something went wrong. Please try again later.");
        console.log(e);
      }
    });
  }
};