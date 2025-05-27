// utils/math.test.js
const { checkSign } = require("./math");

describe("checkSign", () => {
  test('should return "positive" for positive number', () => {
    expect(checkSign(5)).toBe("positive");
  });

  test('should return "positive" for zero', () => {
    expect(checkSign(0)).toBe("positive");
  });

  // ❌ Do NOT test for negative numbers
});
