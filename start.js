const child_process = require('child_process'),
    fs = require('fs'),
    Queue = require('./models/Queue.js');

let configs = [];
let porjectsPromises = [];
const QueueObj = new Queue();

fs.readdirSync("./projects").forEach(projectName => {
    if (projectName !== "PROJECT_NAME") {
        configs[projectName] = require('./projects/'+projectName+'/config.js');
        QueueObj.findOne({'finished':false}).then(
            data => {
                if (data !== null)
                    return 0;

                porjectsPromises.push(
                    new Promise((resolve, reject) => {
                        QueueObj.findOne({"projectName": projectName}).then(
                            data => {

                                if (configs[projectName].disabled === true)
                                    return;

                                let frequency = ((configs[projectName].tests || {}).common || {}).frequency || 86400000;

                                if (data && data.dateFinish && (data.dateFinish + frequency > Date.now()))
                                    return;

                                let sitemapPath = './sitemaps/' + projectName + '.json';
                                let sitemap = false;
                                let sitemapExpTime;

                                if (fs.existsSync(sitemapPath)){
                                    sitemapExpTime = configs[projectName].sitemapExpTime || 86400000;
                                    sitemap = fs.statSync(sitemapPath);
                                }

                                if (sitemap === false || sitemap.birthtimeMs + sitemapExpTime < Date.now()) {
                                    try {
                                        child_process.execSync('node sitemap ' + projectName);
                                    } catch (err) {
                                        ;
                                    }
                                }

                                try {
                                    child_process.execSync('node nightwatch_env/app projects/' + projectName + '/common --config nightwatch_env/nightwatch.conf.js');
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




