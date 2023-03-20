require("dotenv").config();
const { Signale } = require("signale");
const { writeToStream } = require("@fast-csv/format");
const { DateTime, Interval } = require("luxon");
// const now = DateTime.now();
const fs = require("fs");

const mailer = require("./mailer.js");

const status = require("./fileRead.js");
const { sendNotification } = require("./sendNotification");
const { isWeekEnd } = require("./isWeekEnd");
const { leaveData, isLeave } = require("./loadLeaves");
const { ldata, isStatusSent } = require("./readLogs.js");

const { statusWithActivities } = require("./statusWithActivities");
const { updateDates } = require("./lib/date-db");

const logStream = fs.createWriteStream("./logs.csv", { flags: "a" });

const options = {
  scope: "okStatusMailer",
  stream: process.stdout,
};

const customLogger = new Signale(options);

customLogger.log("running....");

const monthlyStatusMailer = async (now) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  if (!isStatusSent(now)) {
    customLogger.log(`sending status....${now.toISODate()}`);
    if (!isLeave(now)) {
      if (!isWeekEnd(now)) {
        try {
          const result = await mailer(statusWithActivities(), now);
          await updateDates(now.toISODate());
          customLogger.success(
            `Msg sent ${now.toISODate()}: %s`,
            result.messageId
          );
          // sendNotification(`✅ Status Report ${now.toLocaleString()} Sent`);
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
        } catch (err) {
          customLogger.error(err);
          // sendNotification(
          //   `❌ Status Report ${err.message} ${now.toLocaleString()} Error`
          // );
          const rows = [
            [
              "x",
              now.toISODate(),
              now.toLocaleString(DateTime.DATETIME_FULL),
              err.message,
            ],
          ];
          // writeToStream(logStream, rows, {
          //   includeEndRowDelimiter: true,
          //   writeHeaders: false,
          // });
        }
      } else {
        customLogger.warn(
          `Today is weekEnd ${now.toLocaleString(DateTime.DATETIME_FULL)}`
        );
        // sendNotification(
        //   `❌ Status Report Today is weekEnd ${now.toLocaleString()}`
        // );
      }
    } else {
      customLogger.warn(
        `Today is a leave ${now.toLocaleString(DateTime.DATETIME_FULL)}`
      );
      // sendNotification(
      //   `❌ Status Report Today is a leave ${now.toLocaleString()}`
      // );
    }
  } else {
    customLogger.warn("Status report already sent....");
    // sendNotification(`❌ Status Report already sent ${now.toLocaleString()}`);
  }
};

//Start sending monthly status reports
const start = new Date("2023-03-02T14:00:00.000Z");
const end = new Date("2023-03-20T16:00:00.000Z");
// const end = DateTime.now();

const interval = Interval.fromDateTimes(
  DateTime.fromJSDate(start),
  DateTime.fromJSDate(end)
);

console.log(interval.toString());

const desiredArray = interval.splitBy({ day: 1 }).forEach((d) => {
  // new Promise((resolve) => setTimeout(resolve, 6000));
  console.log("waiting for some delay");
  monthlyStatusMailer(d.start).catch((err) => {
    console.log(`ERROR: ${err}`);
  });
});
