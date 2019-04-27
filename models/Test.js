const Queue = require('./Queue.js');
const path = require("path");

function getHooks(projectName, testName){
    let newTest;
    let QueueObj = new Queue();
    if (testName.indexOf(".js") !== undefined)
        testName = path.basename(testName).replace(".js", "");

    return {
        'before':function(browser, done) {

            QueueObj.update(
                {'projectName': projectName},
                {$set: {
                    'dateStart': Date.now(),
                    'finished': false
                }},
                {upsert:true}
            ).then(
                data => {
                    newTest = data;
                    done();

                }
            );
        },
        'after': function(browser, done) {
            QueueObj.update(
                {'projectName': projectName},
                {$set: {
                    'dateFinish': Date.now(),
                    'finished': true
                }},
            ).then(
                data => {
                    done();
                }
            );
        },
    };
}

exports.getHooks = getHooks;
