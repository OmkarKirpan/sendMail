// const fetch = require("node-fetch");
var request = require("request");

const sendNotification = (payload) => {
  console.log(
    "🚀 ~ file: sendNotification.js:4 ~ sendNotification ~ payload",
    payload
  );
  console.log(
    "🚀 ~ file: sendNotification.js:19 ~ sendNotification ~ NOTIFY_URL",
    process.env.NOTIFY_URL
  );
  let nbody = JSON.stringify({
    value1: payload,
  });
  console.log(
    "🚀 ~ file: sendNotification.js:15 ~ sendNotification ~ tbody",
    nbody
  );

  // using request module to send notification
  var options = {
    method: "POST",
    url: process.env.NOTIFY_URL,
    headers: {
      "Content-Type": "application/json",
    },
    body: nbody,
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });

  // using node-fetch to send notifications
  // fetch(process.env.NOTIFY_URL, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: tbody,
  // })
  //   .then((response) => response.text())
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log("error", error));
};

exports.sendNotification = sendNotification;
