const Command = require("../util/command.js");
const lang = require("../../resources/lang.json");
const config = require("../../resources/config.json");

class Ping extends Command {

  execute (message, args) {
    message.channel.send(lang.commands.ping.success[
      (message.channel.id === config.channels.cabal) ? "custom" : "default"
    ]);
  }
}

module.exports = Ping;