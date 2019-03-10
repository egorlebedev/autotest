module.exports = {
    "disabled": false,
    "name": "Meta description",
    "fn": function (browser) {
        browser.element('css selector', 'meta[name=description]', function(result) {
            if (typeof result.value.ELEMENT === "undefined")
                browser.verify.ok(false, "Description is defined");
            else
                browser.elementIdAttribute(result.value.ELEMENT, 'content', function (result) {
                    browser.verify.ok(result.value.trim().length !== 0, "Description is not empty");
                });
        });
    }
};