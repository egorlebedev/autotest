module.exports = function(projectName)
{
    exportObject = [];

    const urls = require('../../sitemaps/' + projectName + '.json');

    urls.forEach(function (url) {
        exportObject["h1 test " + url] = function (browser) {

            browser
                .url(url)
                .pause(1000);

            browser.elements('css selector', 'h1', function(result) {
                if (result.value.length === 0){
                    browser.verify.ok(false, "h1 is defined");
                } else if (result.value.length === 1) {
                    browser.elementIdText(result.value[0].ELEMENT, function (result) {
                        browser.verify.ok(result.value.trim().length !== 0, "h1 is defined once and not empty");
                    });
                } else {
                    browser.verify.ok(false, "h1 is defined once");
                }

            });
        };
    });

    return exportObject;
};

