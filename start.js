const child_process = require('child_process'),
    fs = require('fs'),
    path = require("path");
    config = require(path.join(__dirname, "/config.js")),
    Models = require(global.coreRoot+'/models/index')
;

let QueueObj = new Models.Queue();

QueueObj.hasUnfinished().then(data => {
    if (data)
        return;

    fs.readdirSync("./projects").forEach(project => {
        if (project !== "PROJECT_NAME") {

            let TestObj = new Models.Test(project, "common");

            if (TestObj.isDisabled())
                return;

            TestObj.isActual().then(data => {
                if (!data)
                    return;

                let SitemapObj = new Models.Sitemap(project);
                if (!SitemapObj.isActual()) {
                    try {
                        child_process.execSync('node sitemap ' + project);
                    } catch (err) {
                        ;
                    }
                }

                try {
                    child_process.execSync('node nightwatch_env/app projects/' + project + '/common --config nightwatch_env/nightwatch.conf.js');
                } catch (err) {
                    ;
                }
            });

        }
    });
});



