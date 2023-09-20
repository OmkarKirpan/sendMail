require("dotenv").config();
const { DateTime } = require("luxon");
const now = DateTime.now();
const fs = require("fs");
const { sendNotification } = require("./sendNotification");
const { ldata, isStatusSent } = require("./readLogs.js");

// sendNotification(`Status Report already sent ${now.toLocaleString()}`);
// const logStream = fs.createWriteStream("./testlogs.txt", { flags: "a" });

// logStream.write(`\ntest running ${now}`);

let resp = isStatusSent(now);
console.log("🚀 ~ file: test.js:14 ~ resp:", resp);
