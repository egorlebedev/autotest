const path = require("path"),
    config = require('../config.js');

module.exports = require('../../../common/'+path.basename(__filename))(config.projectName);