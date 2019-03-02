module.exports = function(projectName)
{
    const urls = require('../../sitemaps/' + projectName + '.json');
    const TestsController = require('../../controllers/Tests.js');

    exportObject = TestsController.getHooks(projectName, __filename);

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
                if (typeof result.value.ELEMENT === "undefined")
                    browser.verify.ok(false, "Description is defined");
                else
                    browser.elementIdAttribute(result.value.ELEMENT, 'content', function (result) {
                        browser.verify.ok(result.value.trim().length !== 0, "Description is not empty");
                    });
            });

            // Keywords
            browser.element('css selector', 'meta[name=keywords]', function(result) {
                if (typeof result.value.ELEMENT === "undefined")
                    browser.verify.ok(false, "Keywords is defined");
                else
                    browser.elementIdAttribute(result.value.ELEMENT, 'content', function (result) {
                        browser.verify.ok(result.value.trim().length !== 0, "Keywords is not empty");
                });
            });
        };
    });

    return exportObject;
};

