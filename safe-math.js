/** 
 * Safer Math operations in JavaScript, to fend off the binary-to-decimal
 * impedance mismatch.
 * 
 * Examples:
 * 1. Adding 0.1 + 0.2 should return 0.3 instead of 0.30000000000000004.
 * 2. Multiplying 0.1 * 0.1 should return 0.01 instead of 0.010000000000000002.
 * 3. Any value can be an object whose valueOf() method returns a numeric value,
 *    i.e., a functionally numeric value.
 * 
 * Library contains 3 internal helper functions:
 * 1. for extracting values from a series and ignoring non-numeric values,
 * 2. checking that a value is at least functionally numeric,
 * 3. expanding values to the largest
 */

export { sum, product, mean, median, mode, range }

/**
 * @function sum, for safely adding numbers.
 * 
 * @param  {...any} values
 * @returns {number}
 */
function sum(...values) {
  return getValues(...values).reduce(function (current, next) {
    var { left, right, by } = expand(current, next);

    return (left + right) / by;
  }, 0);
}

/**
 * @function product, for safely multiplying numbers.
 * 
 * @param  {...any} values
 * @returns {number}
 */
function product(...values) {
  return getValues(...values).reduce(function (current, next) {
    var { left, right, by } = expand(current, next);

    return (left * right) / (by * by);
  }, 1);
}

/**
 * @function mean, for safely calculating the average of a series of numbers.
 * 
 * @param  {...any} values
 * @returns {number}
 */
function mean(...values) {
  var size = 0;

  var result = getValues(...values).reduce(function (current, next) {
    // Expand only next value.
    var e = expand(next);

    /*
     * If next is a number, call sum() and increment the set size.
     * Else just return current sum.
     */

    return (
      +e.left === +e.left
        ? (size += 1, sum(current, next))
        : current
    );
  }, size);

  return (
    size > 0
      ? result / size
      : size
  );
}

/**
 * @function median, for safely calculating the middle value of a series of
 * numbers.
 * 
 * @param  {...any} values 
 * @returns {number}
 */
function median(...values) {
  var numbers = getValues(...values);

  if (!numbers.length) {
    return 0;
  }

  var floor = Math.floor(numbers.length / 2);

  // Coerce Strings, Booleans, and functionally numeric values.
  return +(numbers[floor])
}

/**
 * @function mode, for safely calculating the highest occurring numbers in a
 * series.
 * 
 * Note that function always returns an array. If the incoming series is empty,
 * an empty array is returned.
 * 
 * @param  {...any} values 
 * @returns {Array} 
 */
function mode(...values) {
  var map = {};
  var most = 0;
  var modes = [];

  getValues(...values).forEach(value => {
    if (!isNumeric(value)) {
      return
    }

    value = +(value);

    // Increment value's count if value is mapped, or initialize it to 1.
    (value in map)
      && (map[value]++)
      || (map[value] = 1);

    // Reset most to new higher count
    (map[value] > most)
      && (most = map[value]);
  })

  Object.keys(map).forEach(value => {

    /*
     * Push values whose count matches most to the modes array.
     * Strict equality test means never matching NaN.
     */

    (map[value] === most)
      && (modes.push(+(value)));
  })

  return modes;
}

/**
 * @function range, for safely calculating the difference between the largest
 * and smallest values in a series. If there are less than two values in the
 * series, then 0 is returned.
 * 
 * @param  {...any} values 
 * @returns {number}
 */
function range(...values) {
  var low = Infinity;
  var high = -Infinity;

  var numbers = getValues(...values);

  if (numbers.length < 2) {
    return 0;
  }

  numbers.forEach(value => {
    if (!isNumeric(value)) {
      return
    }

    value = +(value);

    value > high
      && (high = value);

    value < low
      && (low = value);

  });

  /*
   * Use sum with positive and negative values to insure internal use of the
   * expand function.
   */

  return sum(high, -low);
}


/* Helper functions */

/**
 * @function getValues, extracts functionally numeric values in a series,
 * filtering out any non-numeric values, and returns numerically sorted array.
 * 
 * @param  {...any} values
 * @returns {Array} numeric values
 */
function getValues(...values) {
  if (Array.isArray(values[0])) {
    values = values[0];
  }

  return values.filter(isNumeric).sort((a, b) => {
    if (a < b) {
      return -1
    }

    if (a > b) {
      return 1;
    }

    return 0;
  });
}

/**
 * @function isNumeric, tests whether a given value is "functionally numeric,"
 * meaning Object(value).valueOf() returns a numeric value. Function removes
 * any formatting commas from string values before testing, and returns boolean
 * indicating the extracted value is not NaN, null, undefined, or an empty
 * string.
 * 
 * @param {*} a
 * @returns {boolean} 
 */
function isNumeric(a) {

  /*
   * If it's a string, remove commas and trim it.
   * Otherwise take the value.
   */

  var v = /^string/.test(typeof a)
    ? a.replace(/[,]/g, '').trim()
    : a;

  /*
   * Test and return whether value is not NaN, null, undefined, or an empty
   * string,
   */

  var reVoid = /^(NaN|null|undefined|)$/;

  return !reVoid.test(v);
}

/**
 * @function expand, accepts two parameters, coerces them to integers, and
 * returns an object containing the left & right integer pair, plus an
 * expansion factor by which to reduce the result of an operation on them to
 * their original decimal precision.
 *
 * Originally part of gist at
 * https://gist.github.com/dfkaye/c2210ceb0f813dda498d22776f98d48a
 * 
 * @param {*} left 
 * @param {*} right
 * @returns {object}
 */
function expand(left, right) {
  // Object(value).valueOf() trick for "functionally numeric" objects.
  left = Object(left).valueOf();
  right = Object(right).valueOf();

  // Coerce to strings to numbers (and remove formatting commas).
  var reMatch = /string/
  var reCommas = /[\,]/g

  if (reMatch.test(typeof left)) {
    left = +left.toString().replace(reCommas, '');
  }

  if (reMatch.test(typeof right)) {
    right = +right.toString().replace(reCommas, '');
  }

  // Expand each to integer values based on largest mantissa length.
  var reDecimal = /[\.]/
  var ml = reDecimal.test(left) && left.toString().split('.')[1].length
  var mr = reDecimal.test(right) && right.toString().split('.')[1].length
  var pow = ml > mr ? ml : mr
  var by = Math.pow(10, pow)

  /*
   * left & right number pair, plus the expansion factor.
   * The multiplication operator, *, coerces non-numerics to their equivalent,
   * e.g., {} => NaN, true => 1, [4] => '4' => 4
   */
  return {
    left: left * by,
    right: right * by,
    by
  }
}


