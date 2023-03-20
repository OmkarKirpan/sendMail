const isWeekEnd = (day) =>
  day.toFormat("c") === "6" || day.toFormat("c") === "7";
exports.isWeekEnd = isWeekEnd;

// This code exports an isWeekEnd function that takes a day argument and returns true if the day is a weekend (Saturday or Sunday), and false otherwise.
// The day argument should be an instance of the Luxon DateTime class, which has a toFormat method that returns the ISO day of the week as a number (1 for Monday, 2 for Tuesday, ..., 7 for Sunday).
