const PDF = require("pdf-parse");
const fs = require("fs");

let PDF_FILE = "./bcExtreme.pdf";
let dataBuffer = fs.readFileSync(PDF_FILE);
PDF(dataBuffer)
  .then(function (data) {
    fs.writeFileSync(`${PDF_FILE}.txt`, data.text, {
      encoding: "utf8",
      flag: "w",
    });
  })
  .catch(function (err) {
    console.log(err);
  });
