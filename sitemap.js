let fs = require("fs"),
    path = require("path"),
    functions = require(path.join(__dirname, '.', 'functions.js')),
    configs = [],
    normalizedPathConfigs = path.join(__dirname, "configs");

let args = process.argv.slice(2);

if (args.length > 0) {
    fs.readdirSync(normalizedPathConfigs).forEach(function (file) {
        let configFile = require("./configs/" + file);
        if (configFile.projectName === args[0])
            configs.push(require("./configs/" + file));
    });
} else {
    fs.readdirSync(normalizedPathConfigs).forEach(function (file) {
        configs.push(require("./configs/" + file));
    });
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
        let res = functions.getUrlsJson(config.projectName);
        res.then(data => {
            fs.writeFile('./sitemaps/'+config.projectName+'.json', JSON.stringify(data), 'utf8', function() {});
        });
    });

    // start the crawler
    generator.start();
  }

});