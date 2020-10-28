const Command = require("../util/command.js");
const lang = require("../../resources/lang.json");

class About extends Command {

  execute (message, args) {

    let systemMessage, aboutAlias;

    aboutAlias = lang.commands.about;

    if (!args.length) {
      message.channel.send(aboutAlias.error.formatting);
      return;
    }

    args.forEach((arg) => {
      systemMessage = aboutAlias.success[arg.toLowerCase()];

      if (systemMessage) {
        return;
      }
    });

    message.channel.send(systemMessage || aboutAlias.error.nonexistent);
  }
}

module.exports = About;