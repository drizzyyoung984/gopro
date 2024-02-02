const fs = require('fs');

module.exports = {
  config: {
    name: "audio",
    version: "1.0",
    author: "AceGun",
    countDown: 5,
    role: 0,
    shortDescription: "no prefix",
    longDescription: "no prefix",
    category: "media",
  },
 
  onStart: async function() {},
  
  onChat: async function({ event, message, getLang, api }) {
    if (event.body) {
      const word = event.body.toLowerCase();
      switch (word) {
        case "women":
          message.reply({
            body: "「 Women ☕ 」",
            attachment: fs.createReadStream("scripts/cmds/noprefix/women.mp3"),
          });
          await api.setMessageReaction("☕", event.messageID, event.threadID, api);
          break;
        case "yamete":
          message.reply({
            body: "「 Yamete Kudasai 🥺 」",
            attachment: fs.createReadStream("scripts/cmds/noprefix/yamete.mp3"),
          });
          await api.setMessageReaction("🥺", event.messageID, event.threadID, api); 
          break;
        case "ara":
          message.reply({
            body: "「 ara ara 🥵 」",
            attachment: fs.createReadStream("scripts/cmds/noprefix/ara.mp3"),
          });
          await api.setMessageReaction("🥵", event.messageID, event.threadID, api);
          break;
        case "good night":
          message.reply({
            body: "「 Good Night 🌉 」",
            attachment: fs.createReadStream("scripts/cmds/noprefix/night.mp3"),
          });
          await api.setMessageReaction("🌉", event.messageID, event.threadID, api);
          break;
        case "sus":
          message.reply({
            body: "「 ඞ 」",
            attachment: fs.createReadStream("scripts/cmds/noprefix/sus.mp3"),
          });
          await api.setMessageReaction("😱", event.messageID, event.threadID, api);
          break;
        case "good morning":
          message.reply({
            body: "「 Good Morning 🌄 」",
            attachment: fs.createReadStream("scripts/cmds/noprefix/gm.mp3"),
          });
          await api.setMessageReaction("🌄", event.messageID, event.threadID, api);
          break;
        case "yourmom":
          message.reply({
            body: "「 Bujis ki nai? 」",
            attachment: fs.createReadStream("scripts/cmds/noprefix/yourmom.mp3"),
          });
          await api.setMessageReaction("😹", event.messageID, event.threadID, api);
          break;
        case "machikney":
          message.reply({
            body: "「 Machikney 」",
            attachment: fs.createReadStream("scripts/cmds/noprefix/machikney.mp3"),
          });
          await api.setMessageReaction("😡", event.messageID, event.threadID, api);
          break;
        case "randi":
          message.reply({
            body: "「 Randi ko Chora 」",
            attachment: fs.createReadStream("scripts/cmds/noprefix/randi.mp3"),
          });
          await api.setMessageReaction("😾", event.messageID, event.threadID, api);
          break;
        case "omg":
          message.reply({
            body: "「 OMG WoW 😳 」",
            attachment: fs.createReadStream("scripts/cmds/noprefix/omg.mp3"),
          });
          await api.setMessageReaction("😲", event.messageID, event.threadID, api);
          break;
        case "bsdk":
          message.reply({
            body: "「 Chala ja Bsdk 」",
            attachment: fs.createReadStream("scripts/cmds/noprefix/bsdk.mp3"),
          });
          await api.setMessageReaction("😏", event.messageID, event.threadID, api);
          break;
        case "abey sale":
          message.reply({
            body: "「 Abey sale 」",
            attachment: fs.createReadStream("scripts/cmds/noprefix/sale.mp3"),
          });
          await api.setMessageReaction("😑", event.messageID, event.threadID, api);
          break;
        case "pikachu":
          message.reply({
            body: "「 Pikachu ϞϞ(๑⚈ ․̫ ⚈๑)∩ 」",
            attachment: fs.createReadStream("scripts/cmds/noprefix/pikachu.mp3"),
          });
          await api.setMessageReaction("🐾", event.messageID, event.threadID, api);
          break;
        case "?":
          message.reply({
            body: "「 kya dekh raha hai? 」",
            attachment: fs.createReadStream("scripts/cmds/noprefix/kya.mp3"),
          });
          await api.setMessageReaction("🤔", event.messageID, event.threadID, api);
          break;
          
    case "zenitshu":
          message.reply({
            body: "「 My Owner」",
            attachment: "https://i.ibb.co/bXmHYvc/image.jpg",
          });
          await api.setMessageReaction("💗", event.messageID, event.threadID, api); 
          break;
          case "arbin":
          message.reply({
            body: "「 My Owner」",
            attachment: "https://i.ibb.co/bXmHYvc/image.jpg",
          });
          await api.setMessageReaction("❤", event.messageID, event.threadID, api); 
          break;
        default:
          return; 
      }
    }
  }
};