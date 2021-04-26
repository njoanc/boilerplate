const express = require("express");
const app = express();
require("dotenv").config();
// listen for requests :)
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));
// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
