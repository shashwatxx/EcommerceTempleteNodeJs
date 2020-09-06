//Cluster is made by my account shashwatmishra2111@gmail.com
const mongodb = require("mongodb");
///////////////////////////////////
const MongoClient = mongodb.MongoClient;
const uri =
  "mongodb+srv://shashwat:2eAxUNsTSMK3N3Um@cluster0.ofh41.mongodb.net/test?retryWrites=true&w=majority";

const mongoconnect = (callback) => {
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
      console.log("Connected");
      callback(client);
    })
    .catch((err) => console.log(err));
};

module.exports = mongoconnect;
