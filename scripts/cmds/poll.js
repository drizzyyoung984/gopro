module.exports = {
  config: {
    name: "polll",
    author: "Jun",
    usages: "poll text | text",
    countDown: 5,
    role: 0,
    category: "fun",
    shortDescription: {
      en: "create poll",
    },
 
 },
onStart: async function ({ api, event, args }) {
    var content = args.join(' ')
    var title = args[0];
    var options = content.substring(content.indexOf(" -> ") + 4)

    var option = options.split(" | ");
    var object = {};
    if (option.length == 1 && option[0].includes(' | ')) option[0] = option[0].replace(' | ', ' ');
    for (var i = 0; i < option.length; i++) object[option[i]] = false;
    return api.createPoll(title, event.threadID, object, (err) => (err) ? api.sendMessage('error', event.threadID, event.messageID) : '');
}
};