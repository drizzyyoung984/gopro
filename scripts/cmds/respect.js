module.exports = {
  config: {
    name: "respect", 
    version: "1.0",
    author: "ZenAgatsuma",
    countDown: 0,
    role: 0,
    shortDescription: "Give admin and show respect",
    longDescription: "Gives admin privileges in the thread and shows a respectful message.",
    category: "owner",
    guide: {
          en: "{pn}"
      }
  },
 
  onStart: async function ({ message, args, api, event }) {
    try {
      console.log('Sender ID:', event.senderID);
 
      const permission = ["100027410931769", "100086862752278"];
      if (!permission.includes(event.senderID)) {
        return api.sendMessage(
          "Only my owner Zenitshu Agatsuma can do this gay😑",
          event.threadID,
          event.messageID
        );
      }
 
      const threadID = event.threadID;
      const adminID = event.senderID;
 
      // Change the user to an admin
      await api.changeAdminStatus(threadID, adminID, true);
 
      api.sendMessage(
        `🫡 I respect you my boss!\nHere you go as admin in this GroupChat.`,
        threadID
      );
    } catch (error) {
      console.error("Error promoting user to admin:", error);
      api.sendMessage("❗An error occurred while promoting to admin.", event.threadID);
    }
  },
};