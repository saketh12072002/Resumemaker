const express = require('express');
const pdf = require("pdf-creator-node");

const app = express();
app.use(express.json());

const fs = require("fs");
app.post("/resume", (req, res) => {
    const { data, template } = req.body;
    var html = fs.readFileSync(__dirname + `/template${template}.html`, "utf8");

    var options = {
        format: "A4",
        border: "14px",
        orientation: "portrait",

    };

    var document = {
        html: html,
        data: data,
        path: "./output.pdf",
        type: "stream",
    };

    pdf
        .create(document, options)
        .then((result) => {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
            result.pipe(res);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
})
app.listen(3000, () => console.log('Server started on port 3000'));