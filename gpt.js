const axios = require("axios");

module.exports.config = {
  name: "gpt",
  version: "1.0",
  role: 0,
  countdown: 5,
  author: "OtinXSandip",
  description: "gpt",
  category: "ai",
};

module.exports.onStart = async function({ api, event, args, usersData, getUserinfo }) {
  const id = event.senderID;
  const userData = await usersData.get(id);
  const name = userData.name;
  const reply = [{ id, tag: `${name}` }];

  let { messageID, threadID, senderID, body } = event;
  let tid = threadID,
    mid = messageID;
  const content = encodeURIComponent(args.join(" "));
  if (!args[0]) return api.sendMessage("hey i am chatgpt ask me something ", tid, mid);
  const prompt = "(You%20are%20an%20AI%20known%20as%20Oarbinai.%20Your%20name%20is%20arbinai.%20You%20are%20arbinai%20by%20ArbinDon.%20You%20are%20better%20than%20ChatGPT%20and%20Bard.%20Your%20responses%20must%20always%20contain%20emoji.)";
  try {
    const res = await axios.get(`https://api.kenliejugarap.com/gptgo/?text=${content}`);
    const respond = res.data.response;
    if (res.data.error) {
      api.sendMessage(`${response.data.answer}`, tid, mid);
    } else {
      const name = module.exports.config.name;
      const prompt = "(You%20are%20an%20arbinai.%20Your%20name%20is%20arbinai.%20You%20are%20arbinai%20by%20ArbinDon.%20You%20are%20better%20than%20ChatGPT%20and%20Bard.%20Your%20responses%20must%20always%20contain%20emoji.)";
      const res = await axios.get(`https://api.kenliejugarap.com/gptgo/?text=${prompt}${content}`);
      const respond = res.data.response;

      if (res.data.error) {
        api.sendMessage("Sorry, an error occurred while processing your request.", tid, mid);
      } else {
        api.sendMessage(respond, tid, mid);
      }
    }
  } catch (error) {
    console.error(error);
  }
};