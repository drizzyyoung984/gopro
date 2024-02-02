const fs = require("fs-extra");
const request = require("request");

module.exports = {
  config: {
    name: "poll",
    author: "Jun",
    countDown: 5,
    role: 2,
    category: "admin",
    shortDescription: {
      en: "create poll",
    },
  },

  onStart: async function ({ api, event, args }) {
    var content = args.join(" ");
    var title = args[0];
    var options = content.substring(content.indexOf(" -> ") + 4);

    var option = options.split(" | ");
    var object = {};
    if (option.length === 1 && option[0].includes(" | ")) {
      option[0] = option[0].replace(" | ", " ");
    }
    for (var i = 0; i < option.length; i++) {
      object[option[i]] = false;
    }
    api.createPoll(title, event.threadID, object, (err) => {
      if (err) {
        api.sendMessage("Error creating poll", event.threadID, event.messageID);
      }
    });
  },
};