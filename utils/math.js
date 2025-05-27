// utils/math.js
function checkSign(n) {
  if (typeof n !== "number") {
    return "invalid input";
  }
  if (Number.isNaN(n)) {
    return "not a number";
  }
  if (n === 0) {
    return "zero";
  }
  if (n === Infinity) {
    return "positive infinity";
  }
  if (n === -Infinity) {
    return "negative infinity";
  }
  if (n > 0) {
    return "positive";
  } else {
    return "negative";
  }
}

module.exports = { checkSign };
