const got = require("got");
const path = require("path");
const Command = require("../util/command.js");
const lang = require("../../resources/lang.json");
const config = require("../../resources/config.json");

class Verify extends Command {
  getUserInfo (username) {
    return got(path.join("https://swfanon.fandom.com", "api.php"), {
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
    return got(path.join("https://services.fandom.com", "user-attribute",
        "user", userid, "attr", "discordHandle"), {
      headers: {
        accept: "*/*"
      }
    }).json();
  }

  async execute (message, args) {
    let userInfo, verifyUser, verifyAlias;

    verifyAlias = lang.commands.verify;

    if (message.channel.id !== config.channels.verify) {
      return;
    }

    if (!args.length) {
      message.channel.send(verifyAlias.error.username);
    }

    if (message.member.roles.cache.has(config.roles.user)) {
      message.channel.send(verifyAlias.error.redundant);
    }

    userInfo = await this.getUserInfo(args[0]);

    if (!userInfo.query.users[0]) {
      return message.channel.send(verifyAlias.error.nonexistent);
    }

    if (userInfo.query.users[0].editcount === 0) {
      return message.channel.send(verifyAlias.error.edits);
    }

    verifyUser = await this.getMastheadValue(userInfo.query.users[0].userid);

    if (verifyUser.value !== message.author.tag) {
      return message.channel.send(verifyAlias.error.mismatched);
    }

    message.member.roles.add(config.roles.user);
    message.channel.send(verifyAlias.success.applied);
  }
}

module.exports = Verify;