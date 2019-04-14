const fs = require("fs"),
    path = require("path");

require(path.join(__dirname, "/config.js"));

const Sitemap = require(global.coreRoot + '/models/Sitemap.js');

let configs = [];

const args = process.argv.slice(2);

if (args.length > 0) {
    const configPath = path.join(global.appRoot, "/projects/" + args[0] + "/config.js");
    if (fs.existsSync(configPath))
        configs.push(require(configPath));
}

configs.forEach(function (config) {
    if (!config.disabled) {

        const SitemapGenerator = require('sitemap-generator');

        // create generator
        console.log("Start generate sitemap for "+config.projectName);
        const generator = SitemapGenerator(config.url, {
            stripQuerystring: false,
            filepath: "./sitemaps/" + config.projectName + ".xml"
        });

        generator.on('done', () => {
            let res = Sitemap.getUrlsJson(config.projectName);
            res.then(data => {
                fs.writeFileSync(global.appRoot + '/sitemaps/' + config.projectName + '.json', JSON.stringify(data), 'utf8', function () {
                });
                fs.unlinkSync(global.appRoot + '/sitemaps/' + config.projectName + '.xml');
                console.log("Sitemap for "+config.projectName+ " generated");
            });
        });

        // start the crawler
        generator.start();
    }

});
