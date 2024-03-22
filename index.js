const { program } = require("commander");
const fs = require("fs");
const readline = require("readline");

let searchWords = [];

const readParams = () => {
  program.option("-f, --find <words>", "Find words separate by comma");
  program.parse(process.argv);
  const options = program.opts();
  if (!options.find) {
    console.log("Please use -f or --find to specify what you want to search");
    process.exit(1);
  }
  searchWords = options.find.split(",");
};

const searchInText = () => {
  let previousLine = "";
  let currentPage = "";
  let index = 1;

  const processLine = (line) => {
    currentPage += line;
    if (previousLine.trim() === "") {
      if (areWordsInString(searchWords, currentPage)) {
        console.log("Found words: " + searchWords + " in page " + index);
      }
      currentPage = "";
      index++;
    }
    previousLine = line;
  };

  function areWordsInString(words, str) {
    // Normalize the input string to remove accents
    const normalizedStr = str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    // Normalize and lowercase each word in the array
    const normalizedWords = words.map((word) =>
      word
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
    );

    // Check if each word exists in the string
    return normalizedWords.every((word) => normalizedStr.includes(word));
  }

  const lineStream = readline.createInterface({
    input: fs.createReadStream("bcExtreme.pdf.txt"),
  });

  lineStream.on("line", (line) => {
    processLine(line);
  });

  lineStream.on("close", () => {
    console.log("End of file");
  });
};

readParams();
searchInText();
