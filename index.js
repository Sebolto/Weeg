const fs = require("fs");
const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();

// Populate commands collection
fs.readdirSync("./src/commands").filter((file) => {
  return file.endsWith(".js");
}).forEach((file) => {
  let command = require(`./src/commands/${file}`);
  client.commands.set(command.name, command);
});

const prefix = "!";

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) {
    console.log("Return");
    return;
  }

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  console.log(args, command);

  if (command === "ping") {
    client.commands.get("ping").execute(message, args);
  }
});

client.once("ready", () => {
  console.log("Online");
});

client.login(process.env.TOKEN || config.WEEG.TOKEN);