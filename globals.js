let HtmlReporter = require('nightwatch-html-reporter');
let reporter = new HtmlReporter({
  openBrowser: false,
  reportsDirectory: 'reports',
    separateReportPerSuite: true,
});

module.exports = {
  reporter: reporter.fn
};