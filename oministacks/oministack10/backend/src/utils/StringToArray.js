module.exports = function StringToArray(str) {
  return str.split(",").map(e => e.trim());
};
