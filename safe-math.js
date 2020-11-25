/** 
 * Safer floating-point math operations in JavaScript, to avoid binary-decimal
 * impedance mismatches.
 * 
 * Examples:
 * 1. Adding 0.1 + 0.2 should return 0.3 instead of 0.30000000000000004.
 * 2. Multiplying 0.1 * 0.1 should return 0.01 instead of 0.010000000000000002.
 * 3. Any value can be an object whose valueOf() method returns a numeric value,
 *    i.e., a functionally numeric value.
 * 
 * Library contains 4 internal helper functions:
 * 1. for extracting values from a series and ignoring non-numeric values,
 * 2. checking that a value is at least functionally numeric,
 * 3. expanding values to the largest integer string,
 * 4. ascending sort function, used by median.
 */

export {
  // operations
  add, minus, multiply, divide,
  // series
  mean, median, mode, range,
  // conversions
  percent, reciprocal, square, sqrt
}

/**
 * @function add, for safely adding numbers.
 * 
 * @param  {...any} values
 * @returns {number} sum
 */
function add(...values) {
  return getValues(...values).reduce(function (augend, addend) {
    var { left, right, exponent } = expand(augend, addend);

    return (left + right) / exponent;
  }, 0);
}

/**
 * @function minus, for safely subtracting numbers.
 * 
 * @param  {...any} values
 * @returns {number} difference
 */
function minus(...values) {
  var numbers = getValues(...values);
  var first = numbers.shift()

  return numbers.reduce(function (minuend, subtrahend) {
    var { left, right, exponent } = expand(minuend, subtrahend);

    return (left - right) / exponent;
  }, first);
}

/**
 * @function multiply, for safely multiplying numbers.
 * 
 * @param  {...any} values
 * @returns {number} product
 */
function multiply(...values) {
  return getValues(...values).reduce(function (multiplicand, multiplier) {
    var { left, right, exponent } = expand(multiplicand, multiplier);

    return (left * right) / (exponent * exponent);
  }, 1);
}

/**
 * @function divide, for safely dividing numbers.
 * 
 * @param  {...any} values
 * @returns {number} quotient
 */
function divide(...values) {
  var numbers = getValues(...values);
  var first = numbers.shift()

  return numbers.reduce(function (dividend, divisor) {
    var { left, right, exponent } = expand(dividend, divisor);

    return (left / right) / exponent;
  }, first);
}


/* Series functions */


/**
 * @function mean, for safely calculating the average of a series of numbers.
 * 
 * @param  {...any} values
 * @returns {number}
 */
function mean(...values) {
  var size = 0;

  var sum = getValues(...values).reduce(function (current, next) {
    // Expand only next value.
    var e = expand(next);

    /*
     * If next is a number, call add() and increment the set size, else just
     * return current sum.
     */

    return (
      +e.left === +e.left
        ? (size += 1, add(current, next))
        : current
    );
  }, size);

  return (
    size > 0
      ? sum / size
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

  // Need to sort our numbers first, then find the middle index.
  var sorted = ascending(numbers);

  var floor = Math.floor(sorted.length / 2);

  // Coerce Strings, Booleans, and functionally numeric values.
  return +(sorted[floor])
}

/**
 * @function mode, for safely calculating the highest occurring numbers in a
 * series.
 * 
 * Note that function always returns an Array. If the incoming series is empty,
 * an empty Array is returned.
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
     * Push values whose count matches `most` to the modes array. The strict
     * equality test means never matching NaN.
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
   * Use add with positive and negative values to insure internal use of the
   * expand function.
   */

  return add(high, -low);
}


/* Conversion functions */


/**
 * @function percent returns 1/100th of a value.
 * 
 * If the value is not functionally numeric or falsy (0), the value is
 * returned.
 *
 * @param {*}
 * @returns {number}
 */
function percent(value) {
  var number = Object(value).valueOf();

  if (!isNumeric(value) || !isNumeric(number) || !number) {
    return value
  }

  return divide(number, 100);
}

/**
 * @function reciprocal returns the reciprocal of a value.
 * 
 * If the value is not functionally numeric, the value is returned.
 *  * 
 * @param {*}
 * @returns {number} 
 */

function reciprocal(value) {
  var number = Object(value).valueOf();

  if (!isNumeric(value) || !isNumeric(number)) {
    return value
  }

  return Math.pow(number, -1);
}

/**
 * @function square returns the square of a value.
 * 
 * If the value is not functionally numeric, the value is returned.
 *
 * @param {*}
 * @returns {number} 
 */
function square(value) {
  var number = Object(value).valueOf();

  if (!isNumeric(value) || !isNumeric(number)) {
    return value
  }

  return multiply(number, number);
}

/**
 * @function sqrt returns the square root of a value.
 * 
 * If the value is not functionally numeric or is numerically negative, an
 * Error object is returned.
 *
 * @param {*}
 * @returns {number} 
 */
function sqrt(value) {
  var number = Object(value).valueOf();

  if (!isNumeric(value) || !isNumeric(number) || number < 0) {
    return new Error(`Invalid Input, ${value}`)
  }

  return Math.sqrt(number);
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

  return values.filter(isNumeric)
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

  var reInvalid = /^(NaN|null|undefined|)$/;

  return !reInvalid.test(v);
}

/**
 * @function expand, accepts two parameters, coerces them to integers, and
 * returns an object containing the x & y integer pair, plus the exponent by
 * which to reduce the result of an operation on them to their original decimal
 * precision.
 *  
 * Example: given 1.23 and 1.234, function returns an object with 3 integers:
 * 
 *    left: 1230
 *    right: 1234
 *    exponent: 1000
 *
 * Originally part of gist at
 * https://gist.github.com/dfkaye/c2210ceb0f813dda498d22776f98d48a
 * 
 * @param {*} x 
 * @param {*} y
 * @returns {{ x: number, y: number, exponent: number }}
 */
function expand(x, y) {
  // Object(value).valueOf() trick for "functionally numeric" objects.

  x = Object(x).valueOf();
  y = Object(y).valueOf();

  // Format strings and convert into numbers.

  var reCommas = /[\,]/g

  if (typeof x == "string") {
    x = +x.toString().replace(reCommas, '');
  }

  if (typeof y == "string") {
    y = +y.toString().replace(reCommas, '');
  }

  // Determine exponent based on largest mantissa length.

  var reDecimal = /[\.]/
  var a = reDecimal.test(x) && x.toString().split('.')[1].length
  var b = reDecimal.test(y) && y.toString().split('.')[1].length
  var c = a > b ? a : b
  var d = Math.pow(10, c)

  /*
   * Expand x and y to integer values multiplying by exponent, converting
   * non-numeric values to their numeric equivalent. For examples,
   *  {} becomes NaN,
   *  true becomes 1,
   *  [4] becomes '4' which becomes 4,
   * and so on.
   */

  return {
    left: x * d,
    right: y * d,
    exponent: d
  }
}

/**
 * @function ascending returns a copy of given values sorted in ascending
 * numeric order.
 * 
 * @param  {...any} values 
 * @returns {Array} sorted values
 */
function ascending(values) {
  return values.sort((a, b) => {
    if (a < b) {
      return -1
    }

    if (a > b) {
      return 1;
    }

    return 0;
  });
}
