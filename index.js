const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();

const prefix = "!";

client.once("ready", () => {
  console.log("Online");
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) {
    console.log("Return");
    return;
  }

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  console.log(args, command);

  if (command === "ping") {
    message.channel.send("pong");
  }
});

client.login(process.env.TOKEN || config.WEEG.TOKEN);