const Tests = require('../models/Test.js');
const path = require("path");

function getHooks(projectName, testName){
    let newTest;
    if (testName.indexOf(".js") !== undefined)
        testName = path.basename(testName).replace(".js", "");

    return {
        'before':function(browser, done) {
            Tests.insert({
                'projectName': projectName,
                'testName': testName,
                'dateStart': Date.now(),
            }).then(
                data => {
                    newTest = data;
                    done();
                }
            );
        },
        'after': function(browser, done) {
            Tests.update(
                {'_id': newTest._id},
                {$set: {'dateFinish': Date.now()}}
            ).then(
                data => {
                    done();
                }
            );
        }
    };
}

exports.getHooks = getHooks;
