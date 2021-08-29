const express = require("express");
const app = express();
app.use(express.json());
const schedule = require("node-schedule");
const notificationByToken = require("./notification/notification");

//tokens là 1 array các token
function pushNotification(title, body, tokens) {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    tokens: tokens,
  };
  const x = notificationByToken.sendPushNotification(message);
  console.log(x);
}

function scheduleNotification(title, body, tokens, date) {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    tokens: tokens,
  };
  schedule.scheduleJob(date, function () {
    notificationByToken.sendPushNotification(message);
  });
}

app.post("/SendNotification", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const tokens = req.headers.tokens;

  console.log(req.headers.tokens);

  if (tokens === "") {
    console.log("Failed token");
    res.send("Failed token");
    return;
  }
  const token = tokens.split(",");

  if (!title) {
    console.log("Failed title");
    res.send("Failed title");
    return;
  }

  if (!content) {
    console.log("Failed content");
    res.send("Failed content");
    return;
  }

  const x = pushNotification(title, content, token);
  if (!x) res.send("success");
});

app.post("/SendNotification/:date", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const tokens = req.headers.tokens;
  const token = tokens.split(",");
  const date = parseInt(req.params.date);

  if (!title || !content || !token) {
    console.log("Missing tiltle or content or tokens");
    res.send("Failed: Missing tiltle or content or tokens");
    return;
  }

  if (date < Date.now()) {
    console.log("Ngay phai lon hon ngay hien tai");
    res.send("Failed: Ngay phai lon hon ngay hien tai");
    return;
  }
  const x = scheduleNotification(title, content, token, date);
  res.send("success");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening on port: ", port));
