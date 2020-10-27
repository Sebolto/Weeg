class Command {
  constructor (name, desc) {
    this._name = name;
    this._desc = desc;
    this._loaded = false;
  }

  set name (name) {
    this._name = name;
  }

  set desc (desc) {
    this._desc = desc;
  }

  set loaded (loaded) {
    this._loaded = loaded;
  }

  get name () {
    return this._name;
  }

  get description () {
    return this._desc;
  }

  get loaded () {
    return this._loaded;
  }

  execute () {
    throw new Error("Function execute() is required for implementation");
  }
}

module.exports = Command;