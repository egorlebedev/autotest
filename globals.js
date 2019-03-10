const HtmlReporter = require('nightwatch-html-reporter');
const fs = require("fs");

const projectName = process.argv[2].split("/")[1];

if (!fs.existsSync("./reports/"+projectName))
    fs.mkdirSync("./reports/"+projectName);

const reporter = new HtmlReporter({
    openBrowser: true,
    reportsDirectory: __dirname + '/reports/'+projectName,
    separateReportPerSuite: true,
    customTheme: './reports/default/index.pug'
});

module.exports = {
  reporter: reporter.fn
};