const { getDates, setDates, updateDates, removeDates } = require("./date-db");

const setDB = async () => {
  const mdat = [
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
  ];
  await setDates([]);
  const mdata = await getDates();
};

const rmDB = () => {
  removeDates();
};

const gDB = () => {
  getDates();
};

// rmDB();
// setDB();
gDB();
