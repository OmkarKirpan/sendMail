require("dotenv").config();
const { Signale } = require("signale");
const { writeToStream } = require("@fast-csv/format");
const { DateTime } = require("luxon");
const now = DateTime.now();
const fs = require("fs");

const mailer = require("./mailer.js");

const status = require("./fileRead.js");
const { sendNotification } = require("./sendNotification");
const { isWeekEnd } = require("./isWeekEnd");

const logStream = fs.createWriteStream("./logs.csv", { flags: "a" });

const options = {
  scope: "okStatusMailer",
  stream: process.stdout,
};

const customLogger = new Signale(options);

customLogger.log("running....");

if (!isWeekEnd(now)) {
  mailer(status)
    .then((result) => {
      customLogger.success("Msg sent: %s", result.messageId);
      const rows = [
        ["~", now.toLocaleString(DateTime.DATETIME_FULL), result.messageId],
      ];
      writeToStream(logStream, rows, {
        includeEndRowDelimiter: true,
        writeHeaders: false,
      });
      sendNotification(now.toLocaleString());
    })
    .catch((err) => {
      customLogger.error(err);
      const rows = [
        ["x", now.toLocaleString(DateTime.DATETIME_FULL), err.message],
      ];
      writeToStream(logStream, rows, {
        includeEndRowDelimiter: true,
        writeHeaders: false,
      });
    });
} else {
  customLogger.warn(
    `Today is weekEnd ${now.toLocaleString(DateTime.DATETIME_FULL)}`
  );
}
