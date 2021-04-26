const express = require("express");
const app = express();
require("dotenv").config();
// listen port for requests :)
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));
// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"));

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});
app.listen(port, () => {
  console.log(`This app is listening at http://localhost:${port}`);
});
