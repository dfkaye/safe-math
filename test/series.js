import { mean, median, mode, range } from "../safe-math.js";

describe("Series", function () {

  var { expect } = chai;

  describe("mean", function () {
    it("returns 0 if no values in series", () => {
      // 18 Aug 2020, This found a bug, where mean() always divided the result by 0.
      var actual = mean();

      expect(actual).to.equal(0);
    });

    it("returns value if only one value in series", () => {
      var actual = mean(999);

      expect(actual).to.equal(999);
    })

    it("returns average value of a series", () => {
      var actual = mean([1, 2, 3, 4]);

      expect(actual).to.equal(2.5);
    });

    it("ignores functionally non-numeric values", () => {
      // 18 Aug 2020, This found a bug, where '' is coerced to 0 by expand().
      var actual = mean(NaN, 1, null, 2, undefined, 3, '', 4);

      expect(actual).to.equal(2.5);
    });

    it("returns average value of a series of functionally numeric values", () => {
      var actual = mean([
        {
          valueOf() { return 11 }
        },
        new String('9'),
        true // 1
      ]);

      // (21 / 3)
      expect(actual).to.equal(7);
    });

    it("handles POSITIVE_INFINITY or NEGATIVE_INFINITY as values, but not both (returns NaN)", () => {
      expect(mean(Infinity, Infinity)).to.equal(Infinity);
      expect(mean(-Infinity, -Infinity)).to.equal(-Infinity);

      // 18 Aug 2020, Interesting finding.
      expect(mean(-Infinity, Infinity)).to.be.NaN;
    });

    it("handles decimal comparisons", () => {
      var actual = mean([0.1, 0.2, 0.3, 0.4]);

      expect(actual).to.equal(0.25)
    });
  });

  describe("median", () => {
    it("returns 0 if no values in series", () => {
      var actual = median();

      expect(actual).to.equal(0);
    });

    it("returns value if only one value in series", () => {
      var actual = median(13);

      expect(actual).to.equal(13);
    })

    it("returns median value of an odd number in a series", () => {
      var actual = median([9, 7, 1, 3, 4]);

      expect(actual).to.equal(4);
    })

    it("returns median value of an even number in a series", () => {
      var actual = median([9, 1, 6, 3, 7, 4]);

      expect(actual).to.equal(6);
    })

    it("ignores functionally non-numeric values", () => {
      var actual = median(NaN, 1, null, 2, undefined, 3, '', 4);

      expect(actual).to.equal(3);
    });

    it("returns number where median value is a String object", () => {
      var actual = median([
        {
          valueOf() { return 10 }
        },
        new String('9'),
        true // 1
      ]);

      expect(actual).to.equal(9);
    });

    it("returns median value of a series of functionally numeric values", () => {
      var actual = median([
        {
          valueOf() { return 10 }
        },
        new String('12'),
        true // 1
      ]);

      expect(actual).to.equal(10);
    });

    it("handles POSITIVE_INFINITY and NEGATIVE_INFINITY as values", () => {
      expect(median(Infinity, 1, Infinity)).to.equal(Infinity);
      expect(median(-Infinity, -1, -Infinity)).to.equal(-Infinity);
      expect(median(-Infinity, 0, Infinity)).to.equal(0);
    });

    it("handles decimal comparisons", () => {
      var actual = median([0.1, 0.2, 0.25, 0.4]);

      expect(actual).to.equal(0.25)
    });
  })

  describe("mode", () => {
    it("returns empty array if no values in series", () => {
      var actual = mode();

      expect(actual).to.deep.equal([]);
    })

    it("returns array of 1 if only one value in series", () => {
      var actual = mode(13);

      expect(actual).to.deep.equal([13]);
    })

    it("returns mode value with most occurrences in a series", () => {
      var actual = mode([1, 1, 1, 2, 2, 3]);

      expect(actual).to.deep.equal([1]);
    })

    it("returns multiple values with most occurrences in a series", () => {
      var actual = mode([1, 1, 1, 2, 2, 3, 4, 4, 4]);

      expect(actual).to.deep.equal([1, 4]);
    })

    it("ignores functionally non-numeric values", () => {
      var actual = mode(NaN, 1, null, 2, undefined, 3, '', 4, 5, 2, 5);

      expect(actual).to.deep.equal([2, 5]);
    });

    it("returns mode of a series of functionally numeric values", () => {
      var actual = mode([
        {
          valueOf() { return 10 }
        },
        new String('10'),
        true // 1
      ]);

      expect(actual).to.deep.equal([10]);
    });

    it("handles POSITIVE_INFINITY and NEGATIVE_INFINITY as values", () => {
      expect(mode(Infinity, 1, Infinity)).to.deep.equal([Infinity]);
      expect(mode(-Infinity, -1, -Infinity)).to.deep.equal([-Infinity]);

      /*
       * 18 October 2020. This this turned out to be tricky. The mode map keys
       * are sorted indexically, not alphanumerically.
       */
      var expected = [-Infinity, 0, Infinity].sort();
      var actual = mode([-Infinity, 0, Infinity]).sort();

      expect(actual).to.deep.equal(expected);
    });

    it("handles decimal comparisons", () => {
      var actual = mode([0.1, 0.2, 0.25, 0.4]);

      expect(actual).to.deep.equal([0.1, 0.2, 0.25, 0.4])
    });
  })

  describe("range", () => {
    it("returns 0 if no values in series", () => {
      var actual = range();

      expect(actual).to.equal(0);
    })

    it("returns 0 if only one value in series", () => {
      var actual = range(13);

      expect(actual).to.equal(0);
    })

    it("returns difference between highest and lowest values in series", () => {
      var actual = range(1, 1, 2, 5, 100, 100);

      expect(actual).to.equal(99);
    })

    it("ignores functionally non-numeric values", () => {
      var actual = range(NaN, 1, null, 2, undefined, 3, '', 4, 5, 2, 5);

      expect(actual).to.equal(4);
    });

    it("handles POSITIVE_INFINITY and NEGATIVE_INFINITY as values", () => {
      expect(range(Infinity, 1, Infinity)).to.equal(Infinity);
    });

    it("handles decimal comparisons", () => {
      var actual = range([0.2, 0.3]);

      expect(actual).to.equal(0.1)
    });
  })
})