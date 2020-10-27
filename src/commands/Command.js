class Command {
  constructor (name, description) {
      this._name = name;
      this._description = description;
  }

  set name (name) {
    this._name = name;
  }

  set description (description) {
    this._description = description;
  }

  execute () {
    throw new Error("Function execute() is required for implementation");
  }
}

module.exports = Command;