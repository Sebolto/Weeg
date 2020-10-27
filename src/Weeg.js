const fs = require("fs");
const path = require("path");
const Discord = require("discord.js");
const config = require("../config.json");

class Weeg {
  constructor () {
    this.client = new Discord.Client();
    this.commands = new Discord.Collection();

    this.config = config.WEEG;
    this._loggedIn = false;
    this._debug = true;

    this.client.on("ready", this.onReady.bind(this));
    this.client.on("error", this.onError.bind(this));
    this.client.on("message", this.onMessage.bind(this));
  }

  onReady () {
    console.log("Online");
  }

  onError (error) {
    console.error("Error", error);
  }

  onMessage (message) {
    if (!message.content.startsWith(this.config.PREFIX) || message.author.bot) {
      console.log("Return");
      return;
    }

    const args = message.content.slice(this.config.PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (this._debug) {
      console.log(args, command);
    }

    if (this.commands.has(command)) {
      this.commands.get(command).execute(message, args);
    }
  }

  loadCommands (dir) {
    fs.readdirSync(dir).filter((file) => {
      return file.endsWith(".js");
    }).forEach((file) => {
      const CommandClass = require(path.join(dir, file));
      const command = new CommandClass();

      if (this._debug) {
        console.log(command.name, this.commands.has(command.name));
      }

      if (!this.commands.has(command.name)) {
        this.commands.set(command.name, command);
      }
    });
  }

  login (token) {
    if (this._loggedIn) {
      throw new Error("Already logged in");
    }

    this._loggedIn = true;
    this.client.login(token);
  }
}

module.exports = Weeg;