const getDb = require('../util/database').getDb;

const sequelize = require('../util/database');

class Product {
  constructor(title, price, description, imaeUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imaeUrl = imaeUrl;
  }

  save() {
    const db = getDb();
    db.collection('products')
    .insertOne(this)
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
  }
}
module.exports = Product;