class Command {
  constructor (name, loaded) {
    this._name = name;
    this._loaded = loaded;
  }

  set name (name) {
    this._name = typeof name === "string" || name instanceof String ? name : "";
  }

  set loaded (loaded) {
    this._loaded = (typeof value === "boolean") ? loaded : false;
  }

  get name () {
    return this._name;
  }

  get loaded () {
    return this._loaded;
  }

  execute () {
    throw new Error("Function execute() is required for implementation");
  }
}

module.exports = Command;