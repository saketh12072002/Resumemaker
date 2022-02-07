const express = require('express');
const pdf = require("pdf-creator-node");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors())

const fs = require("fs");
app.get("/", (req, res) => {
    res.json({ server: true });
})
app.post("/resume", (req, res) => {
    const { data, template } = req.body;
    console.log(template);
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
app.listen(process.env.PORT || 7001, () => console.log('Server started on port 7001'));