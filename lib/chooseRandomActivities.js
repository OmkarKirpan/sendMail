const { readFileSync } = require("fs");
const { sampleSize } = require("lodash");
const activitiesFile = require("./activities.json");

function chooseRandomActivities(count) {
  // const contents = readFileSync(activitiesFile, "utf8");
  // const activities = JSON.parse(contents);

  // return sampleSize(activities, count);
  return sampleSize(activitiesFile, count);
}

module.exports = { chooseRandomActivities };
