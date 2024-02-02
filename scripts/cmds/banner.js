module.exports = {
  config: {
    name: "banner",
    version: "1.0",
    author: "AceGun",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: {
      en: "Make a banner card for fun purpose",
    },
    category: "media",
    guide: {
      en: "{prefix}banner | number (1 to 848) | Name | Signature | Surname | colour",
    },
  },

  onStart: async function ({ api, event, args }) {
    const { loadImage, createCanvas } = require("canvas");
    const fs = require('fs');
    const request = require('request');
    const path = require('path');
    const axios = require('axios');
    const lengthchar = (await axios.get('https://run.mocky.io/v3/0dcc2ccb-b5bd-45e7-ab57-5dbf9db17864')).data;
    const Canvas = require('canvas');

    const text1 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[0] || "21";
    const text2 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[1] || "";
    const text3 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[2] || "";
    const text4 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[3] || "";
    const color = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[4] || "";

    let pathImg = __dirname + `/tad/avatar_1.png`;
    let pathAva = __dirname + `/tad/avatar_2.png`;

    let avtAnime = (
      await axios.get(encodeURI(`${lengthchar[text1 - 1].imgAnime}`), { responseType: "arraybuffer" })
    ).data;
    fs.writeFileSync(pathAva, Buffer.from(avtAnime, "utf-8"));

    let background = (
      await axios.get(encodeURI(`https://imgur.com/Ch778s2.png`), { responseType: "arraybuffer" })
    ).data;
    fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));

    if (!fs.existsSync(__dirname + `/tad/PastiOblique-7B0wK.otf`)) {
      let getfont = (
        await axios.get(
          `https://github.com/hanakuUwU/font/raw/main/PastiOblique-7B0wK.otf`,
          { responseType: "arraybuffer" }
        )
      ).data;
      fs.writeFileSync(__dirname + `/tad/PastiOblique-7B0wK.otf`, Buffer.from(getfont, "utf-8"));
    }

    if (!fs.existsSync(__dirname + `/tad/gantellinesignature-bw11b.ttf`)) {
      let getfont2 = (
        await axios.get(
          `https://github.com/hanakuUwU/font/raw/main/gantellinesignature-bw11b.ttf`,
          { responseType: "arraybuffer" }
        )
      ).data;
      fs.writeFileSync(__dirname + `/tad/gantellinesignature-bw11b.ttf`, Buffer.from(getfont2, "utf-8"));
    }

    if (!fs.existsSync(__dirname + `/tad/UTM%20Bebas.ttf`)) {
      let getfont3 = (
        await axios.get(
          `https://github.com/hanakuUwU/font/blob/main/UTM%20Bebas.ttf?raw=true`,
          { responseType: "arraybuffer" }
        )
      ).data;
      fs.writeFileSync(__dirname + `/tad/UTM%20Bebas.ttf`, Buffer.from(getfont3, "utf-8"));
    }

    const color_ = (color === "no" || color === "No" || color === "") ? lengthchar[text1 - 1].colorBg : color;

    let a = await loadImage(pathImg);
    let ab = await loadImage(pathAva);
    let canvas = createCanvas(a.width, a.height);
    let ctx = canvas.getContext("2d");

    ctx.fillStyle = "#e6b030";
    ctx.drawImage(a, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(ab, 1500, -400, 1980, 1980);

    ctx.textAlign = "start";
    Canvas.registerFont(__dirname + `/tad/PastiOblique-7B0wK.otf`, {
      family: "PastiOblique-7B0wK",
    });
    ctx.fillStyle = color_;
    ctx.font = "370px PastiOblique-7B0wK";
    ctx.fillText(text2, 500, 730);

    ctx.textAlign = "start";
    Canvas.registerFont(__dirname + `/tad/gantellinesignature-bw11b.ttf`, {
      family: "gantellinesignature-bw11b",
    });
    ctx.fillStyle = "#fff";
    ctx.font = "150px gantellinesignature-bw11b";
    ctx.fillText(text3, 600, 450);
    ctx.save();

    Canvas.registerFont(__dirname + `/tad/UTM%20Bebas.ttf`, {
      family: "Bebas",
    });
    ctx.textAlign = "end";
    ctx.fillStyle = "#f56236";
    ctx.font = "145px PastiOblique-7B0wK";
    ctx.fillText(text4, 1800, 850);
    ctx.beginPath();

    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(pathImg, imageBuffer);

    return api.sendMessage(
      {
        body: "Here's Your Photo",
        attachment: fs.createReadStream(pathImg),
      },
      event.threadID,
      () => {
        fs.unlinkSync(pathImg);
        fs.unlinkSync(pathAva);
      },
      event.messageID
    );
  }
};