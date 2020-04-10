const db = require('../util/database');
const Cart = require('./cart');

/**
 * @description this Product class get informatio from body
 */
module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  /**
   * This method is save data in file
   * @description this method is both for edit and save 
   */
  save() {
    return db.execute(
      'INSERT INTO `products` (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  /**
   * This method delte product
   */
  static deleteById(id) {
    
  }

  /**
   * This method fetch all data from file in callback manner
   */
  static fetchAll() {
    return db.execute('SELECT * FROM `products`');
  }

  /**
   * Get single product by id
   */
  static findById(id) {
    return db.execute('SELECT * FROM `products` WHERE products.id = ?', [id]);
  };


};
