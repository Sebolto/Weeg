const Command = require("../util/command.js");
const lang = require("../../resources/lang.json");

class Verify extends Command {

  getEditCountAndID (username) {
    return got("https://dev.fandom.com/api.php", {
      searchParams: {
        action: "query",
        list: "users",
        usprop: "editcount",
        ususers: username,
        format: "json"
      }
    }).json();
  }

  getMastheadDiscord (userid) {
    return got("https://services.fandom.com/user-attribute/user/" +
        userid + "/attr/discordHandle", {
      headers: {
        accept: "*/*"
      }
    }).json();
  }

  execute (message, args) {
    if (message.member.roles.cache.has("770419446278914108")) {
      message.channel.send("Already have this role");
    } else {
      message.channel.send("You don't have this role");
    }

    message.member.roles.add("770419446278914108");
    message.channel.send("Success: User role has been applied.");
  }
}

module.exports = Verify;