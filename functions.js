function getUrlsJson(projectName) {
    const fs = require('fs'),
        util = require("util"),
        xml2js = require('xml2js');


    const xml2jsPromise = util.promisify(xml2js.parseString);
    const fsReadFilePromise = util.promisify(fs.readFile);

    return fsReadFilePromise(__dirname + "/sitemaps/" + projectName + ".xml")
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

function getConfigs(testName){
    let fs = require("fs"),
        path = require("path"),
        normalizedPathConfigs = path.join(__dirname, "configs"),
        configs = [],
        configsFinal = [];

    fs.readdirSync(normalizedPathConfigs).forEach(function(file) {
        configs.push(require("./configs/" + file));
        configs.forEach(function(config) {
            if (!config.disabled && Object.keys(config.tests).indexOf(testName) >= 0) {
                configsFinal.push(config);
            }
        });
    });

    return configsFinal;
}

function writeLog(msg, config){
  let fs = require('fs');
  fs.writeFile(__dirname + "/reports/"+config.projectName+".log", msg, function(err){});

}

exports.getUrlsJson = getUrlsJson;
exports.getConfigs = getConfigs;
exports.writeLog = writeLog;
