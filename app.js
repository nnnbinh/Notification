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
  notificationByToken.sendPushNotification(message);
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

module.exports.pushNotification = pushNotification;
module.exports.scheduleNotification = scheduleNotification;
