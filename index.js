const Discord = require("discord.js");

const client = new Discord.Client();

client.once("ready", => {
  console.log("Online");
});

client.login(process.env.TOKEN);