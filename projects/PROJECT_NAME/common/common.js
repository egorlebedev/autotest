const path = require("path"),
    config = require('../config.js');

module.exports = require(global.coreRoot+'common/'+path.basename(__filename))(config.projectName);