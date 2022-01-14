const pdf = require("pdf-creator-node");
const fs = require("fs");

var html = fs.readFileSync(__dirname+"/template.html", "utf8");
const sample = require("./sample.json");
var options = {
    format: "A4",
    border: "5px",
    orientation: "portrait",
    header: {
        height: "15px"
    },
    footer: {
        height: "15px"
    }
};

  var document = {
    html: html,
    data: sample,
    path: "./output.pdf",
    type: "",
  };

  pdf
  .create(document, options)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.error(error);
  });