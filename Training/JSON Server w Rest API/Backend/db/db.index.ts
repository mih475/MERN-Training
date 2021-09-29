const dbConfig = require("./db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

interface DbObject {
    [key: string]: any
}
let db: DbObject = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
//db.model = require("./db.model")(mongoose);


module.exports = db;