const { program } = require("commander");

class Input {
  constructor(input) {
    this.input = input;
  }
  static read() {
    program.option("-f, --find <words>", "Find words separate by comma");
    program.parse(process.argv);
    const options = program.opts();
    if (!options.find) {
      console.log("Please use -f or --find to specify what you want to search");
      process.exit(1);
    }
    const searchWords = options.find.split(",");
    return searchWords;
  }
}

module.exports = { Input };
