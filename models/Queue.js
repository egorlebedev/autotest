const DB = require('./DB.js');

module.exports = class Queue extends DB{

    constructor() {
        super('./db/queue.db');
    }


    hasUnfinished(){
        return this.findOne({'finished':false});
    }

};