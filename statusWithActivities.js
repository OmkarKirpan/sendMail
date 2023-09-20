const { chooseRandomActivities } = require("./lib/chooseRandomActivities");
const status = require("./fileRead.js");

const statusWithActivities = () => {
  const randomActivities = chooseRandomActivities(2);
  const activities = `Activities Performed:\n1. ${randomActivities[0]}\n2. ${randomActivities[1]}\n\n`;
  const statusWithActivities = status.replace(
    /Activities Performed:\s*/,
    activities
  );
  return statusWithActivities;
};

// console.log(
//   "🚀 ~ file: ctest.js:15 ~ statusWithActivities:",
//   statusWithActivities()
// );

module.exports = { statusWithActivities };
