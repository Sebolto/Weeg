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

    // Listeners
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

    // Should never be encountered, but handle unloaded commands
    if (!this.commands.has(command)) {
      try {
        if (this._debug) {
          console.log("Loading unloaded resource");
        }
        this.loadCommand(undefined, `${command}.js`);
      } catch (error) {
        return console.error("Error", error);
      }
    }
    this.commands.get(command).execute(message, args);
  }

  loadCommand (dir = path.join(__dirname, "commands", "lib"), file) {
    const Command = require(path.join(dir, file));
    const command = new Command(file.split(".")[0], false);

    if (this._debug) {
      console.log(`${command.name} -> ${this.commands.has(command.name)}`);
    }

    if (!this.commands.has(command.name) && !command.loaded) {
      this.commands.set(command.name, command);
      command.loaded = true;
    }
  }

  loadCommandDir (dir) {
    fs.readdirSync(dir).filter((file) => {
      return file.endsWith(".js");
    }).forEach((file) => this.loadCommand(dir, file));
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