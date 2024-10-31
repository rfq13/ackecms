const Groq = require("groq-sdk/index.mjs");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const chatCompletions = (chat) => {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: chat,
      },
    ],
    model: "llama3-8b-8192",
  });
};

module.exports = {
  chatCompletions,
};
