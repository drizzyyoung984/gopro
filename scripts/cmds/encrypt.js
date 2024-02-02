 
const PastebinAPI = require('pastebin-js');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

module.exports = {
  config: {
    name: "encrypt",
    aliases: ["enc", "bin"],
    version: "1.0",
    author: "ZenitshuAgatsuma_arbeen",
    countDown: 5,
    role: 2,
    shortDescription: {
      en: "Upload encrypted files to pastebin and send the link"
    },
    longDescription: {
      en: ""
    },
    category: "owner",
    guide: {
      en: ""
    }
  },

  onStart: async ({ api, event, args }) => {
    const pastebin = new PastebinAPI({
      api_dev_key: 'LFhKGk5aRuRBII5zKZbbEpQjZzboWDp9',
      api_user_key: 'LFhKGk5aRuRBII5zKZbbEpQjZzboWDp9',
    });

    const obfuscateCode = async (code) => {
      const apiUrl = `https://api-test.yourboss12.repl.co/api/obfuscate?code=${encodeURIComponent(code)}`;

      try {
        const response = await axios.get(apiUrl);
        return response.data.obfcode;
      } catch (error) {
        console.error(error);
        throw new Error("An error occurred while obfuscating the code.");
      }
    };

    const fileName = args[0];
    const filePathWithoutExtension = path.join(__dirname, '..', 'cmds', fileName);
    const filePathWithExtension = path.join(__dirname, '..', 'cmds', fileName + '.js');

    if (!fs.existsSync(filePathWithoutExtension) && !fs.existsSync(filePathWithExtension)) {
      return api.sendMessage('File not found!', event.threadID);
    }

    const filePath = fs.existsSync(filePathWithoutExtension) ? filePathWithoutExtension : filePathWithExtension;

    fs.readFile(filePath, 'utf8', async (err, data) => {
      if (err) {
        console.error(err);
        throw new Error("An error occurred while reading the file.");
      }

      const obfuscatedData = await obfuscateCode(data);

      try {
        const paste = await pastebin.createPaste({
          text: obfuscatedData,
          title: fileName,
          format: null,
          privacy: 1,
        });

        const rawPaste = paste.replace("pastebin.com", "pastebin.com/raw");

        api.sendMessage(`File successfully uploaded to Pastebin 😚: ${rawPaste}`, event.threadID, event.messageID);
      } catch (error) {
        console.error(error);
        throw new Error("An error occurred while uploading the file to Pastebin.");
      }
    });
  },
};