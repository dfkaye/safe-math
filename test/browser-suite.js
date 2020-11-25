/*
 * This suite is meant to be run in browsers over the network, with mocha and
 * chai loaded globally. Suite uses import syntax.
 *
 * See my blog pasts
 * + about this library: https://dfkaye.com/posts/2020/08/17/safer-math-operations-in-javascript-using-tdd/
 * + live demo running this suite: https://dfkaye.com/demos/safe-math-test-suite/
 */

// 25 November 2020: broke this suite into subsuites due to expanding file size.

import "./operators.js"
import "./series.js"
import "./conversions.js"
