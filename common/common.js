const fs = require("fs"),
    path = require("path"),
    config = require(path.join(__dirname, "../config.js")),
    Models = require(global.coreRoot+'/models/index')
;

module.exports = function(projectName)
{
    let TestObj = new Models.Test(projectName, __filename);

    return TestObj.getExportObject();
};

