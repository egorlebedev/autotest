const fs = require("fs"),
    path = require("path"),
    Sitemap = require(global.coreRoot+'/models/Sitemap.js');

require(path.join(__dirname, "/config.js"));

let configs = [];

const args = process.argv.slice(2);

if (args.length > 0) {
    const configPath = path.join(global.appRoot, "/projects/" + args[0] + "/config.js");
    if (fs.existsSync(configPath))
        configs.push(require(configPath));
}

configs.forEach(function(config){
  if (!config.disabled) {

    const SitemapGenerator = require('sitemap-generator');

    // create generator
    const generator = SitemapGenerator(config.url, {
      stripQuerystring: false,
      filepath: "./sitemaps/" + config.projectName + ".xml"
    });

    generator.on('done', () => {
        let res = Sitemap.getUrlsJson(config.projectName);
        res.then(data => {
            fs.writeFile(global.appRoot+'/sitemaps/'+config.projectName+'.json', JSON.stringify(data), 'utf8', function() {});
        });
    });

    // start the crawler
    generator.start();
  }

});
