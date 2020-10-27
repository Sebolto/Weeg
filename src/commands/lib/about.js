const Command = require("../util/command.js");
const lang = require("../../resources/lang.json");

class About extends Command {

  execute (message, args) {

    let systemMessage, errorAlias;

    errorAlias = lang.commands.about.error;

    if (!args.length) {
      message.channel.send(errorAlias.formatting);
      return;
    }

    args.forEach((arg) => {
      systemMessage = lang.commands.about.response[arg.toLowerCase()];

      if (systemMessage) {
        return;
      }
    });

    message.channel.send(systemMessage || errorAlias.nonexistent);
  }
}

module.exports = About;