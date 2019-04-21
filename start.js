const child_process = require('child_process'),
    fs = require('fs'),
    Queue = require('./models/Queue.js');

let projectsArr = [];
let porjectsPromises = [];
const QueueObj = new Queue();

fs.readdirSync("./projects").forEach(projectName => {
    if (projectName !== "PROJECT_NAME") {
        projectsArr.push(projectName);
        porjectsPromises.push(
            new Promise((resolve, reject) => {
                QueueObj.findOne({"projectName":projectName}).then(
                    date => {
                        console.log(data);
                    }
                )
            })
        );
    }
});



QueueObj.findOne({'finished':false}).then(
    data => {
        if (data !== null)
            return 0;

        projectsArr.forEach(function (project) {

            if (project !== "PROJECT_NAME") {
                try {
                    child_process.execSync('node app.js projects/' + project + '/common');
                } catch (err) {
                    ;
                }

            }
        });
    }
);



