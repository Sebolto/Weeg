const path = require("path");
const Weeg = require("./src/Weeg.js");
const client = new Weeg();

client.loadCommands(path.join(__dirname, "src", "commands"));
client.login(client.config.TOKEN);