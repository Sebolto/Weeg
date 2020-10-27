const path = require("path");
const Weeg = require("./src/weeg.js");
const client = new Weeg();

client.loadCommands(path.join(__dirname, "src", "commands", "lib"));
client.login(client.config.TOKEN);