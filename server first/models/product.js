const fs = require("fs");
const path = require("path");
const Cart = require("./cart");
const db = require("../util/database");
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
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsfromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(pathh, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(pathh, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id) {
    getProductsfromFile((products) => {
      const product = products.find((product) => product.id === id);

      const updatedProducts = products.filter((prod) => prod.id !== id);
      fs.writeFile(pathh, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }

        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    getProductsfromFile(callback);
  }

  static findById(id, callback) {
    getProductsfromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      callback(product);
    });
  }
};
