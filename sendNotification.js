const fetch = require("node-fetch");

const sendNotification = (payload) => {
  fetch(process.env.NOTIFY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      value1: payload,
    }),
  });
};
exports.sendNotification = sendNotification;
