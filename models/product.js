const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const sequelize = require('../util/database');

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }

  // Save data in database
  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      // Update the product
      dbOp = db
        .collection('products')
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      // Insert new one in databse
      dbOp = db.collection('products').insertOne(this);
    }
    return dbOp
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  // Fetch All data from database
  static fetchAll() {
    const db = getDb();

    return db
    .collection('products')
    .find()
    .toArray()
    .then(products => {
      console.log(products);
      return products;
    })
    .catch(err => {
      console.log(err);
    });
  }

  // Fetch single data from database
  static findById(prodId) {
    const db = getDb();
    
    return db
    .collection('products')
    .find({_id: new mongodb.ObjectID(prodId) })
    .next()
    .then(product => {
      console.log(product);
      return product;
    })
    .catch(err => {
      console.log(err);
    });
  }

  // Delete Product
  static deleteById(prodId) {
    const db = getDb();
    return db
    .collection('products')
    .deleteOne({ _id: new mongodb.ObjectId(prodId) })
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    })
  };

}
module.exports = Product;