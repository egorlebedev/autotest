module.exports = {
    "disabled": false,
    "name": "Title",
    "fn": function (browser) {
        browser.getTitle((title) => {
            browser.verify.ok(title.trim().length !== 0, "Title is not empty");
        });
    }
};