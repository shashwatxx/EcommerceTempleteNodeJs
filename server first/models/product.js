const fs = require("fs");
const path = require("path");
const pathh = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);
const getProductsfromFile = (callback) => {
  fs.readFile(pathh, (err, fileContent) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }
  save() {
    getProductsfromFile((products) => {
      products.push(this);
      fs.writeFile(pathh, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }
  static fetchAll(callback) {
    getProductsfromFile(callback);
  }
};
