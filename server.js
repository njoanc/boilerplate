const express = require("express");
const app = express();
require("dotenv").config();
// listen port for requests :)
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));
// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"));

app.get("/", function (request, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", function (request, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api", function (request, res) {
  let date = new Date();
  res.redirect(
    302,
    "/api/date/" +
      date.getFullYear() +
      "-" +
      (date.getUTCMonth() + 1) +
      "-" +
      date.getUTCDate()
  );
  // res.json({ unix: Date.now(), utc: Date() });
});

app.get("/api/date/:input", function (req, res) {
  // We'll start by setting up a variable...
  let date;
  if (/\D/.test(req.params.input)) {
    date = new Date(req.params.input);
  } else {
    date = new Date(parseInt(req.params.input));
  }

  let utc = date.toUTCString();
  // console.log(utc);
  let unix = date.getTime();
  // console.log(unix);

  /*
 we return a JSON object as a res:
 */
  res.json({
    unix: unix,
    utc: utc,
  });
});

app.listen(port, () => {
  console.log(`This app is listening at http://localhost:${port}`);
});
