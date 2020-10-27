const Command = require("../util/command.js");

class Verify extends Command {
  constructor (name, loaded) {
    super (name, loaded);
  }

  execute (message, args) {
    message.channel.send("verify yourself!");
  }
}

module.exports = Verify;