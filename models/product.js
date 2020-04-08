const fs = require('fs');
const path = require('path');

/**
 * @description this variable set item to data folder in product.json file
 */
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

/**
 * @description this callback function read content from file
 */
const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

/**
 * @description get unique ID by uuid4
 */
function uuidv4(str) {
  return str.replace(/[xy]/g, (c) => {
    var ran = Math.random() * 16 | 0;
    var value = c === 'x' ? ran : (ran & 0x3 | 0x8);

    return value.toString(36)
  });
}

/**
 * @description this Product class get informatio from body
 */
module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id,
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
    getProductsFromFile(products => {

      // Edit if id is present
      if (this.id) {
        const existingProductIndex = products.findIndex(prod => prod.id === this.id);
        const updateProducts = [...products];
        updateProducts[existingProductIndex] = this;

        fs.writeFile(p, JSON.stringify(updateProducts), err => {
          console.log(err);
        });

      // Add if id is not present
      } else {
        this.id = uuidv4('xxxxxxx0013-xxxx-4xxxxx-yxxx-xxxxyyyxxxxxx');
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  /**
   * This method fetch all data from file in callback manner
   */
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  /**
   * Get single product by id
   */
  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  };


};
