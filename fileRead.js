const fs = require("fs");

const data = fs.readFileSync("./status.txt", { encoding: "utf8", flag: "r" });

module.exports = data;
