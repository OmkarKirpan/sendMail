require("dotenv").config();
const { Signale } = require("signale");
const { writeToStream } = require("@fast-csv/format");
const { DateTime } = require("luxon");
const now = DateTime.now();
const fs = require("fs");

const mailer = require("./mailer.js");

const { sendNotification } = require("./sendNotification");
const { isWeekEnd } = require("./isWeekEnd");
const { leaveData, isLeave } = require("./loadLeaves");
const { ldata, isStatusSent } = require("./readLogs.js");
const { statusWithActivities } = require("./statusWithActivities");

const logStream = fs.createWriteStream("./logs.csv", { flags: "a" });

const options = {
  scope: "okStatusMailer",
  stream: process.stdout,
};

const customLogger = new Signale(options);

customLogger.log("running....");
if (!isStatusSent(now)) {
  customLogger.log("sending status....");
  if (!isLeave(now)) {
    if (!isWeekEnd(now)) {
      mailer(statusWithActivities(), now)
        .then((result) => {
          customLogger.success("Msg sent: %s", result.messageId);
          sendNotification(`✅ Status Report ${now.toLocaleString()} Sent`);
          const rows = [
            [
              "~",
              now.toISODate(),
              now.toLocaleString(DateTime.DATETIME_FULL),
              result.messageId,
            ],
          ];
          writeToStream(logStream, rows, {
            includeEndRowDelimiter: true,
            writeHeaders: false,
          });
        })
        .catch((err) => {
          customLogger.error(err);
          sendNotification(
            `❌ Status Report ${err.message} ${now.toLocaleString()} Error`
          );
          const rows = [
            [
              "x",
              now.toISODate(),
              now.toLocaleString(DateTime.DATETIME_FULL),
              err.message,
            ],
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
      sendNotification(
        `❌ Status Report Today is weekEnd ${now.toLocaleString()}`
      );
    }
  } else {
    customLogger.warn(
      `Today is a leave ${now.toLocaleString(DateTime.DATETIME_FULL)}`
    );
    sendNotification(
      `❌ Status Report Today is a leave ${now.toLocaleString()}`
    );
  }
} else {
  customLogger.warn("Status report already sent....");
  sendNotification(`❌ Status Report already sent ${now.toLocaleString()}`);
}
