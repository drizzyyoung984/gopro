module.exports = {
  config: {
    name: "rps",
    version: "1.0",
    author: "AceGun",
    shortDescription: "Play rock-paper-scissors game with the bot using emoji.",
    category: "fun",
    guide: "{prefix}rps <✊|✋|✌️>"
  },
  onStart: async function ({ message, args }) {
    const choices = ["✊", "✋", "✌️"];
    const userChoice = args[0];
    if (!userChoice || !choices.includes(userChoice)) {
      return message.reply("Please choose either ✊, ✋, or ✌️!");
    }

    const botChoice = choices[Math.floor(Math.random() * choices.length)];

    message.reply(`You chose ${userChoice}. I chose ${botChoice}.`);

    if (userChoice === botChoice) {
      message.reply("It's a tie! ⚖️");
    } else if (
      (userChoice === "✊" && botChoice === "✌️") ||
      (userChoice === "✋" && botChoice === "✊") ||
      (userChoice === "✌️" && botChoice === "✋")
    ) {
      message.reply("Congratulations! You won! 🎉");
    } else {
      message.reply("I win! Better luck next time! 😎");
    }
  },
};
