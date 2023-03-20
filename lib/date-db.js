const { AsyncNedb } = require("nedb-async");

const db = new AsyncNedb({
  filename: "./dates.db",
  autoload: true,
});

// const mdata = ["2023-03-09", "2023-03-03", "2023-03-06"];

// var doc = { _id: "dates", dates: mdata };

const setDates = async (val) => {
  try {
    let dates = await db.asyncInsert({ _id: "dates", dates: val });
    console.log("Dates inserted:", dates);
    return dates.dates;
  } catch (error) {
    console.error("Error inserting dates:", error);
  }
};

const updateDates = async (val) => {
  try {
    let dates = await db.asyncUpdate(
      { _id: "dates" },
      { $push: { dates: val } },
      {}
    );
    console.log("Dates updated:", dates);
    return dates.dates;
  } catch (error) {
    console.error("Error updating dates:", error);
  }
};

// Retrieve the stored array of dates from the database
// let test = [];

const getDates = async () => {
  try {
    let dates = await db.asyncFindOne({});
    console.log("Retrieved dates:", dates);
    return dates.dates;
  } catch (error) {
    console.error("Error retrieving dates:", error);
  }
};
// test = setDates(mdata);
// test = getDates();
// test = updateDates("omkar");

const removeDates = async () => {
  try {
    let dates = await db.asyncRemove({ _id: "dates" }, { multi: true });
    console.log("Removed dates:", dates);
    return dates;
  } catch (error) {
    console.error("Error removeing dates:", error);
  }
};

// // test = removeDates();
// console.log("🚀 ~ file: date-db.js:57 ~ test:", test);

module.exports = {
  setDates,
  updateDates,
  getDates,
  removeDates,
};
