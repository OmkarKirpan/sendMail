const { DateTime } = require("luxon");
const now = DateTime.now();
const fs = require("fs");

const logStream = fs.createWriteStream("./testlogs.txt", { flags: "a" });

logStream.write(`\ntest running ${now}`);
