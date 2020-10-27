const Command = require("../util/command.js");
const lang = require("../../resources/lang.json");

class Ping extends Command {
  constructor (name) {
    super(name);
  }

  execute (message, args) {
    message.channel.send(lang.commands.ping.response);
  }
}

module.exports = Ping;