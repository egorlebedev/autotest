module.exports = function(projectName)
{
    const sitemapPath = global.appRoot+'/sitemaps/' + projectName + '.json';
    const TestModel = require(global.coreRoot+'/models/Test.js');
    const fs = require("fs");
    const path = require("path");
    const srcPath = path.join(__dirname, "src");
    const projectExtPath = path.join(global.coreRoot, "/projects/" + projectName + "/common_ext");

    let urls = [];
    if (fs.existsSync(sitemapPath)) {
        urls = require(sitemapPath);
    } else {
        console.error('Sitemap for '+projectName+" not found");
        process.exit(1);
    }

    let exportObject = TestModel.getHooks(projectName, __filename);

    let commonTests = fs.readdirSync(srcPath);

    let projectExtTests = [];
    if (fs.existsSync(projectExtPath))
        projectExtTests = fs.readdirSync(projectExtPath);


    urls.forEach(function (url) {

        exportObject["Set Url " + url] = function (browser) {
            browser
                .url(url);
        };

        commonTests.forEach(function (test) {
            let srcTest = require(srcPath + "/" +  test);
            if (srcTest.disabled === false)
                exportObject[srcTest.name + " " + url] = srcTest.fn;

        });

        projectExtTests.forEach(function (test) {
            let srcTest = require(projectExtPath + "/" + test);
            if (srcTest.disabled === false)
                exportObject[srcTest.name + " " + url] = srcTest.fn;

        });

    });

    return exportObject;
};

