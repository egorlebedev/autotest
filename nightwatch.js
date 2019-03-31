const path = require("path");

global.coreRoot = path.resolve(__dirname);

if (global.appRoot !== undefined)
    global.appRoot = path.resolve(__dirname);

require('nightwatch/bin/runner.js');