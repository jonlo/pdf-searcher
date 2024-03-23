const { Input } = require("./src/input");
const { Searcher } = require("./src/searcher");

const searcher = new Searcher("./bcExtreme.pdf.txt");
searcher.search(Input.read());
