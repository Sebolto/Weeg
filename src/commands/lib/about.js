const Command = require("../util/command.js");

class About extends Command {
  constructor () {
    super("about", "about command");
  }

  execute (message, args) {
    if (!args.length) {
      message.channel.send(`Secondary parameter required; format as \"!about Sebolto\" `);
      return;
    }

    let messageValue, username;
    args.forEach((arg) => {
      username = arg.toLowerCase();
      switch (username) {
        case "sebolto":
          return messageValue = "Very handsome moderator";
        case "sakaros":
          return messageValue = "Wiki grandpa";
        case "mpk":
          return messageValue = "Memelord, Inc.";
        default:
          break;
      }
    });

    message.channel.send(`[${username.toUpperCase()}]\n- ${messageValue}`);
  }
}

module.exports = About;