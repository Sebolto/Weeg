class Ping extends Command {
  constructor () {
    super("ping", "ping command");
  }

  execute (message, args) {
    message.channel.send("pong!");
  }
}

module.exports = Ping;