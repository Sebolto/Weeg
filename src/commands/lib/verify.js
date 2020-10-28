const Command = require("../util/command.js");
const lang = require("../../resources/lang.json");

class Verify extends Command {

  execute (message, args) {
    message.channel.send("verify yourself!");
  }
}

module.exports = Verify;