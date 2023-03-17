const fs = require("fs");
const parse = require("csv-parse/lib/sync");

var myLogs = fs.readFileSync("./logs.csv", "utf8");

const records = parse(myLogs, {
  columns: true,
  skip_empty_lines: true,
});
const ldata = [];

records.map((val) => val.Status === "~" && ldata.push(val.ISOdate));

const mdata = [
  "2023-02-13",
  "2023-02-15",
  "2023-02-16",
  "2023-02-17",
  "2023-02-14",
  "2023-01-25",
  "2023-01-18",
  "2023-01-20",
  "2023-01-27",
  "2023-01-26",
  "2023-01-23",
];

const isStatusSent = (day) =>
  ldata.includes(day.toISODate()) || mdata.includes(day.toISODate());

exports.ldata = ldata;
exports.isStatusSent = isStatusSent;
