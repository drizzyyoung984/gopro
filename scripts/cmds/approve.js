const fs = require('fs');

module.exports = {
  config: {
    name: "a",
aliases: ['approve'],
    version: "1.0",
    role: 2,
    author: "ShivaDaddy",
    shortDescription: {
      en: "approve bot gc",
    },
    longDescription: {
      en: "approval",
    },
    category: "Owner",
  },
  onStart: async function ({ message, args, threadsData, api, event }) {
    const threadsFile = 'approve.json';
  if (args.length < 1) {   
 message.reply("You must give an option: approve (add/delete) [thread ID]");
      return;
    }

    const action = args[0];
    const threadId = args[1];

    let threads = [];
    try {
      threads = JSON.parse(fs.readFileSync(threadsFile));
    } catch (err) {
      console.error(err);
    }

    if (action === "add") {
      if (!threads.includes(threadId)) {
        threads.push(threadId);
        fs.writeFileSync(threadsFile, JSON.stringify(threads));
        const threadData = await threadsData.get(threadId);
        const name = threadData.threadName; // Updated property name
        message.reply(`Thread ${name} (${threadId}) approved 👿`);
      } else {
        message.reply(`Thread ${threadId} is already approved 😏`);
      }
    } else if (action === "delete") {
      const index = threads.indexOf(threadId);
      if (index >= 0) {
        threads.splice(index, 1);
        fs.writeFileSync(threadsFile, JSON.stringify(threads));
        const threadData = await threadsData.get(threadId);
        const name = threadData.threadName;
        if (name) {
          message.reply(`Thread ${name} (${threadId}) unapproved 🤮`);
        } else {
          message.reply(`Thread ${threadId} unapproved 🤮`);
        }
      } else {
        message.reply(`Thread ${threadId} was not approved before ❌`);
      }
    } else if (action === "list") {
      let threadList = "";
      for (let i = 0; i < threads.length; i++) {
        const threadData = await threadsData.get(threads[i]);
        const name = threadData.threadName; // Updated property name
        if (name) {
          threadList += `${i + 1}. ${name} (${threads[i]})\n`;
        } else {
          threadList += `${i + 1}. Unknown Thread (${threads[i]})\n`;
        }
      }
      if (threadList === "") {
        message.reply("No threads approved 👿");
      } else {
        message.reply(`Approved threads 😍:\n${threadList}`);
      }
    }
  }
};