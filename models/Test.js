const Datastore = require('nedb'),
    Test = new Datastore({ filename: './db/tests.db', autoload: true });

function insert(doc){
    return new Promise(function(resolve, reject) {
        Test.insert(doc, function (err, doc) {
            if (err)
                reject(err);
            else
                resolve(doc);

        });
    })
}

function update(query, update){
    return new Promise(function(resolve, reject) {
        Test.update(query, update, {}, function (err, doc) {
            if (err)
                reject(err);
            else
                resolve(doc);

        });
    });
}


exports.insert = insert;
exports.update = update;