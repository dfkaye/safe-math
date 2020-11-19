# safe-math

Safer floating-point math operations in JavaScript that return results we expect, so that 0.1 + 0.2 adds up to 0.3, e.g.

## Documentation

`Object.assign()` can return surprising results when a value to be modified is not an object. 

The point of `safe-object-assign` is to allow users to pass anything,

1. without blowing up,
2. retain the initial value if it is not an object or array,
3. obtain a modified copy of the initial object or array to be updated,
4. mixing only objects or arrays into the new model.

See full details on my blog post at https://dfkaye.com/posts/2020/08/17/safer-math-operations-in-javascript-using-tdd/.

## Install

`npm install safe-math`

`git clone https://github.com/dfkaye/safer-math.git`

## Test

Install dependencies (mocha and chai): `npm install safe-math --save-dev`

Run: `npm test`

**OR**

Visit the live demo running the browser test suite on my blog at https://dfkaye.com/demos/safe-math-test-suite/.
