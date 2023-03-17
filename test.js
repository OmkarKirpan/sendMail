require("dotenv").config();
const { DateTime } = require("luxon");
const now = DateTime.now();
const fs = require("fs");
const { sendNotification } = require("./sendNotification");

sendNotification(`Status Report already sent ${now.toLocaleString()}`);
const logStream = fs.createWriteStream("./testlogs.txt", { flags: "a" });

logStream.write(`\ntest running ${now}`);
