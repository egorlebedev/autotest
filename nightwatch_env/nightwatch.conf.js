const chromedriver = require("chromedriver");


module.exports = {
    src_folders : ['tests'],
    globals_path: global.coreRoot+'/nightwatch_env/globals.js',
    test_settings: {
        default: {
            launch_url: "http://localhost",
            webdriver: {
            start_process: true,
                server_path: chromedriver.path,
                port: 4444,
                cli_args: ['--port=4444']
            },
            skip_testcases_on_fail: false,
            desiredCapabilities: {
                browserName: 'chrome',
                    javascriptEnabled: true,
                    acceptSslCerts: true,
                    chromeOptions: {
                    args: ['headless', 'disable-gpu']
                }
            }
        },
        chrome: {
            skip_testcases_on_fail: false,
            desiredCapabilities: {
                browserName: 'chrome',
                    javascriptEnabled: true,
                    acceptSslCerts: true,
                    abortOnAssertionFailure: false,
                    chromeOptions: {
                    args: ['disable-gpu']
                }
            }
        }
    }
};