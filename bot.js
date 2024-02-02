module.exports = {
    config: {
        name: "bot",
aliases: "gopro", 
        version: "1.1",
        author: "Zenitshu",
        countDown: 5,
        role: 0,
        shortDescription: "ignore this command",
        longDescription: "ignore this command",
        category: "ai",
    },
onStart: async function(){}, 
onChat: async function({
    event,
    message,
    getLang
}) {
    if (event.body && event.body.toLowerCase() == "hi") return message.reply("Hello, How can I help you? ");
}
};