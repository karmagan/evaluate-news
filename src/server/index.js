const path = require("path");
const https = require("https");
const FormData = require("form-data");

require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.static("dist"));

console.log(__dirname);
const cors = require("cors");
const { env } = require("process");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

// designates what port the app will listen to for incoming requests
app.listen(process.env.PORT, function () {
  console.log(`News Evaluate app listening on port ${process.env.PORT}!`);
});

app.post("/getsummary", function (request, response) {
  const data = JSON.stringify({
    key: process.env.API_KEY,
    url: "https://www.bbc.co.uk/news/uk-59798814",
    sentences: "5",
  });
  const formdata = new FormData();
  formdata.append("key", process.env.API_KEY);
  formdata.append("url", request.body.url);
  formdata.append("sentences", "5");

  const options = {
    hostname: "api.meaningcloud.com",
    port: 443,
    path: "/summarization-1.0",
    method: "POST",
    headers: formdata.getHeaders(),
  };

  const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on("data", (d) => {
      response.send(d.toString());
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  formdata.pipe(req);
  req.end();
});
