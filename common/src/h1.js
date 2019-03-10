module.exports = {
    "disabled": false,
    "name": "H1",
    "fn": function (browser) {
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
    }
};