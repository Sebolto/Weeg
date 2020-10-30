const fs = require("fs");
const path = require("path");
const Discord = require("discord.js");
const dotenv = require("dotenv");
const lang = require("./resources/lang.json");

class Weeg {
  constructor () {
    dotenv.config();

    this.client = new Discord.Client();
    this.commands = new Discord.Collection();

    this.config = {};
    this.config.TOKEN = process.env.TOKEN;
    this.config.prefix = "!";
    this._loggedIn = false;
    this._debug = true;

    this.client.on("ready", this.onReady.bind(this));
    this.client.on("error", this.onError.bind(this));
    this.client.on("message", this.onMessage.bind(this));
  }

  onReady () {
    return console.log(lang.weeg.success.online);
  }

  onError (error) {
    return console.error(lang.weeg.error.error, error);
  }

  onMessage (message) {
    if (!message.content.startsWith(this.config.prefix) || message.author.bot) {
      return;
    }

    const args = message.content.slice(this.config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (this._debug) {
      console.log(args, command);
    }

    if (!this.commands.has(command)) {
      try {
        this.loadCommand(undefined, `${command}.js`);
      } catch (error) {
        return console.error(lang.weeg.error.error, error);
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
      throw new Error(lang.weeg.error.login);
    }

    this._loggedIn = true;
    this.client.login(token);
  }
}

module.exports = Weeg;