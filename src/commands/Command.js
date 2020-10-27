class Command {
  constructor (name, description) {
      this.name = name;
      this.description = description
  }

  execute (message, args) {
    throw new Error("Function execute() is required for implementation");
  }
}

module.exports = Command;