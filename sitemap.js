const path = require("path"),
    config = require(path.join(__dirname, "/config.js")),
    Models = require(global.coreRoot+'/models/index')
;

const args = process.argv.slice(2);

if (args.length > 0) {
    let SitemapObj = new Models.Sitemap(args[0]);
    SitemapObj.generate();
}


