const axios = require ("axios");
module.exports = {
  config: {
    name: "fact2",
    author: "Jun",
    countDown: 5,
    role: 0,
    category: "ai",
    shortDescription: {
      en: "sends random facts",
    }
  },
onStart: async function ({ api, event,args }) {
const res = await axios.get(`https://api.popcat.xyz/fact`);
var fact = res.data.fact;
return api.sendMessage(`❏Did you know?\n\n❏${fact}`, event.threadID, event.messageID)
}
};