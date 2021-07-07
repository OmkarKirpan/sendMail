const fetch = require("node-fetch");

const sendNotification = (payload) => {
  fetch(
    "https://maker.ifttt.com/trigger/statusReport/with/key/ju2lNgJEV-5Kq-nlcOjFThVXswTAisUEhM0HeYd-fpU",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value1: payload,
      }),
    }
  );
};
exports.sendNotification = sendNotification;
