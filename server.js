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

// app.get("/api/hello", function (request, response) {
//   response.json({ greeting: "hello API" });
// });

// app.get("/api", function (request, response) {
//   response.json({ unix: Date.now(), utc: Date() });
// });

app.get("/api/:date", function (request, response) {
  const user_input = request.params.input;
  let date;

  if (!user_input) {
    date = new Date();
  } else {
    if (!isNaN(user_input)) {
      // user_input = parseInt(user_input);
      date = new Date(parseInt(user_input));
    } else {
      date = new Date(user_input);
    }
  }

  if (date.toString() === "Invalid Date") {
    response.send({ error: date.toString() });
  } else {
    response.send({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

app.listen(port, () => {
  console.log(`This app is listening at http://localhost:${port}`);
});
