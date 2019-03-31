const HtmlReporter = require('nightwatch-html-reporter');
const fs = require("fs");

const projectName = process.argv[2].split("/")[1];

if (!fs.existsSync(global.appRoot+"/reports/"+projectName))
    fs.mkdirSync(global.appRoot+"/reports/"+projectName);

const reporter = new HtmlReporter({
    openBrowser: true,
    reportsDirectory: global.appRoot + '/reports/'+projectName,
    separateReportPerSuite: true,
    customTheme: global.coreRoot+'/reports/default/index.pug'
});

module.exports = {
  reporter: reporter.fn
};