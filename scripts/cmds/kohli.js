const axios = require("axios");
const fs = require("fs-extra");
const { createCanvas, loadImage } = require("canvas");

module.exports = {
  config: {
    name: "virat",
    aliases: ["koli","vk"],
    author: "DRG",
    countDown: 5,
    role: 0,
    category: "write",
    shortDescription: {
      en: "creates a post by virat kohli from your text",
    },
  },

  wrapText: async (ctx, text, maxWidth) => {
    if (ctx.measureText(text).width < maxWidth) return [text];
    if (ctx.measureText("W").width > maxWidth) return null;
    const words = text.split(" ");
    const lines = [];
    let line = "";
    while (words.length > 0) {
      let split = false;
      while (ctx.measureText(words[0]).width >= maxWidth) {
        const temp = words[0];
        words[0] = temp.slice(0, -1);
        if (split) words[1] = `${temp.slice(-1)}${words[1]}`;
        else {
          split = true;
          words.splice(1, 0, temp.slice(-1));
        }
      }
      if (ctx.measureText(`${line}${words[0]}`).width < maxWidth)
        line += `${words.shift()} `;
      else {
        lines.push(line.trim());
        line = "";
      }
      if (words.length === 0) lines.push(line.trim());
    }
    return lines;
  },

  onStart: async function ({ api, event, args }) {
    let { threadID, messageID } = event;
    const pathImg = __dirname + "/cache/trump.png";
    const text = args.join(" ");
    if (!text)
      return api.sendMessage(
        "Enter the content of the comment on the board",
        threadID,
        messageID
      );

    try {
      const { data } = await axios.get(
        "https://i.ibb.co/4SYn5MM/image.jpg",
        { responseType: "arraybuffer" }
      );
      fs.writeFileSync(pathImg, Buffer.from(data, "utf-8"));

      const baseImage = await loadImage(pathImg);
      const canvas = createCanvas(baseImage.width, baseImage.height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);

      ctx.font = "200 30px Arial";
      ctx.fillStyle = "#000000";
      ctx.textAlign = "start";

      let fontSize = 50;
      while (ctx.measureText(text).width > 4000) {
        fontSize--;
        ctx.font = `200 ${fontSize}px Arial`;
      }

      const lines = await this.wrapText(ctx, text, 1000);
      ctx.fillText(lines.join("\n"), 180, 180); // comment
      ctx.beginPath();

      const imageBuffer = canvas.toBuffer();
      fs.writeFileSync(pathImg, imageBuffer);

      api.sendMessage(
        { attachment: fs.createReadStream(pathImg) },
        threadID,
        () => fs.unlinkSync(pathImg),
        messageID
      );
    } catch (error) {
      console.error("Error:", error);
      api.sendMessage("An error occurred while processing the command.", threadID, messageID);
    }
  },
};