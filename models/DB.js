const Datastore = require('nedb');

module.exports = class DB {

    constructor(file) {
        this.DB = new Datastore({filename: file, autoload: true});
    }

    insert(doc) {
        let DB = this.DB;
        return new Promise(function (resolve, reject) {
            DB.insert(doc, function (err, doc) {
                if (err)
                    reject(err);
                else
                    resolve(doc);

            });
        })
    }


    update(query, update, options) {
        options = options || {};
        let DB = this.DB;
        return new Promise(function (resolve, reject) {
            DB.update(query, update, options, function (err, doc) {
                if (err)
                    reject(err);
                else
                    resolve(doc);

            });
        });
    }

    findOne(query) {
        let DB = this.DB;
        return new Promise(function (resolve, reject) {
            DB.findOne(query, function (err, doc) {
                if (err)
                    reject(err);
                else
                    resolve(doc);

            });
        })
    }

};
