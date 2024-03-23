const fs = require("fs");
const readline = require("readline");

class Searcher {
  constructor(pdfTxt) {
    this.pdfTxt = pdfTxt;
    this.previousLine = "";
    this.currentPage = "";
    this.index = 1;
  }

  search(words) {
    const lineStream = readline.createInterface({
      input: fs.createReadStream(this.pdfTxt),
    });
    lineStream.on("line", (line) => {
      this.processLine(line, words);
    });
    lineStream.on("close", () => {
      console.log("End of file");
    });
  }

  processLine(line, searchWords) {
    this.currentPage += line;
    if (this.previousLine.trim() === "") {
      if (this.areWordsInString(searchWords, this.currentPage)) {
        console.log("Found words: " + searchWords + " in page " + this.index);
      }
      this.currentPage = "";
      this.index++;
    }
    this.previousLine = line;
  }

  areWordsInString(words, str) {
    const normalizedStr = str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    const normalizedWords = words.map((word) =>
      word
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
    );
    return normalizedWords.every((word) => normalizedStr.includes(word));
  }
}

module.exports = { Searcher };
