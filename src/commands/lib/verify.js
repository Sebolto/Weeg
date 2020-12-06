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
        usprop: "groups|editcount",
        ususers: username,
        format: "json"
      }
    }).json();
  }

  getMastheadValue (userid) {
    return got(path.join("https://services.fandom.com", "user-attribute",
        "user", String(userid), "attr", "discordHandle"), {
      headers: {
        accept: "*/*"
      }
    }).json();
  }

  shouldBeChatModerator (groups) {
    return new RegExp([
      "sysop",
      "chatmoderator",
      "threadmoderator"
    ].join("|")).test(groups.join(" "));
  }

  addReply (message, langMessage) {
    message.delete();

    message.reply(langMessage).then(msg => {
      msg.delete({
        timeout: config.utility.interval
      })
    }).catch(console.error);
  }

  async execute (message, args) {
    let userInfo, verifyUser, verifyAlias, wikiUsername, user;

    verifyAlias = lang.commands.verify;

    if (message.channel.id !== config.channels.verify) {
      return;
    }

    if (!args.length) {
      return this.addReply(message, verifyAlias.error.username);
    }

    if (message.member.roles.cache.has(config.roles.user)) {
      return this.addReply(message, verifyAlias.error.redundant);
    }

    wikiUsername = args.join(" ").trim();
    userInfo = await this.getUserInfo(wikiUsername);

    if (userInfo.error) {
      console.log(`[${userInfo.error.code}] - ${userInfo.error.info}`);
      return this.addReply(message, verifyAlias.error.server);
    }

    user = userInfo.query.users[0];

    if (!user || !user.userid) {
      return this.addReply(message, verifyAlias.error.nonexistent);
    }

    if (user.editcount === 0) {
      return this.addReply(message, verifyAlias.error.edits);
    }

    verifyUser = await this.getMastheadValue(user.userid);

    if (!verifyUser.hasOwnProperty("value") || !verifyUser.value.length) {
      return this.addReply(message, verifyAlias.error.missing);
    }

    if (verifyUser.value !== message.author.tag) {
      return this.addReply(message, verifyAlias.error.mismatched);
    }

    if (this.shouldBeChatModerator(user.groups)) {
      message.member.roles.add(config.roles.moderator);
    }

    message.member.roles.add(config.roles.user);
    message.client.channels.cache.get(config.channels.logs).send(
      `${message.author.tag} -> User:${wikiUsername}`
    );
    this.addReply(message, verifyAlias.success.granted);
  }
}

module.exports = Verify;