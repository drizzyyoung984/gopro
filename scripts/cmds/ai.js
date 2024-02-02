const axios = require("axios");

module.exports = {
  config: {
    name: "ai",
    version: "1.0.0",
    author: "Arbin",
    countDown: 5,//must be a number
    role: 0,
    shortDescription: {
      en: "Get answer"
    },
    longDescription: {
      en: "( Get answers from AI )"
    },
    category: "ai",
    guide: {
      en: "ai <question>"
    },
    priority: 1,
  },


 onStart: async function ({ message, args, event, threadsData, getLang, role, api }) {
   let lastQuery = "";
  const { threadID, messageID } = event;

  if (!args[0]) {
    api.sendMessage("😿 Please provide me a query to search on Python AI..", threadID, messageID);
    return;
  }

  const query = args.join(" ");

  if (query === lastQuery) {
    api.sendMessage("🕰️ | Updated answer to previous question...", threadID, messageID);
    return;
  } else {
    lastQuery = query;
  }

api.sendTypingIndicator(event.threadID);

  try {
    const response = await axios.get(`https://hazeyy-api-blackbox.kyrinwu.repl.co/ask?q=${encodeURIComponent(query)}`);

    if (response.status === 200 && response.data && response.data.message) {
      const answer = response.data.message;
      const formattedAnswer = formatFont(answer); // Apply font formatting
      api.sendMessage(formattedAnswer, threadID, messageID);
    } else {
      api.sendMessage("😿 Sorry, No relevant answers found..", threadID, messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("😿 Unexpected error, while searching answer on Python AI...", threadID, messageID);
    return;
  }


function formatFont(text) {
    const fontMapping = {
    a: "a",
    b: "b",
    c: "c",
    d: "d",
    e: "e",
    f: "f",
    g: "g",
    h: "h",
    i: "i",
    j: "j",
    k: "k",
    l: "l",
    m: "m",
    n: "n",
    o: "o",
    p: "p",
    q: "q",
    r: "r",
    s: "s",
    t: "t",
    u: "u",
    v: "v",
    w: "w",
    x: "x",
    y: "y",
    z: "z",
    A: "A",
    B: "B",
    C: "C",
    D: "D",
    E: "E",
    F: "F",
    G: "G",
    H: "H",
    I: "I",
    J: "J",
    K: "K",
    L: "L",
    M: "M",
    N: "N",
    O: "O",
    P: "P",
    Q: "Q",
    R: "R",
    S: "S",
    T: "T",
    U: "U",
    V: "V",
    W: "W",
    X: "X",
    Y: "Y",
    Z: "Z"
  };

  let formattedText = "";
  for (const char of text) {
    if (char in fontMapping) {
      formattedText += fontMapping[char];
    } else {
      formattedText += char;
    }
  }
  return formattedText;
}
}
};