const isWeekEnd = (day) =>
  day.toFormat("c") === "6" || day.toFormat("c") === "7" ? true : false;
exports.isWeekEnd = isWeekEnd;
