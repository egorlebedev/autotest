function getUrlsJson(projectName) {
    const fs = require('fs'),
        util = require("util"),
        xml2js = require('xml2js');


    const xml2jsPromise = util.promisify(xml2js.parseString);
    const fsReadFilePromise = util.promisify(fs.readFile);

    return fsReadFilePromise("./sitemaps/" + projectName + ".xml")
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

exports.getUrlsJson = getUrlsJson;