const got = require('got');
const Command = require("../util/command.js");
const lang = require("../../resources/lang.json");

class Verify extends Command {

  getUserInfo (username) {
    return got("https://swfanon.fandom.com/api.php", {
      searchParams: {
        action: "query",
        list: "users",
        usprop: "editcount",
        ususers: username,
        format: "json"
      }
    }).json();
  }

  getMastheadValue (userid) {
    return got("https://services.fandom.com/user-attribute/user/" +
        userid + "/attr/discordHandle", {
      headers: {
        accept: "*/*"
      }
    }).json();
  }

  async execute (message, args) {

    let userInfo, verifyUser;

    if (message.channel.id !== "770414411935514658") {
      console.log("Wrong channel");
      return;
    }

    if (!args.length) {
      message.channel.send("Error: No username specified.");
    }

    if (message.member.roles.cache.has("770419446278914108")) {
      message.channel.send("Already have this role");
    }

    userInfo = await this.getUserInfo(args[0]);

    if (!userInfo.query.users[0]) {
      return message.channel.send("Error: No such user account found.");
    }

    if (userInfo.query.users[0].editcount === 0) {
      return message.channel.send("Error: Insufficient edit count");
    }

    verifyUser = await this.getMastheadValue(userInfo.query.users[0].userid);

    if (verifyUser.value !== message.author.tag) {
      return message.channel.send("Error: Masthead Discord name and Fandom username do not match.");
    }

    message.member.roles.add("770419446278914108");
    message.channel.send("Success: User role has been applied.");
  }
}

module.exports = Verify;