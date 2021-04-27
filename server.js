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

app.get("/api/hello", function (request, response) {
  response.json({ greeting: "hello API" });
});

app.get("/api", function (request, response) {
  response.json({ unix: Date.now(), utc: Date() });
});

app.get("/api/:date", function (request, response) {
  const user_input = request.params.input;
  if (!isNaN(user_input)) {
    user_input = parseInt(user_input);
  }
  // console.log(user_input);
  //convert user input to Unix timestamp
  let unix = Math.round(new Date(user_input).getTime() / 1000);
  // console.log(unix);
  //Convert user input into UTC timestamp
  let d1 = new Date(user_input);
  let utc = new Date(
    d1.getUTCFullYear(),
    d1.getUTCMonth,
    d1.getUTCDay,
    d1.getUTCHours,
    d1.getUTCMinutes,
    d1.getUTCSeconds,
    d1.getUTCMilliseconds
  );
  utc.toUTCString();
  response.json({ unix: unix, utc: utc });
});

app.listen(port, () => {
  console.log(`This app is listening at http://localhost:${port}`);
});
