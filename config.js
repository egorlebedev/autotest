const path = require("path");

global.coreRoot = path.resolve(__dirname);

if (global.appRoot === undefined)
    global.appRoot = path.resolve(__dirname);

global.coreRelativeRoot = path.resolve(__dirname).replace(global.appRoot, "");
