const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();

const prefix = "!";

client.once("ready", () => {
  console.log("Online");
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }

  const args = message.content.slice(prefix).split(/ +/);
  const command = args.shift().toLowerCase();
});

client.login(process.env.TOKEN || config.WEEG.TOKEN);