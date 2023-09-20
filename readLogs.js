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
  "2023-05-10","2023-05-09","2023-05-23","2023-05-17", "2023-05-11","2023-05-12","2023-05-22","2023-05-18","2023-05-15","2023-05-19","2023-05-16", "2023-05-24","2023-05-30","2023-05-29", "2023-06-02","2023-06-01","2023-05-25","2023-05-31","2023-05-26"
];

const isStatusSent = (day) =>
  ldata.includes(day.toISODate()) || mdata.includes(day.toISODate());

exports.ldata = ldata;
exports.isStatusSent = isStatusSent;
