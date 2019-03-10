module.exports = function(projectName)
{
    const urls = require('../sitemaps/' + projectName + '.json');
    const TestsController = require('../controllers/Tests.js');
    const fs = require("fs");
    const path = require("path");
    const srcPath = path.join(__dirname, "src");
    const projectExtPath = path.join(__dirname, "./projects/" + projectName + "/tests/common_ext");

    let exportObject = TestsController.getHooks(projectName, __filename);

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

