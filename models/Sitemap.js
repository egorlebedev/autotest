const fs = require("fs"),
    path = require("path");

module.exports = class Sitemap {

    constructor(project){
        this.project = project;
        this.setConfig();
    }

    setConfig(){
        const configPath = path.join(global.appRoot, "/projects/" + this.project + "/config.js");
        if (!fs.existsSync(configPath)) {
            console.log("Config for " + this.project + " not found");
            return;
        }

        const config = require(configPath);

        if (config.disabled) {
            console.log("Tests for " + projectName + " disabled");
            return;
        }

        this.config = config;
    }

    generate() {
        const SitemapGenerator = require('sitemap-generator');
        console.log("Start generate sitemap for "+this.config.projectName);
        let generator = SitemapGenerator(this.config.url, {
            stripQuerystring: false,
            filepath: "./sitemaps/" + this.config.projectName + ".xml"
        });
        generator.on('done', () => {
            this.getUrlsJson()
                .then(data => {
                    fs.writeFileSync(global.appRoot + '/sitemaps/' + this.config.projectName + '.json', JSON.stringify(data), 'utf8', function () {
                    });
                    fs.unlinkSync(global.appRoot + '/sitemaps/' + this.config.projectName + '.xml');
                    console.log("Sitemap for "+this.config.projectName+ " generated");
                });
        });

        // start the crawler
        generator.start();
    }

    getUrlsJson() {
        const util = require("util"),
            xml2js = require('xml2js');

        const xml2jsPromise = util.promisify(xml2js.parseString);
        const fsReadFilePromise = util.promisify(fs.readFile);

        return fsReadFilePromise("./sitemaps/" + this.project + ".xml")
            .then(
                data => {
                    return xml2jsPromise(data);
                }
            )
            .then(
                urls => {
                    let urlsList = [];
                    for (let key in urls.urlset.url) {
                        let url = urls.urlset.url[key].loc[0];
                        let urlArray = url.split('/');
                        let urlTail = urlArray[urlArray.length - 1];
                        let typeArray = ['.html', '.htm', '.php'];
                        let typeRegExp = new RegExp(typeArray.join('|'));
                        if (urlTail.length == 0 || typeRegExp.test(urlTail) || urlTail.indexOf('.') < 0) {
                            urlsList.push(url);
                        }
                    }
                    return urlsList;
                }
            );
    }
};