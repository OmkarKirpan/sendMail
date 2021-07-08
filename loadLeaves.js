const yaml = require("js-yaml");
const fs = require("fs");

// Reading YAML Files
let leaveData = [];
try {
  let fileContents = fs.readFileSync("./leaves.yaml", "utf8");
  let data = yaml.load(fileContents);
  leaveData = [...data.holidays, ...data.leaves];
} catch (e) {
  console.log(e);
}

const isLeave = (day) => leaveData.includes(day.toFormat("dd/LL/y"));

exports.leaveData = leaveData;
exports.isLeave = isLeave;
