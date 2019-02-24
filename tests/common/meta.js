module.exports = function(projectName)
{
    exportObject = [];

    let urls = require('../../sitemaps/' + projectName + '.json');

    urls.forEach(function (url) {
        exportObject["Meta test " + url] = function (browser) {

            browser
                .url(url)
                .pause(1000);

            // Title
            browser.getTitle((title) => {
                    browser.verify.ok(title.trim().length !== 0, "Title is not empty");
                });

            // Description
            browser.element('css selector', 'meta[name=description]', function(result) {
                browser.elementIdAttribute(result.value.ELEMENT, 'content', function (result) {
                    browser.verify.ok(result.value.trim().length !== 0, "Description is not empty");
                });
            });

            // Keywords
            browser.element('css selector', 'meta[name=keywords]', function(result) {
                browser.elementIdAttribute(result.value.ELEMENT, 'content', function (result) {
                    browser.verify.ok(result.value.trim().length !== 0, "Keywords is not empty");
                });
            });
        };
    });

    return exportObject;
};

