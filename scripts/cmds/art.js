const fs = require("fs");
const axios = require("axios");
const path = require("path");
const FormData = require("form-data");

module.exports = {
  config: {
    name: "art",
    version: "1.1",
    author: "ZenitshuAgatsumaARBIN",
    countDown: 5,
    role: 0,
    category: "media",
  },

  onStart: async function ({ event, message, getLang, threadsData, api, args }) {
    try {
      if (args.length >= 2 || (event.type === "message_reply" && event.messageReply.attachments.length > 0 && event.messageReply.attachments[0].type === "photo")) {
        message.reply("Transforming Image, Please Wait...⏳");

        const imageUrl = event.type === "message_reply" ? event.messageReply.attachments[0].url : args[0];
        const prompt = event.type === "message_reply" ? "same pose, same person, same environment, all same just add anime effect,anime look,boy will be a boy,girl will be a girl" : args.slice(1).join(" ");

        const formData = new FormData();
        formData.append("key", "a9b5fe1a5015a7fe51eee9aa50ff7af0");
        formData.append("image", imageUrl);

        const imgbbResponse = await axios.post("https://api.imgbb.com/1/upload", formData, {
          headers: formData.getHeaders(),
        });
        const imgbbImageUrl = imgbbResponse.data.data.url;

        const response = await axios.get(`https://jarif-art.blackxlegend1.repl.co/transform?imgurl=${imgbbImageUrl}&prompt=${prompt}&apikey=fuck-me`, {
          responseType: "arraybuffer",
        });

        const imageBuffer = Buffer.from(response.data);
        const pathSave = path.join(__dirname, "art.png");

        await saveArrayBufferToFile(imageBuffer, pathSave);

        message.reply(
          {
            attachment: fs.createReadStream(pathSave),
          },
          () => {
            fs.unlinkSync(pathSave);
          }
        );
      } else if (event.type === "message_reply") {
        message.reply("❌ | Reply With An Image.");
      } 
    } catch (e) {
      console.error(e);
      message.reply("❌ | Something Went Wrong.");
    }
  },
};

async function saveArrayBufferToFile(arrayBuffer, filePath) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, Buffer.from(arrayBuffer), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}