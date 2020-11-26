import { percent, power, reciprocal, square, sqrt } from "../safe-math.js";

describe("Conversions", function () {

  var { expect } = chai;

  describe("percent", function () {
    it("undefined", () => {
      var actual = percent();

      expect(actual, "should return undefined").to.be.undefined;
    });

    it("null", () => {
      var actual = percent(null);

      expect(actual, "should return null").to.be.null;
    });

    it("NaN", () => {
      var actual = percent(NaN);

      expect(actual, "should return NaN").to.be.NaN;
    });

    it("0", () => {
      var actual = percent(0);

      expect(actual, "should return 0").to.equal(0);
    });

    it("Infinity", () => {
      var actual = percent(Infinity);

      expect(actual, "should return Infinity").to.equal(Infinity);
    });

    it("0", () => {
      var actual = percent(0);

      expect(actual, "should return 0").to.equal(0);
    });

    it("Number(1)", () => {
      var actual = percent(Number(1));

      expect(actual, "should return 1 / 100").to.equal(1 / 100);
    });

    it("String(-10)", () => {
      var actual = percent(String(-10));

      expect(actual, "should return -10/100").to.equal(-(10 / 100));
    });

    it("Boolean(true)", () => {
      var actual = percent(Boolean(true));

      expect(actual, "should return 1 / 100").to.equal(1 / 100);
    });

    it("Functionally Numeric Object", () => {
      var value = { valueOf: () => 5 }
      var actual = percent(value);

      expect(actual, "should return 5/100").to.equal(5 / 100);
    });
  });

  describe("power", () => {
    it("missing params", () => {
      var exec = function () {
        // console.log("execute with missing params");
        power();
      };

      expect(exec, "should throw an Error").to.throw();
    });

    it("undefined to the 3", () => {
      var actual = power({ value: undefined, exponent: 3 });

      expect(actual, "should return undefined").to.be.undefined;
    });

    it("3 to the undefined", () => {
      var actual = power({ value: 3, exponent: undefined });

      expect(actual, "should return 3").to.equal(3);
    });

    it("3 to the null", () => {
      var actual = power({ value: 3, exponent: null });

      expect(actual, "should return 3").to.equal(3);
    });

    it("3 to the empty string", () => {
      var actual = power({ value: 3, exponent: "" });

      expect(actual, "should return 3").to.equal(3);
    });

    it("3 to the blank string", () => {
      var actual = power({ value: 3, exponent: "    " });

      expect(actual, "should return 3").to.equal(3);
    });

    it("null", () => {
      var actual = power({ value: null, exponent: 1 });

      expect(actual, "should return null").to.be.null;
    });

    it("NaN", () => {
      var actual = power({ value: NaN, exponent: 1 });

      expect(actual, "should return null").to.be.NaN;
    });

    it("0", () => {
      var actual = power({ value: 0, exponent: 1 });

      expect(actual, "should return 0").to.equal(0);
    });

    it("Number(1.1) to 2", () => {
      var actual = power({ value: 1.1, exponent: 2 });

      // Should not return 1.2100000000000002
      expect(actual, "should return 1.21").to.equal(1.21);
    });

    it("String(2) to String(4)", () => {
      var actual = power({ value: "2", exponent: "4" });

      expect(actual, "should return 16").to.equal(16);
    });

    it("Boolean(0) to Boolean(0)", () => {
      var actual = power({ value: Boolean(0), exponent: Boolean(0) });

      expect(actual, "should return 1").to.equal(1);
    });

    it("Functionally Numeric Objects", () => {
      var value = { valueOf: () => 5 }
      var exponent = { valueOf: () => 4 }
      var actual = power({ value, exponent });

      expect(actual, "should return 625").to.equal(625);
    });

    describe("with negative exponents", () => {
      it("2 to the -2", () => {
        var actual = power({ value: 2, exponent: -2 })

        expect(actual, "should return 0.25").to.equal(0.25);
      })
    });

    describe("with fractional exponents", () => {
      it("2 to the 0.5", () => {
        var actual = power({ value: 2, exponent: 0.5 })

        expect(actual, "should return 1.4142135623730951").to.equal(1.4142135623730951);
      })

      it("2 to the -0.5", () => {
        var actual = power({ value: 2, exponent: -0.5 })

        expect(actual, "should return 0.7071067811865475").to.equal(0.7071067811865475);
      })

      it("1.1 to the 1.1", () => {
        var actual = power({ value: 1.1, exponent: 1.1 })

        expect(actual, "should return 1.1105342410545758").to.equal(1.1105342410545758);
      })

      it("1.1 to the -1.1", () => {
        var actual = power({ value: 1.1, exponent: -1.1 })

        expect(actual, "should return 0.900467507467747").to.equal(0.900467507467747);
      })

      it("2 to the 2.5", () => {
        var actual = power({ value: 2, exponent: 2.5 })

        expect(actual, "should return 5.656854249492381").to.equal(5.656854249492381);
      })

      it("2 to the -2.5", () => {
        var actual = power({ value: 2, exponent: -2.5 })

        expect(actual, "should return 0.17677669529663687").to.equal(0.17677669529663687);
      })
    })
  })

  describe("reciprocal", function () {
    it("undefined", () => {
      var actual = reciprocal();

      expect(actual, "should return undefined").to.be.undefined;
    });

    it("null", () => {
      var actual = reciprocal(null);

      expect(actual, "should return null").to.be.null;
    });

    it("NaN", () => {
      var actual = reciprocal(NaN);

      expect(actual, "should return NaN").to.be.NaN;
    });

    it("0", () => {
      var actual = reciprocal(0);

      expect(actual, "should return Infinity").to.equal(Infinity);
    });

    it("Number(1)", () => {
      var actual = reciprocal(Number(1));

      expect(actual, "should return 1").to.equal(1);
    });

    it("String(-10)", () => {
      var actual = reciprocal(String(-10));

      expect(actual, "should return -1/10").to.equal(-(1 / 10));
    });

    it("Boolean(true)", () => {
      var actual = reciprocal(Boolean(true));

      expect(actual, "should return 1").to.equal(1);
    });

    it("Functionally Numeric Object", () => {
      var value = { valueOf: () => 5 }
      var actual = reciprocal(value);

      expect(actual, "should return 1/5").to.equal(1 / 5);
    });
  })

  describe("square", function () {
    it("undefined", () => {
      var actual = square();

      expect(actual, "should return undefined").to.be.undefined;
    });

    it("null", () => {
      var actual = square(null);

      expect(actual, "should return null").to.be.null;
    });

    it("NaN", () => {
      var actual = square(NaN);

      expect(actual, "should return NaN").to.be.NaN;
    });

    it("0", () => {
      var actual = square(0);

      expect(actual, "should return 0").to.equal(0);
    });

    it("Infinity", () => {
      var actual = square(Infinity);

      expect(actual, "should return Infinity").to.equal(Infinity);
    });

    it("1.1", () => {
      var actual = square(1.1);

      expect(actual, "should return 1.21").to.equal(1.21);
    });

    it("String(-2)", () => {
      var actual = square(String(-2));

      expect(actual, "should return 4").to.equal(4);
    });

    it("Boolean(2)", () => {
      var actual = square(Boolean(2));

      expect(actual, "should return 1").to.equal(1);
    });

    it("Functionally Numeric Object", () => {
      var value = { valueOf: () => 5 }
      var actual = square(value);

      expect(actual, "should return 25").to.equal(25);
    });
  })

  describe("sqrt", function () {
    it("undefined", () => {
      var actual = sqrt();

      expect(actual, "should return undefined").to.be.undefined;
    });

    it("null", () => {
      var actual = sqrt(null);

      expect(actual, "should return null").to.be.null;
    });

    it("NaN", () => {
      var actual = sqrt(NaN);

      expect(actual, "should return NaN").to.be.NaN;
    });

    it("-1", () => {
      var actual = sqrt(-1);

      expect(actual, "should return Error").to.be.an("error");
    });

    it("0", () => {
      var actual = sqrt(0);

      expect(actual, "should return 0").to.equal(0);
    });

    it("Infinity", () => {
      var actual = sqrt(Infinity);

      expect(actual, "should return Infinity").to.equal(Infinity);
    });

    it("String(4)", () => {
      var actual = sqrt(String(4));

      expect(actual, "should return 2").to.equal(2);
    });

    it("Boolean(4)", () => {
      var actual = sqrt(Boolean(4));

      expect(actual, "should return 1").to.equal(1);
    });

    it("Functionally Numeric Object", () => {
      var value = { valueOf: () => 9 }
      var actual = sqrt(value);

      expect(actual, "should return 3").to.equal(3);
    });
  })
});
