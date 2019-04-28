const child_process = require('child_process'),
    fs = require('fs'),
    path = require("path");
    config = require(path.join(__dirname, "/config.js")),
    Models = require(global.coreRoot+'/models/index')
;

let configs = [];
let porjectsPromises = [];
let QueueObj = new Models.Queue();

fs.readdirSync("./projects").forEach(project => {
    if (project !== "PROJECT_NAME") {
        configs[project] = require('./projects/'+project+'/config.js');
        QueueObj.findOne({'finished':false}).then(
            data => {
                if (data !== null)
                    return 0;

                porjectsPromises.push(
                    new Promise((resolve, reject) => {
                        QueueObj.findOne({"project": project}).then(
                            data => {

                                if (configs[project].disabled === true)
                                    return;

                                let frequency = ((configs[project].tests || {}).common || {}).frequency || 86400000;

                                if (data && data.dateFinish && (data.dateFinish + frequency > Date.now()))
                                    return;

                                let SitemapObj = new Models.Sitemap(project);
                                if (!SitemapObj.isActual()){
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
                            }
                        )
                    })
                );
            }
        );
    }
});


Promise.all(porjectsPromises);




