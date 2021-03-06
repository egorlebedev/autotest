const fs = require("fs"),
    path = require("path")
;


module.exports = class Test {

    constructor(project, test){
        this.project = project;

        this.test = test;
        if (this.test.indexOf(".js") !== undefined)
            this.test = path.basename(this.test).replace(".js", "");

        this.setConfig();
    }

    isDisabled(){
        return this.config.disabled === true;
    }

    getFrequency(){
        if (this.test === "common")
            return ((this.config.tests || {}).common || {}).frequency || 86400000;

        return 86400000;
    }

    isActual(){
        const Models = require(global.coreRoot+'/models/index');
        let QueueObj = new Models.Queue();
        return QueueObj.findOne({"project": "FRC"}).then(data => {
            let frequency = this.getFrequency();
            return !(data && data.dateFinish && (data.dateFinish + frequency > Date.now()))
        });

    }

    setConfig(){
        const configPath = path.join(global.appRoot, "/projects/" + this.project + "/config.js");
        if (!fs.existsSync(configPath))
            throw new Error("Config for " + this.project + " not found");

        this.config = require(configPath);
    }

    getExportObject() {
        const Models = require(global.coreRoot+'/models/index');
        let exportObject = this.getHooks();

        let SitemapObj = new Models.Sitemap(this.project);
        let urls = SitemapObj.getUrls();

        const srcPath = global.coreRoot+'/common/src/';
        const tests = fs.readdirSync(srcPath);

        const projectExtPath = global.appRoot+"/projects/"+this.project+"/common_ext";
        let projectExtTests = [];
        if (fs.existsSync(projectExtPath))
            projectExtTests = fs.readdirSync(projectExtPath);

        urls.forEach(function (url) {

            exportObject["Set Url " + url] = function (browser) {
                browser
                    .url(url);
            };

            tests.forEach(function (test) {
                let srcTest = require(srcPath + test);
                if (srcTest.disabled === false)
                    exportObject[srcTest.name + " " + url] = srcTest.fn;
            });

            projectExtTests.forEach(function (test) {
                let srcTest = require(projectExtPath + "/" + test);
                if (srcTest.disabled === false)
                    exportObject[srcTest.name + " " + url] = srcTest.fn;

            });
        });

        return exportObject;
    }

    getHooks() {
        const Models = require(global.coreRoot+'/models/index');
        let newTest;
        let QueueObj = new Models.Queue();

        let project = this.project;

        return {
            'before': function (browser, done) {
                QueueObj.update(
                    {'project': project},
                    {
                        $set: {
                            'dateStart': Date.now(),
                            'finished': false
                        }
                    },
                    {upsert: true}
                ).then(
                    data => {
                        newTest = data;
                        done();

                    }
                );
            },
            'after': function (browser, done) {
                QueueObj.update(
                    {'project': project},
                    {
                        $set: {
                            'dateFinish': Date.now(),
                            'finished': true
                        }
                    },
                ).then(
                    data => {
                        done();
                    }
                );
            },
        };
    }

};
