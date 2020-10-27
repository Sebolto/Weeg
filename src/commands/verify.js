module.exports = {
  name: "verify",
  description: "verify command",
  execute (message, args) {
    message.channel.send("verify yourself");
  }
};