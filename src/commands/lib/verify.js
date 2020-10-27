const Command = require("../util/command.js");

class Verify extends Command {

  execute (message, args) {
    message.channel.send("verify yourself!");
  }
}

module.exports = Verify;