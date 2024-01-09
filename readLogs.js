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
  "2023-03-31",
  "2023-03-27",
  "2023-03-21",
  "2023-03-24",
  "2023-03-22",
  "2023-03-29",
  "2023-03-28",
  "2023-03-30",
  "2023-09-20",
];

const isStatusSent = (day) =>
  ldata.includes(day.toISODate()) || mdata.includes(day.toISODate());

exports.ldata = ldata;
exports.isStatusSent = isStatusSent;
