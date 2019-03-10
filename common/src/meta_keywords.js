module.exports = {
    "disabled": false,
    "name": "Meta keywords",
    "fn": function (browser) {
        browser.element('css selector', 'meta[name=keywords]', function(result) {
            if (typeof result.value.ELEMENT === "undefined")
                browser.verify.ok(false, "Keywords is defined");
            else
                browser.elementIdAttribute(result.value.ELEMENT, 'content', function (result) {
                    browser.verify.ok(result.value.trim().length !== 0, "Keywords is not empty");
                });
        });
    }
};