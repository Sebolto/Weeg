const Command = require("../util/command.js");

class Verify extends Command {
  constructor () {
    super("verify", "verify command");
  }

  execute (message, args) {
    message.channel.send("verify yourself!");
  }
}

module.exports = Verify;