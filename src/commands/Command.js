class Command {
  constructor (name, description) {
      this.name = name;
      this.description = description
  }

  execute () {
    throw new Error("Function execute() is required for implementation");
  }
}

module.exports = Command;