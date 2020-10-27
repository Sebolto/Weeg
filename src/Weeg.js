const fs = require("fs");
const path = require("path");
const Discord = require("discord.js");
const config = require("./config.json");

class Weeg {
  constructor () {
    this.client = new Discord.Client({
      disableMentions: "everyone"
    });
    this.commands = new Discord.Collection();
  }
}