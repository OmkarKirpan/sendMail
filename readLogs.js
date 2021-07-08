const fs = require("fs");
const parse = require("csv-parse/lib/sync");

var myLogs = fs.readFileSync("./logs.csv", "utf8");

const records = parse(myLogs, {
  columns: true,
  skip_empty_lines: true,
});
const ldata = [];

records.map((val) => val.Status === "~" && ldata.push(val.ISOdate));

const isStatusSent = (day) => ldata.includes(day.toISODate());

exports.ldata = ldata;
exports.isStatusSent = isStatusSent;
