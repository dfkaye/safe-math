import { add, minus, multiply, divide } from "../safe-math.js";

describe("operations", () => {

  var { expect } = chai;

  describe("add", function () {
    it("handles a single value", () => {
      var actual = add(1);

      expect(actual).to.equal(1);
    });

    it("handles multiple values", () => {
      var actual = add(1, 2, 3);

      expect(actual).to.equal(6);
    });

    it("handles values array", () => {
      var actual = add([1, 2, 3]);

      expect(actual).to.equal(6);
    });

    it("handles comma-formatted string values", () => {
      var actual = add("1,000", 1);

      expect(actual).to.equal(1001);
    });

    it("handles scientific notation", () => {
      var actual = add([
        987.654E6, // numeric
        "987.654E6" // string
      ]);

      var expected = 2 * "987.654E6";

      expect(actual).to.equal(expected);
    });

    it("handles negative values", () => {
      var actual = add([
        -987.654E6, // numeric
        "987.654E6" // string
      ]);

      expect(actual).to.equal(0);
    });

    it("handles boolean values", () => {
      var actual = add([
        true,
        false,
        Boolean(true),
        Boolean(false),
        new Boolean(true),
        new Boolean(false)
      ]);

      expect(actual).to.equal(3);
    });

    it("handles String objects", () => {
      var actual = add([
        new String(0.1),
        new String(0.2)
      ]);

      expect(actual).to.equal(0.3);
    });

    it("handles 'functionally numeric' objects", () => {
      var actual = add([
        {
          valueOf() { return 0.1 }
        },
        {
          valueOf() { return 0.2 }
        }
      ]);

      expect(actual).to.equal(0.3);
    });

    it("0.1 + 0.2 returns 0.3", () => {
      var actual = add([0.1, 0.2]);

      expect(actual).to.equal(0.3);
    });

    it("0.1 - 0.3 returns -0.2", () => {
      var actual = add([0.1, -0.3]);

      expect(actual).to.equal(-0.2);
    });
    //- 0.15 / 0.1 should return 1.5 instead of 1.4999999999999998.
  })

  describe("minus", function () {
    it("handles a single value - should be unchanged", () => {
      var actual = minus(1);

      expect(actual).to.equal(1);
    });

    it("handles multiple values", () => {
      var actual = minus(1, 2, 3);

      // 1 - 2 - 3
      expect(actual).to.equal(-4);
    });

    it("handles values array", () => {
      var actual = minus([1, 2, 3]);

      // 1 - 2 - 3
      expect(actual).to.equal(-4);
    });

    it("handles comma-formatted string values", () => {
      var actual = minus("1,000", 1);

      expect(actual).to.equal(999);
    });

    it("handles scientific notation", () => {
      var actual = minus([
        987.654E6, // numeric
        "987.654E6" // string
      ]);

      expect(actual).to.equal(0);
    });

    it("handles negative values", () => {
      var actual = minus([
        -987.654E6, // numeric
        "987.654E6" // string
      ]);

      expect(actual).to.equal(-987.654E6 * 2);
    });

    it("handles boolean values", () => {
      var actual = minus([
        true, // 1
        false, // 0
        Boolean(true), // 1
        Boolean(false), // 0
        new Boolean(true), // 1
        new Boolean(false) // 0
      ]);

      // 1 - 0 - 1 - 0 - 1 - 0
      expect(actual).to.equal(-1);
    });

    it("handles String objects", () => {
      var actual = minus([
        new String(0.1),
        new String(0.3)
      ]);

      expect(actual).to.equal(-0.2);
    });

    it("handles 'functionally numeric' objects", () => {
      var actual = minus([
        {
          valueOf() { return 0.1 }
        },
        {
          valueOf() { return 0.3 }
        }
      ]);

      expect(actual).to.equal(-0.2);
    });

    it("0.1 - -0.2 returns 0.3", () => {
      var actual = minus([0.1, -0.2]);

      expect(actual).to.equal(0.3);
    });

    it("0.1 - 0.3 returns -0.2", () => {
      var actual = minus([0.1, 0.3]);

      expect(actual).to.equal(-0.2);
    });
  })

  describe("multiply", function () {
    it("handles a single value", () => {
      var actual = multiply(1);

      expect(actual).to.equal(1);
    });

    it("handles multiple values", () => {
      var actual = multiply(1, 2, 3);

      expect(actual).to.equal(6);
    });

    it("handles values array", () => {
      var actual = multiply([1, 2, 3]);

      expect(actual).to.equal(6);
    });

    it("handles comma-formatted string values", () => {
      var actual = multiply("1,000", 1);

      expect(actual).to.equal(1000);
    });

    it("handles scientific notation", () => {
      var actual = multiply([
        987.654E6, // numeric
        "987.654E6" // string
      ]);

      var expected = 987.654E6 * "987.654E6";

      expect(actual).to.equal(expected);
    });

    it("handles negative values", () => {
      var actual = multiply([
        -987.654E6, // numeric
        "987.654E6" // string
      ]);

      var expected = 987.654E6 * "987.654E6" * -1;

      expect(actual).to.equal(expected);
    });

    it("handles boolean values", () => {
      var actual = multiply([
        true,
        false,
        Boolean(true),
        Boolean(false),
        new Boolean(true),
        new Boolean(false)
      ]);

      expect(actual).to.equal(0);
    });

    it("handles String objects", () => {
      var actual = multiply([
        new String(0.1),
        new String(0.2)
      ]);

      expect(actual).to.equal(0.02);
    });

    it("handles 'functionally numeric' objects", () => {
      var actual = multiply([
        {
          valueOf() { return 0.1 }
        },
        {
          valueOf() { return 0.2 }
        }
      ]);

      expect(actual).to.equal(0.02);
    });

    it("0.1 * 0.1 returns 0.01", () => {
      var actual = multiply([0.1, 0.1]);

      expect(actual).to.equal(0.01);
    });

    it("0.15 / 0.1 returns 1.5", () => {
      var actual = multiply([0.15, (1 / 0.1)]);

      expect(actual).to.equal(1.5);
    });
  });

  describe("divide", () => {
    it("handles a single value, returns it unmodified", () => {
      expect(divide(1)).to.equal(1)
    })

    it("handles multiple values", () => {
      expect(divide(5, 5, 5)).to.equal(.2)
    })

    it("handles values array", () => {
      expect(divide([2, 2, 2])).to.equal(0.5)
    })

    it("handles comma-formatted string values", () => {
      var actual = divide("1,001", 2);

      expect(actual).to.equal(500.5);
    })

    it("handles scientific notation", () => {
      var actual = divide([
        987.654E6, // numeric
        "987.654E6" // string
      ]);

      expect(actual).to.equal(1);
    })

    it("handles negative values", () => {
      expect(divide([-2, -2, -2])).to.equal(-0.5)
    })

    it("handles boolean values", () => {
      var actual = divide([
        true,
        false,
        Boolean(true),
        Boolean(false),
        new Boolean(true),
        new Boolean(false)
      ]);

      expect(actual).to.equal(Number.POSITIVE_INFINITY);
      expect(divide(true, 5)).to.equal(0.2);
    })

    it("handles String objects", () => {
      var actual = divide([
        new String(0.1),
        new String(0.2)
      ]);

      expect(actual).to.equal(0.05);
    })

    it("handles 'functionally numeric' objects", () => {
      var actual = divide([
        {
          valueOf() { return 0.1 }
        },
        {
          valueOf() { return 0.2 }
        }
      ]);

      expect(actual).to.equal(0.05);
    })

    it("0.1 / 10 returns 0.01", () => {
      var actual = divide(0.1, 10)

      expect(actual).to.equal(0.001)
    })

    it("0.15 / 0.1 returns 1.5", () => {
      var actual = divide(0.15, 0.1)

      expect(actual).to.equal(0.015)
    })
  })
})