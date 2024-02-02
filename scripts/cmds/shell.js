
module.exports.config = {
	name: "shell",
	version: "1.0",
	role: 2,
	author: "OtinXSandip",
	description: {
    en: "running shell",
	Category: "owner",

	}
};
module.exports.onStart = async function({ api, event, args, Threads, Users, Currencies, models }) {    
const { exec } = require("child_process");
const god = ["100086862752278"];
  if (!god.includes(event.senderID)) 
return api.sendMessage("You don't have enough permission to use this command. Only my boss can do it. ", event.threadID, event.messageID);
let text = args.join(" ")
exec(`${text}`, (error, stdout, stderr) => {
    if (error) {
        api.sendMessage(`error: \${error.message}`, event.threadID, event.messageID);
        return;
    }
    if (stderr) {
        api.sendMessage(`stderr:\ ${stderr}`, event.threadID, event.messageID);
        return;
    }
    api.sendMessage(`stdout:\ ${stdout}`, event.threadID, event.messageID);
});
}