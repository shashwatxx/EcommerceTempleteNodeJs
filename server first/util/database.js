//Cluster is made by my account shashwatmishra2111@gmail.com
const mongodb = require("mongodb");
///////////////////////////////////
const MongoClient = mongodb.MongoClient;
const uri =
  "mongodb+srv://shashwat:2eAxUNsTSMK3N3Um@cluster0.ofh41.mongodb.net/shop?retryWrites=true&w=majority";

let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
      console.log("Connected");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database Found";
};
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
