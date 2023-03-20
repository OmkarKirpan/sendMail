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
  "2023-03-09",
  "2023-03-03",
  "2023-03-06",
  "2023-03-08",
  "2023-03-15",
  "2023-03-20",
  "2023-03-12",
  "2023-03-10",
  "2023-03-14",
  "2023-03-07",
  "2023-03-16",
  "2023-03-02",
  "2023-03-13",
  "2023-03-17",
];

const isStatusSent = (day) =>
  ldata.includes(day.toISODate()) || mdata.includes(day.toISODate());

exports.ldata = ldata;
exports.isStatusSent = isStatusSent;
