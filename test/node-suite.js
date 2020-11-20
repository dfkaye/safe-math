/*
 * This suite is run with mocha using chai. Run this suite from package root
 * using:
 * 
 *    npm test
 * 
 * Suite uses import syntax. The chai library is appended to the global scope
 * as the browser suite expects it to be globally loaded (along with mocha).
 */

import chai from "chai"

global.chai = chai;

await import("./browser-suite.js")
