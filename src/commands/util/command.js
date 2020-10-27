class Command {
  constructor (name) {
    this._name = name;
    this._loaded = false;
  }

  set name (name) {
    this._name = name;
  }

  set loaded (loaded) {
    this._loaded = loaded;
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