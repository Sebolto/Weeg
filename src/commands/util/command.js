const lang = require("../../resources/lang.json");

class Command {
  constructor (name, loaded, client) {
    this._name = name;
    this._loaded = loaded;
    this._client = client;
  }

  set name (name) {
    this._name = typeof name === "string" || name instanceof String ? name : "";
  }

  set loaded (loaded) {
    this._loaded = typeof value === "boolean" ? loaded : false;
  }

  set client (client) {
    this._client = client;
  }

  get name () {
    return this._name;
  }

  get loaded () {
    return this._loaded;
  }

  get client () {
    return this._client;
  }

  execute () {
    throw new Error(lang.commands.command.error.unimplemented);
  }
}

module.exports = Command;